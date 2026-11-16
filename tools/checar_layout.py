#!/usr/bin/env python3
"""Responsive browser audit for the static Society of Faith site."""

from __future__ import annotations

import argparse
import collections
import http.server
import re
import socket
import subprocess
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
WIDTHS = (360, 390, 768, 1024, 1280, 1920)
THEMES = ("claro", "escuro")

AUDIT_JS = r"""() => {
  const width = document.documentElement.clientWidth;
  const overflow = document.documentElement.scrollWidth > width;
  const offenders = [...document.body.querySelectorAll('*')].map((el) => {
    const r = el.getBoundingClientRect();
    return { tag: el.tagName.toLowerCase(), className: String(el.className || '').baseVal || String(el.className || ''),
      id: el.id, right: Math.round(r.right), left: Math.round(r.left), width: Math.round(r.width) };
  }).filter((x) => x.right > width + 1)
    .sort((a, b) => (b.right - width) - (a.right - width)).slice(0, 5);
  const brokenImages = [...document.images].filter((img) => !img.complete || img.naturalWidth === 0)
    .map((img) => img.currentSrc || img.src);
  const prohibited = [];
  const bodyText = document.body.innerText || '';
  if (bodyText.includes('Imagem em cura' + 'doria')) prohibited.push('texto de imagem pendente');
  if (/\bquiz\b/i.test(document.documentElement.outerHTML)) prohibited.push('"quiz"');
  const blueLinks = [...document.querySelectorAll('a')].filter((a) =>
    getComputedStyle(a).color === 'rgb(0, 0, 238)').map((a) => a.href || a.textContent.trim());
  const smallTargets = width <= 768 ? [...document.querySelectorAll(
    'header [data-menu-toggle], header [data-theme-toggle], header nav a, header nav button, [data-mobile-menu] a, [data-mobile-menu] button, .mobile-menu a, .mobile-menu button'
  )].filter((el) => {
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0 && (r.width < 44 || r.height < 44);
  }).map((el) => ({ text: el.innerText.trim(), width: Math.round(el.getBoundingClientRect().width),
    height: Math.round(el.getBoundingClientRect().height) })) : [];
  return { width, scrollWidth: document.documentElement.scrollWidth, overflow, offenders,
    brokenImages, prohibited, blueLinks, smallTargets };
}"""

MENU_TARGETS_JS = r"""() => [...document.querySelectorAll(
  'header [data-menu-toggle], header [data-theme-toggle], header nav a, header nav button'
) ].filter((el) => {
  const r = el.getBoundingClientRect();
  return r.width > 0 && r.height > 0 && (r.width < 44 || r.height < 44);
}).map((el) => ({ text: el.innerText.trim(), width: Math.round(el.getBoundingClientRect().width),
  height: Math.round(el.getBoundingClientRect().height) }))"""


def choose_port() -> int:
    with socket.socket() as sock:
        sock.bind(("127.0.0.1", 0))
        return int(sock.getsockname()[1])


def markdown_report(results: list[dict], browser_available: bool) -> str:
    counts: collections.Counter[str] = collections.Counter()
    rows = []
    for result in results:
        problems = result["problems"]
        counts.update(problem["type"] for problem in problems)
        details = "; ".join(problem["detail"] for problem in problems) or "—"
        rows.append(
            f"| {result['page']} | {result['width']} | {result['theme']} | {details} |"
        )
    total = sum(counts.values())
    lines = [
        "# Relatório de layout",
        "",
        f"- Teste em navegador: {'sim' if browser_available else 'não; análise estática apenas'}",
        f"- Total de problemas: {total}",
        "- Problemas por tipo: " + (
            ", ".join(f"{kind}: {count}" for kind, count in sorted(counts.items())) or "nenhum"
        ),
        "",
        "| Página | Largura | Tema | Problemas |",
        "|---|---:|---|---|",
        *rows,
        "",
    ]
    return "\n".join(lines)


