#!/usr/bin/env python3
"""Audit visible link and button contrast on the static site."""

from __future__ import annotations

import argparse
import collections
import http.server
import re
import socket
import subprocess
import sys
import time
from html.parser import HTMLParser
from pathlib import Path
from urllib.error import URLError
from urllib.request import urlopen

ROOT = Path(__file__).resolve().parents[1]
WIDTHS = (390, 1280)
THEMES = ("claro", "escuro")

AUDIT_JS = r"""() => {
  const parse = (value) => {
    const parts = value.match(/[\d.]+/g);
    if (!parts || parts.length < 3) return null;
    return parts.slice(0, 3).map(Number);
  };
  const colorString = (color) => `rgb(${color.map((part) => Math.round(part)).join(', ')})`;
  const background = (element) => {
    for (let node = element; node; node = node.parentElement) {
      const style = getComputedStyle(node);
      if (style.backgroundImage !== 'none') return { value: 'não determinado (gradiente)', rgb: null };
      const match = style.backgroundColor.match(/rgba?\(([^)]+)\)/);
      if (!match) continue;
      const values = match[1].split(/[,\s/]+/).filter(Boolean).map(Number);
      if (values.length < 3) continue;
      const alpha = values.length > 3 ? values[3] : 1;
      if (alpha >= 0.999) return { value: colorString(values), rgb: values.slice(0, 3) };
    }
    return { value: 'não determinado (transparente)', rgb: null };
  };
  const visible = (element) => {
    const style = getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0 && style.display !== 'none'
      && style.visibility !== 'hidden' && Number(style.opacity) > 0;
  };
  const selector = (element) => {
    const classes = typeof element.className === 'string'
      ? element.className.trim().split(/\s+/).filter(Boolean) : [];
    return `${element.tagName.toLowerCase()}${element.id ? `#${element.id}` : ''}`
      + classes.map((name) => `.${name}`).join('');
  };
  return [...document.querySelectorAll('a, button')].filter(visible).map((element) => {
    const style = getComputedStyle(element);
    const bg = background(element);
    const text = (element.innerText || '').trim().replace(/\s+/g, ' ');
    const fontSize = parseFloat(style.fontSize);
    const large = fontSize >= 24 || (fontSize >= 18.67 && parseInt(style.fontWeight, 10) >= 700);
    return {
      selector: selector(element),
      text,
      accessibleName: element.getAttribute('aria-label') || element.title || '',
      textColor: style.color,
      textRgb: parse(style.color),
      background: bg.value,
      backgroundRgb: bg.rgb,
      large,
      isLink: element.tagName.toLowerCase() === 'a'
    };
  });
}"""

COLOR_RULE_RE = re.compile(r"([^{}]+)\{([^{}]*)\}", re.DOTALL)
COLOR_DECL_RE = re.compile(r"(?:^|;)\s*color\s*:\s*([^;!}]+)", re.IGNORECASE)
DEFAULT_BLUE = "rgb(0, 0, 238)"


def choose_port() -> int:
    with socket.socket() as sock:
        sock.bind(("127.0.0.1", 0))
        return int(sock.getsockname()[1])


def relative_luminance(rgb: list[float]) -> float:
    channels = [value / 255 for value in rgb]
    linear = [
        value / 12.92 if value <= 0.04045 else ((value + 0.055) / 1.055) ** 2.4
        for value in channels
    ]
    return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2]


def contrast_ratio(foreground: list[float], background: list[float]) -> float:
    luminances = sorted(
        (relative_luminance(foreground), relative_luminance(background)),
        reverse=True,
    )
    return (luminances[0] + 0.05) / (luminances[1] + 0.05)


def markdown_cell(value: object) -> str:
    return str(value).replace("|", "\\|").replace("\n", " ").strip()


def scan_global_link_colors() -> list[dict[str, str]]:
    findings = []
    global_selectors = {
        "a", "a:visited", "a:hover", "a:active", "a:focus", "a:focus-visible"
    }
    for path in sorted((ROOT / "css").glob("*.css")):
        text = path.read_text(encoding="utf-8", errors="replace")
        for match in COLOR_RULE_RE.finditer(text):
            selectors, declarations = match.groups()
            color = COLOR_DECL_RE.search(declarations)
            if not color:
                continue
            for selector in selectors.split(","):
                selector = selector.strip()
                if selector.lower() in global_selectors:
                    findings.append({
                        "file": path.relative_to(ROOT).as_posix(),
                        "selector": selector,
                        "color": color.group(1).strip(),
                    })
    return findings


