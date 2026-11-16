#!/usr/bin/env python3
from __future__ import annotations

import xml.dom.minidom
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUTPUT_ROOT = ROOT / 'assets' / 'img' / 'religioes'
SLOTS = ['capa', 'origens', 'brasil', 'hoje', 'galeria1', 'galeria2', 'galeria3']
CREAM = '#F6EEE6'
SLUGS = {
    'catolicismo': '#A8502F',
    'evangelicos': '#2F6B7A',
    'espiritismo': '#6C5B9E',
    'umbanda': '#C8553D',
    'candomble': '#B8742C',
    'tradicoes-indigenas': '#4E8A5B',
    'judaismo': '#3E5C99',
    'islamismo': '#1F7A6D',
    'budismo': '#D9A21F',
    'hinduismo': '#C9467A',
    'testemunhas-de-jeova': '#5B7A8C',
    'mormons': '#7A5C3E',
    'tradicoes-esotericas': '#4B3F72',
    'santo-daime': '#2F7D4F',
    'sem-religiao': '#3D4A57',
    'cristianismo': '#8A3A1C',
}


def hex_to_rgb(value):
    value = value.lstrip('#')
    return tuple(int(value[i:i+2], 16) for i in (0, 2, 4))


def mix_hex(a, b, ratio):
    ar, ag, ab = hex_to_rgb(a)
    br, bg, bb = hex_to_rgb(b)
    return '#%02x%02x%02x' % (
        int(ar + (br - ar) * ratio),
        int(ag + (bg - ag) * ratio),
        int(ab + (bb - ab) * ratio),
    )


def darken_hex(value, ratio):
    r, g, b = hex_to_rgb(value)
    return '#%02x%02x%02x' % (
        int(r * (1 - ratio)),
        int(g * (1 - ratio)),
        int(b * (1 - ratio)),
    )


def grain():
    return '''<pattern id="grain" width="80" height="80" patternUnits="userSpaceOnUse">
      <circle cx="12" cy="18" r="1.4" fill="#fff" opacity="0.10"/>
      <circle cx="44" cy="58" r="1.1" fill="#fff" opacity="0.08"/>
      <circle cx="68" cy="36" r="1.5" fill="#fff" opacity="0.09"/>
    </pattern>'''