def static_audit(pages: list[Path]) -> list[dict]:
    sources = [
        path for folder in (ROOT / "css", ROOT / "js")
        for path in folder.rglob("*") if path.is_file() and path.suffix in {".css", ".js"}
    ]
    sources += pages
    corpus = {path: path.read_text(encoding="utf-8", errors="replace") for path in sources}
    css = "\n".join(text for path, text in corpus.items() if path.suffix == ".css")
    js = "\n".join(text for path, text in corpus.items() if path.suffix == ".js")
    forbidden = []
    for path, text in corpus.items():
        forbidden_pattern = r"Imagem em cura" + r"doria|imagem a" + r" adicionar"
        if re.search(forbidden_pattern, text, re.IGNORECASE):
            forbidden.append("string de imagem proibida")
        if re.search(r"\bquiz\b", text, re.IGNORECASE):
            forbidden.append("referência a quiz")
    dark_media = bool(re.search(r"@media\s*\(\s*prefers-color-scheme\s*:\s*dark\s*\)", css, re.I))
    legacy_arrows = bool(re.search(r"data-carousel-(?:prev|next)|carousel-arrow|timeline-arrow", "\n".join(
        text for path, text in corpus.items() if path.suffix in {".html", ".js"}
    )))
    missing_theme = []
    for page in pages:
        text = corpus[page]
        if "js/tema-init.js" not in text:
            missing_theme.append(page.name)

    results = []
    for page in pages:
        text = corpus[page]
        for width in WIDTHS:
            for theme in THEMES:
                problems = []
                if forbidden:
                    problems.append({"type": "strings/recursos proibidos", "detail": ", ".join(sorted(set(forbidden)))})
                if dark_media:
                    problems.append({"type": "tema do sistema não controlado", "detail": "@media prefers-color-scheme: dark em CSS"})
                if legacy_arrows:
                    problems.append({"type": "controles de carrossel antigos", "detail": "setas/botão visível declarados na marcação ou script"})
                if missing_theme:
                    problems.append({"type": "inicialização de tema ausente", "detail": f"{len(missing_theme)} páginas sem js/tema-init.js"})
                if not re.search(r"<main\b[^>]*\bid=[\"']conteudo[\"'][^>]*\btabindex=[\"']-1[\"']", text, re.I):
                    problems.append({"type": "skip link/alvo principal", "detail": "main#conteudo com tabindex=-1 não encontrado"})
                description = re.search(r'<meta\s+name=["\']description["\']\s+content=["\']([^"\']*)', text, re.I)
                if not description or len(description.group(1)) > 160:
                    problems.append({"type": "SEO incompleto", "detail": "meta description ausente ou acima de 160 caracteres"})
                for selector, label in (
                    (r'<link[^>]+rel=["\']canonical["\']', "canonical"),
                    (r'<meta[^>]+property=["\']og:title["\']', "Open Graph"),
                    (r'<meta[^>]+name=["\']twitter:card["\']', "Twitter card"),
                    (r'<link[^>]+rel=["\']icon["\']', "favicon"),
                ):
                    if not re.search(selector, text, re.I):
                        problems.append({"type": "SEO incompleto", "detail": f"{label} ausente"})
                if not re.search(r"data-theme\s*=\s*[\"']dark[\"']", text, re.I) and not re.search(
                    r"data-theme-pref|tema-init", text, re.I
                ):
                    problems.append({"type": "tema sem preferência explícita", "detail": "atributo/preferência de tema não definido no HTML"})
                results.append({"page": page.name, "width": width, "theme": theme, "problems": problems})
    return results