def evaluate_elements(elements: list[dict]) -> list[dict]:
    results = []
    for element in elements:
        text = element["text"]
        color = element["textColor"]
        background = element["background"]
        issues = []
        ratio = None
        if not text and not element["accessibleName"]:
            issues.append("texto vazio e sem nome acessível")
        if element["isLink"] and color.replace(" ", "") == DEFAULT_BLUE.replace(" ", ""):
            issues.append("azul padrão do navegador")
        if text and element["textRgb"] and element["backgroundRgb"]:
            ratio = contrast_ratio(element["textRgb"], element["backgroundRgb"])
            threshold = 3.0 if element["large"] else 4.5
            if ratio < threshold:
                issues.append(f"contraste abaixo de {threshold:.1f}:1")
            if element["textRgb"] == element["backgroundRgb"]:
                issues.append("texto igual ao fundo")
        results.append({
            **element,
            "ratio": ratio,
            "issues": issues,
        })
    return results


def interactive_parser_rows(path: Path) -> list[dict]:
    class Parser(HTMLParser):
        def __init__(self) -> None:
            super().__init__(convert_charrefs=True)
            self.stack: list[dict] = []
            self.rows: list[dict] = []

        def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
            if tag in {"a", "button"}:
                attributes = dict(attrs)
                self.stack.append({
                    "tag": tag,
                    "class": attributes.get("class", ""),
                    "id": attributes.get("id", ""),
                    "aria": attributes.get("aria-label", ""),
                    "text": [],
                })

        def handle_data(self, data: str) -> None:
            for item in self.stack:
                item["text"].append(data)

        def handle_endtag(self, tag: str) -> None:
            for index in range(len(self.stack) - 1, -1, -1):
                if self.stack[index]["tag"] == tag:
                    item = self.stack.pop(index)
                    text = " ".join(" ".join(item["text"]).split())
                    selector = item["tag"]
                    if item["id"]:
                        selector += f"#{item['id']}"
                    selector += "".join(f".{name}" for name in item["class"].split())
                    self.rows.append({
                        "selector": selector,
                        "text": text,
                        "accessibleName": item["aria"],
                        "textColor": "não determinado (sem navegador)",
                        "background": "não determinado (sem navegador)",
                        "ratio": None,
                        "issues": [],
                        "staticOnly": True,
                    })
                    break

    parser = Parser()
    parser.feed(path.read_text(encoding="utf-8", errors="replace"))
    return parser.rows