def motif(slug, slot, primary, tint, deep):
    dx = {'capa': 0, 'origens': -90, 'brasil': 90, 'hoje': 20, 'galeria1': -120, 'galeria2': 0, 'galeria3': 120}.get(slot, 0)
    if slug == 'catolicismo':
        return f'''
        <path d="M 520 700 C 700 470, 690 270, 800 270 C 910 270, 900 470, 1080 700" fill="none" stroke="{deep}" stroke-width="7" opacity="0.6"/>
        <path d="M 580 360 L 800 700 L 1020 360" fill="none" stroke="{primary}" stroke-width="6" opacity="0.75"/>
        <circle cx="800" cy="465" r="120" fill="{tint}" opacity="0.34"/>
        <circle cx="800" cy="465" r="32" fill="{deep}" opacity="0.75"/>
        '''
    if slug == 'evangelicos':
        return f'''
        <path d="M 540 700 Q 760 {420 + dx} 800 400 Q 840 {420 + dx} 1060 700 L 1060 780 L 540 780 Z" fill="{tint}" opacity="0.8"/>
        <path d="M 650 420 L 800 300 L 950 420" fill="none" stroke="{deep}" stroke-width="7" opacity="0.72"/>
        <path d="M 800 300 L 800 780" stroke="{primary}" stroke-width="4" opacity="0.82"/>
        <path d="M 700 540 L 900 540 L 900 620 L 700 620 Z" fill="{primary}" opacity="0.18"/>
        '''
    if slug == 'espiritismo':
        return f'''
        <path d="M 800 260 C 920 360, 950 470, 800 530 C 650 470, 680 360, 800 260 Z" fill="none" stroke="{deep}" stroke-width="5" opacity="0.7"/>
        <path d="M 800 260 C 980 360, 1010 520, 800 620 C 590 520, 620 360, 800 260 Z" fill="none" stroke="{primary}" stroke-width="4" opacity="0.7"/>
        <path d="M 420 760 C 620 620, 650 460, 800 440 C 950 460, 980 620, 1180 760" fill="none" stroke="{tint}" stroke-width="4" opacity="0.8"/>
        <path d="M 800 220 L 800 780" stroke="{primary}" stroke-width="2.5" opacity="0.7"/>
        '''
    if slug == 'umbanda':
        return f'''
        <path d="M 330 660 C 500 560, 570 420, 720 470 C 860 520, 890 710, 1270 640" fill="none" stroke="{primary}" stroke-width="6" opacity="0.75"/>
        <path d="M 420 340 C 500 250, 640 220, 760 300 C 870 375, 1020 370, 1160 300" fill="none" stroke="{deep}" stroke-width="5" opacity="0.75"/>
        <path d="M 640 380 C 690 300, 870 300, 930 380 C 880 420, 760 440, 640 380 Z" fill="{tint}" opacity="0.74"/>
        <circle cx="760" cy="290" r="18" fill="{deep}" opacity="0.8"/>
        '''
    if slug == 'candomble':
        return f'''
        <path d="M 300 700 C 410 540, 520 520, 640 600 C 690 630, 770 650, 840 620 C 960 570, 1020 430, 1180 500" fill="none" stroke="{primary}" stroke-width="5" opacity="0.72"/>
        <path d="M 430 420 C 490 300, 620 280, 700 380 C 590 420, 530 470, 430 420 Z" fill="{tint}" opacity="0.75"/>
        <path d="M 820 420 C 900 300, 1050 300, 1120 420 C 1030 470, 930 490, 820 420 Z" fill="{primary}" opacity="0.24"/>
        <circle cx="800" cy="500" r="112" fill="none" stroke="{deep}" stroke-width="4" opacity="0.7"/>
        '''
    if slug == 'tradicoes-indigenas':
        return f'''
        <path d="M 260 720 L 500 420 L 700 700 L 900 350 L 1120 720 L 1330 430" fill="none" stroke="{primary}" stroke-width="6" opacity="0.75"/>
        <path d="M 300 525 L 640 525 L 800 760 L 1030 525 L 1280 525" fill="none" stroke="{deep}" stroke-width="4" opacity="0.7"/>
        <rect x="560" y="300" width="110" height="110" fill="{tint}" opacity="0.62"/>
        <rect x="930" y="300" width="110" height="110" fill="{tint}" opacity="0.62"/>
        '''
    if slug == 'judaismo':
        return f'''
        <path d="M 420 660 L 620 330 L 820 660 Z" fill="{tint}" opacity="0.74"/>
        <path d="M 780 660 L 980 330 L 1180 660 Z" fill="{tint}" opacity="0.74"/>
        <path d="M 640 330 L 960 330" stroke="{deep}" stroke-width="5" opacity="0.75"/>
        <path d="M 700 380 L 900 380 L 900 700 L 700 700 Z" fill="{primary}" opacity="0.18"/>
        <circle cx="800" cy="405" r="22" fill="{deep}" opacity="0.8"/>
        '''
    if slug == 'islamismo':
        return f'''
        <path d="M 760 300 L 1080 570 L 760 760 L 440 570 Z" fill="{tint}" opacity="0.72"/>
        <path d="M 760 350 L 1010 570 L 760 710 L 510 570 Z" fill="{primary}" opacity="0.22"/>
        <path d="M 760 280 L 760 760" stroke="{deep}" stroke-width="5" opacity="0.7"/>
        <path d="M 440 570 L 760 430 L 1080 570 L 760 700 Z" fill="none" stroke="{deep}" stroke-width="4" opacity="0.68"/>
        '''
    if slug == 'budismo':
        return f'''
        <circle cx="800" cy="520" r="150" fill="{tint}" opacity="0.72"/>
        <circle cx="800" cy="520" r="80" fill="{primary}" opacity="0.12"/>
        <path d="M 800 260 L 760 420 L 800 590 L 840 420 Z" fill="{deep}" opacity="0.72"/>
        <path d="M 650 520 L 800 350 L 950 520 L 800 690 Z" fill="none" stroke="{deep}" stroke-width="5" opacity="0.72"/>
        '''
    if slug == 'hinduismo':
        return f'''
        <circle cx="800" cy="520" r="190" fill="none" stroke="{primary}" stroke-width="5" opacity="0.7"/>
        <circle cx="800" cy="520" r="120" fill="{tint}" opacity="0.7"/>
        <path d="M 800 290 C 860 390, 900 500, 800 640 C 700 500, 740 390, 800 290 Z" fill="{deep}" opacity="0.38"/>
        <path d="M 640 520 L 800 320 L 960 520 L 800 700 Z" fill="none" stroke="{primary}" stroke-width="5" opacity="0.7"/>
        '''
    if slug == 'testemunhas-de-jeova':
        return f'''
        <path d="M 520 680 Q 700 410 800 410 Q 900 410 1080 680" fill="none" stroke="{primary}" stroke-width="6" opacity="0.72"/>
        <path d="M 580 660 L 580 350 L 1020 350 L 1020 660" fill="none" stroke="{deep}" stroke-width="4" opacity="0.7"/>
        <path d="M 800 350 L 800 680" stroke="{primary}" stroke-width="4" opacity="0.8"/>
        <path d="M 720 520 L 880 520" stroke="{tint}" stroke-width="18" opacity="0.6"/>
        '''
    if slug == 'mormons':
        return f'''
        <path d="M 200 720 L 460 520 L 650 720 L 860 430 L 1140 720 L 1400 720 L 1400 820 L 200 820 Z" fill="{tint}" opacity="0.72"/>
        <path d="M 700 320 L 800 220 L 900 320" fill="none" stroke="{deep}" stroke-width="5" opacity="0.75"/>
        <circle cx="800" cy="290" r="42" fill="{primary}" opacity="0.18"/>
        <path d="M 210 730 C 540 620, 700 620, 1040 700 S 1240 630, 1410 710" fill="none" stroke="{deep}" stroke-width="5" opacity="0.72"/>
        '''
    if slug == 'tradicoes-esotericas':
        return f'''
        <circle cx="780" cy="520" r="120" fill="{tint}" opacity="0.44"/>
        <path d="M 310 290 L 420 390 L 520 290 L 610 420 L 720 330 L 830 470 L 930 360 L 1050 480 L 1160 350 L 1280 440" fill="none" stroke="{primary}" stroke-width="3" opacity="0.78"/>
        <circle cx="810" cy="510" r="90" fill="{primary}" opacity="0.14"/>
        <path d="M 760 300 C 830 360, 880 470, 760 580 C 640 470, 690 360, 760 300 Z" fill="{deep}" opacity="0.22"/>
        '''
    if slug == 'santo-daime':
        return f'''
        <path d="M 280 700 C 430 610, 470 450, 530 410 C 610 350, 650 250, 760 250 C 870 250, 920 350, 980 410 C 1040 470, 1060 620, 1220 700" fill="none" stroke="{primary}" stroke-width="5" opacity="0.72"/>
        <path d="M 400 430 C 480 380, 560 390, 640 430 C 560 500, 500 520, 400 430 Z" fill="{tint}" opacity="0.75"/>
        <path d="M 970 430 C 1045 390, 1110 390, 1190 430 C 1100 500, 1040 520, 970 430 Z" fill="{tint}" opacity="0.75"/>
        <circle cx="820" cy="470" r="84" fill="{primary}" opacity="0.12"/>
        '''
    if slug == 'sem-religiao':
        return f'''
        <rect x="440" y="270" width="720" height="410" fill="{tint}" opacity="0.6"/>
        <path d="M 440 690 Q 800 620 1160 690" fill="none" stroke="{deep}" stroke-width="6" opacity="0.72"/>
        <path d="M 530 300 L 620 300 L 560 380 Z" fill="{primary}" opacity="0.2"/>
        <circle cx="770" cy="410" r="36" fill="{deep}" opacity="0.8"/>
        <path d="M 780 380 L 780 430 M 755 405 L 805 405 M 760 350 L 800 440 M 760 440 L 800 350" stroke="{primary}" stroke-width="3" opacity="0.7"/>
        '''
    if slug == 'cristianismo':
        return f'''
        <path d="M 320 760 C 500 620, 550 460, 640 430 C 710 410, 740 360, 780 300 C 820 360, 850 410, 920 430 C 1010 460, 1060 620, 1240 760" fill="none" stroke="{primary}" stroke-width="5" opacity="0.72"/>
        <rect x="500" y="300" width="48" height="350" fill="{tint}" opacity="0.74"/>
        <rect x="1052" y="300" width="48" height="350" fill="{tint}" opacity="0.74"/>
        <rect x="720" y="360" width="48" height="290" fill="{primary}" opacity="0.18"/>
        <rect x="832" y="360" width="48" height="290" fill="{primary}" opacity="0.18"/>
        '''
    return f'''
        <circle cx="800" cy="500" r="170" fill="{tint}" opacity="0.25"/>
        <path d="M 350 690 C 600 540, 850 540, 1250 690" fill="none" stroke="{primary}" stroke-width="5" opacity="0.75"/>
        <circle cx="800" cy="460" r="48" fill="{deep}" opacity="0.6"/>
    '''