def run_browser(pages: list[Path], capture_dir: Path) -> list[dict]:
    from playwright.sync_api import sync_playwright

    port = choose_port()
    server = subprocess.Popen(
        [sys.executable, "-m", "http.server", str(port), "--bind", "127.0.0.1"],
        cwd=ROOT,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    results = []
    try:
        for _ in range(50):
            try:
                with socket.create_connection(("127.0.0.1", port), timeout=0.2):
                    break
            except OSError:
                time.sleep(0.1)
        else:
            raise RuntimeError("Servidor HTTP local não iniciou.")

        with sync_playwright() as playwright:
            browser = playwright.chromium.launch()
            for page_path in pages:
                for width in WIDTHS:
                    for theme in THEMES:
                        context = browser.new_context(viewport={"width": width, "height": 900}, device_scale_factor=1)
                        context.add_init_script(
                            "localStorage.setItem('tema', "
                            + repr(theme)
                            + ");"
                        )
                        page = context.new_page()
                        console_errors = []
                        failed_requests = []
                        failed_responses = []
                        page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)
                        page.on("pageerror", lambda exc: console_errors.append(str(exc)))
                        page.on("requestfailed", lambda req: failed_requests.append(f"{req.url}: {req.failure}"))
                        page.on("response", lambda resp: failed_responses.append(f"{resp.status} {resp.url}") if resp.status >= 400 else None)
                        response = None
                        try:
                            response = page.goto(
                                f"http://127.0.0.1:{port}/{page_path.name}",
                                wait_until="networkidle",
                                timeout=20000,
                            )
                            page.wait_for_timeout(350)
                            snapshot = page.evaluate(AUDIT_JS)
                            if width <= 768 and page.locator("[data-menu-toggle]").count():
                                page.locator("[data-menu-toggle]").click()
                                page.wait_for_timeout(100)
                                snapshot["smallTargets"] = page.evaluate(MENU_TARGETS_JS)
                                page.keyboard.press("Escape")
                            problems = []
                            if response and response.status >= 400:
                                problems.append({"type": "HTTP", "detail": f"{response.status} {page_path.name}"})
                            if snapshot["overflow"]:
                                problems.append({"type": "rolagem horizontal", "detail": str(snapshot["offenders"])})
                            if console_errors:
                                problems.append({"type": "erro de console", "detail": " | ".join(console_errors[:3])})
                            http_failures = [f for f in failed_requests if "net::ERR_ABORTED" not in f]
                            http_failures.extend(failed_responses)
                            if http_failures:
                                problems.append({"type": "requisição falha", "detail": " | ".join(http_failures[:3])})
                            if snapshot["brokenImages"]:
                                problems.append({"type": "imagem quebrada", "detail": ", ".join(snapshot["brokenImages"][:3])})
                            if snapshot["prohibited"]:
                                problems.append({"type": "string proibida", "detail": ", ".join(snapshot["prohibited"])})
                            if snapshot["blueLinks"]:
                                problems.append({"type": "link azul padrão", "detail": ", ".join(snapshot["blueLinks"][:3])})
                            if snapshot["smallTargets"]:
                                problems.append({"type": "alvo de toque <44px", "detail": str(snapshot["smallTargets"][:3])})
                            capture_dir.mkdir(parents=True, exist_ok=True)
                            page.screenshot(
                                path=str(capture_dir / f"{page_path.stem}-{width}-{theme}.png"),
                            )
                            results.append({
                                "page": page_path.name,
                                "width": width,
                                "theme": theme,
                                "problems": problems,
                            })
                        except Exception as exc:
                            results.append({
                                "page": page_path.name,
                                "width": width,
                                "theme": theme,
                                "problems": [{"type": "falha do auditor", "detail": str(exc)}],
                            })
                        finally:
                            context.close()
            browser.close()
    finally:
        server.terminate()
        try:
            server.wait(timeout=5)
        except subprocess.TimeoutExpired:
            server.kill()
            server.wait()
    return results


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--report", default="tools/relatorio-layout.md")
    parser.add_argument("--no-browser", action="store_true")
    args = parser.parse_args()
    pages = sorted(path for path in ROOT.glob("*.html") if path.name.lower() != "404.html")
    if not pages:
        print("Nenhuma página HTML encontrada na raiz.", file=sys.stderr)
        return 2
    browser_available = False
    if not args.no_browser:
        try:
            import playwright  # noqa: F401
            results = run_browser(pages, ROOT / "tools" / "capturas")
            browser_available = True
        except Exception as exc:
            print(f"Playwright indisponível; usando análise estática: {exc}", file=sys.stderr)
            results = static_audit(pages)
    else:
        results = static_audit(pages)
    output = ROOT / args.report
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(markdown_report(results, browser_available), encoding="utf-8")
    print(markdown_report(results, browser_available).splitlines()[0:6])
    print(f"Relatório salvo: {output.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