def browser_results(pages: list[Path], capture_dir: Path) -> list[dict]:
    from playwright.sync_api import sync_playwright

    port = choose_port()
    server = subprocess.Popen(
        [
            sys.executable, "-m", "http.server", str(port),
            "--bind", "127.0.0.1", "--directory", str(ROOT),
        ],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    results = []
    try:
        ready = False
        for _ in range(50):
            if server.poll() is not None:
                raise RuntimeError("O servidor local encerrou antes de iniciar.")
            try:
                with urlopen(f"http://127.0.0.1:{port}/", timeout=1):
                    ready = True
                    break
            except (URLError, TimeoutError, ConnectionError):
                time.sleep(0.1)
        if not ready:
            raise RuntimeError("O servidor local não respondeu.")

        capture_dir.mkdir(parents=True, exist_ok=True)
        with sync_playwright() as playwright:
            browser = playwright.chromium.launch(headless=True)
            try:
                for page_path in pages:
                    for width in WIDTHS:
                        for theme in THEMES:
                            context = browser.new_context(viewport={"width": width, "height": 900})
                            context.add_init_script(
                                "localStorage.setItem('tema', "
                                + repr("claro" if theme == "claro" else "escuro")
                                + ");"
                            )
                            page = context.new_page()
                            url = f"http://127.0.0.1:{port}/{page_path.name}"
                            try:
                                page.goto(url, wait_until="domcontentloaded", timeout=20000)
                                page.wait_for_timeout(250)
                                elements = evaluate_elements(page.evaluate(AUDIT_JS))
                                results.extend({
                                    "page": page_path.name,
                                    "width": width,
                                    "theme": theme,
                                    **element,
                                } for element in elements)
                                if page_path.name == "index.html" and (
                                    (width, theme) in {(1280, "claro"), (390, "escuro")}
                                ):
                                    name = "home-1280-claro.png" if width == 1280 else "home-390-escuro.png"
                                    page.screenshot(path=str(capture_dir / name), full_page=True)
                            except Exception as error:
                                results.append({
                                    "page": page_path.name,
                                    "width": width,
                                    "theme": theme,
                                    "selector": "falha de navegação",
                                    "text": "",
                                    "textColor": "não determinado",
                                    "background": "não determinado",
                                    "ratio": None,
                                    "issues": [str(error)],
                                })
                            finally:
                                context.close()
            finally:
                browser.close()
    finally:
        server.terminate()
        try:
            server.wait(timeout=5)
        except subprocess.TimeoutExpired:
            server.kill()
            server.wait()
    return results


def static_results(pages: list[Path]) -> list[dict]:
    results = []
    for page in pages:
        for width in WIDTHS:
            for theme in THEMES:
                for element in interactive_parser_rows(page):
                    results.append({
                        "page": page.name,
                        "width": width,
                        "theme": theme,
                        **element,
                    })
    return results


def build_report(results: list[dict], global_rules: list[dict], browser_used: bool) -> str:
    problem_counts: collections.Counter[str] = collections.Counter()
    for result in results:
        problem_counts.update(result["issues"])
    problems = sum(problem_counts.values())
    lines = [
        "# Relatório de links e botões",
        "",
        f"- Modo: {'Playwright/Chromium' if browser_used else 'estático; sem cálculo de estilo computado'}",
        f"- Elementos avaliados: {len(results)}",
        f"- Problemas registrados: {problems}",
        "- Problemas por tipo: " + (
            ", ".join(f"{kind}: {count}" for kind, count in sorted(problem_counts.items()))
            or "nenhum"
        ),
        "",
        "## Regras globais de cor para links",
        "",
    ]
    if global_rules:
        lines.extend([
            "| Arquivo | Seletor | Cor |",
            "|---|---|---|",
            *[
                f"| {rule['file']} | `{rule['selector']}` | `{rule['color']}` |"
                for rule in global_rules
            ],
        ])
    else:
        lines.append("Nenhuma regra global `a`/`:visited` com declaração de cor.")
    lines.extend([
        "",
        "## Elementos interativos",
        "",
        "| Página | Largura | Tema | Seletor/classe | Texto | Cor do texto | Fundo efetivo | Contraste | Resultado |",
        "|---|---:|---|---|---|---|---|---:|---|",
    ])
    for result in results:
        text = result.get("text") or ("(vazio)" if not result.get("accessibleName") else "(vazio; com nome acessível)")
        ratio = f"{result['ratio']:.2f}:1" if result.get("ratio") is not None else "não determinado"
        if result["issues"]:
            status = "PROBLEMA: " + ", ".join(result["issues"])
        elif result.get("staticOnly"):
            status = "não avaliado sem navegador"
        else:
            status = "OK"
        lines.append(
            "| " + " | ".join(markdown_cell(value) for value in (
                result["page"], result["width"], result["theme"],
                f"`{result['selector']}`", text, result["textColor"],
                result["background"], ratio, status,
            )) + " |"
        )
    lines.append("")
    return "\n".join(lines)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--report", default="tools/relatorio-links.md")
    parser.add_argument("--no-browser", action="store_true")
    args = parser.parse_args()
    pages = sorted(ROOT.glob("*.html"))
    if not pages:
        print("Nenhuma página HTML encontrada na raiz.", file=sys.stderr)
        return 2
    global_rules = scan_global_link_colors()
    browser_used = False
    if not args.no_browser:
        try:
            from playwright.sync_api import Error as PlaywrightError
        except ImportError as error:
            print(f"Playwright indisponível; análise estática: {error}", file=sys.stderr)
            results = static_results(pages)
        else:
            try:
                results = browser_results(pages, ROOT / "tools" / "capturas")
                browser_used = True
            except (PlaywrightError, OSError, RuntimeError) as error:
                print(f"Chromium indisponível; análise estática: {error}", file=sys.stderr)
                results = static_results(pages)
    else:
        results = static_results(pages)
    report = build_report(results, global_rules, browser_used)
    output = ROOT / args.report
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(report, encoding="utf-8")
    print("\n".join(report.splitlines()[:7]))
    print(f"Relatório salvo: {output.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