def render_svg(slug, slot):
    primary = SLUGS[slug]
    tint = mix_hex(CREAM, primary, 0.8)
    deep = darken_hex(primary, 0.35)
    return f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" width="1600" height="1000" role="img" aria-label="Ilustração abstrata inspirada em {slug.replace('-', ' ')}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="{CREAM}"/>
      <stop offset="100%" stop-color="{tint}"/>
    </linearGradient>
    {grain()}
  </defs>
  <rect width="1600" height="1000" fill="url(#bg)"/>
  <rect width="1600" height="1000" fill="url(#grain)" opacity="0.65"/>
  <circle cx="1180" cy="250" r="180" fill="{tint}" opacity="0.22"/>
  <path d="M 0 700 C 260 620, 420 640, 620 710 S 980 760, 1600 690" fill="none" stroke="{primary}" stroke-width="4" opacity="0.36"/>
  <path d="M 0 760 C 250 710, 430 710, 620 780 S 980 830, 1600 780" fill="none" stroke="{deep}" stroke-width="3" opacity="0.28"/>
  {motif(slug, slot, primary, tint, deep)}
</svg>'''


def main():
    OUTPUT_ROOT.mkdir(parents=True, exist_ok=True)
    total = 0
    largest_size = 0
    largest_name = ''
    errors = []
    for slug in SLUGS:
        slug_dir = OUTPUT_ROOT / slug
        slug_dir.mkdir(parents=True, exist_ok=True)
        for slot in SLOTS:
            svg = render_svg(slug, slot)
            path = slug_dir / f'{slot}.svg'
            path.write_text(svg, encoding='utf-8')
            total += 1
            size = path.stat().st_size
            if size > largest_size:
                largest_size = size
                largest_name = path.relative_to(ROOT).as_posix()
            try:
                xml.dom.minidom.parseString(svg)
            except Exception as exc:
                errors.append(f'{slug}/{slot}: {exc}')
            if size >= 15000:
                errors.append(f'{slug}/{slot}: excedeu 15 KB ({size} bytes)')
    print(f'Total gerado: {total}')
    print(f'Maior arquivo: {largest_name} ({largest_size} bytes)')
    print('Erros:')
    if errors:
        for item in errors:
            print(f'- {item}')
    else:
        print('Nenhum.')


if __name__ == '__main__':
    main()
