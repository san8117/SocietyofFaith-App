#!/usr/bin/env python3
"""Generate the project's Open Graph image with Pillow."""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "assets" / "og.png"
WIDTH, HEIGHT = 1200, 630
CREAM = (246, 238, 230)
TERRACOTTA = (168, 80, 47)
INK = (35, 31, 28)


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = (
        ["C:/Windows/Fonts/georgiab.ttf", "C:/Windows/Fonts/georgia.ttf"]
        if bold else ["C:/Windows/Fonts/georgia.ttf", "C:/Windows/Fonts/Georgia.ttf"]
    )
    for candidate in candidates:
        if Path(candidate).exists():
            return ImageFont.truetype(candidate, size)
    return ImageFont.load_default()


def main() -> None:
    image = Image.new("RGB", (WIDTH, HEIGHT), CREAM)
    draw = ImageDraw.Draw(image)
    draw.ellipse((800, -220, 1370, 350), fill=(233, 207, 190))
    draw.ellipse((910, 70, 1130, 290), fill=(217, 165, 139))
    draw.arc((690, 130, 1230, 670), 185, 345, fill=TERRACOTTA, width=5)
    draw.arc((750, 180, 1180, 610), 185, 345, fill=(126, 62, 40), width=3)
    draw.text((86, 164), "Society", font=font(104, True), fill=INK)
    draw.text((90, 280), "of Faith", font=font(82), fill=TERRACOTTA)
    draw.text((94, 420), "Religião e sociedade no Brasil", font=font(33), fill=INK)
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    image.save(OUTPUT, format="PNG", optimize=True)
    print(f"Imagem criada: {OUTPUT.relative_to(ROOT)} ({WIDTH}x{HEIGHT})")


if __name__ == "__main__":
    main()
