# DESIGN.md — imatrofailo.github.io Visual System

> Єдине джерело дизайн-рішень для публічного сайту. Оновлюється при зміні компонентів.

---

## Кольорова палітра

### Базові кольори
| Змінна | HEX | Використання |
|--------|-----|--------------|
| `--ivory` | `#FAF9F5` | Фон сторінки |
| `--paper` | `#FFFFFF` | Фон карток, модалей |
| `--slate` | `#141413` | Основний текст, заголовки |
| `--oat` | `#E3DACC` | Роздільники header |

### Акцентні кольори
| Змінна | HEX | Використання |
|--------|-----|--------------|
| `--clay` | `#D97757` | Основний акцент: hover, посилання, теги |
| `--clay-d` | `#B85C3E` | Темніший clay: активні стани |
| `--clay-l` | `#FDF0EB` | Світлий clay: фон тегів agents |
| `--olive` | `#788C5D` | Другорядний акцент: теги tools |
| `--olive-l` | `#EEF3E8` | Фон тегів tools |
| `--blue` | `#4A7CC7` | Третинний акцент: теги coding |
| `--blue-l` | `#EEF3FC` | Фон тегів coding |

### Сірі
| Змінна | HEX | Використання |
|--------|-----|--------------|
| `--g100` | `#F0EEE6` | Фон viz-area карток, hover фони |
| `--g200` | `#E6E3DA` | Роздільники секцій |
| `--g300` | `#D1CFC5` | Бордери карток, неактивні елементи |
| `--g500` | `#87867F` | Другорядний текст |
| `--g700` | `#3D3D3A` | Напівжирний допоміжний текст |

---

## Типографіка

| Змінна | Стек | Де використовується |
|--------|------|---------------------|
| `--serif` | `ui-serif, Georgia, Times New Roman` | Заголовки сторінок (h1, h2), числа в статистиці |
| `--sans` | `system-ui, -apple-system, Segoe UI, Roboto` | Основний текст, описи |
| `--mono` | `ui-monospace, SF Mono, Menlo, Monaco` | Теги, дати, лейбли, eyebrow |

### Масштаб
- Page h1: `clamp(28px, 4vw, 48px)`, weight 500, serif
- Section h2: `26px`, weight 500, serif
- Body text: `13–15px`, sans
- Tags / mono labels: `10–11px`, mono, uppercase, letter-spacing 0.05em

---

## Компоненти

### Card (Практики)
```
┌─────────────────────────────┐
│  viz-area (140px)           │  ← SVG geometric illustration
│  background: --g100         │
├─────────────────────────────┤
│  [segment tag]              │  ← mono, 10px, colored by segment
│  Card title (14px, bold)    │
│  Summary (13px, g500, full) │  ← no line-clamp, full 2-3 sentences
│  ─────────────────          │
│  date              →        │
└─────────────────────────────┘
```
- Border: `1.5px solid --g300`, border-radius: `16px`
- Hover: border → `--clay`, box-shadow `0 4px 20px rgba(196,97,74,0.10)`

### Section header (Практики)
- `h2` serif 26px + `p` description 14px g500
- Bottom border: `1.5px solid --g200`
- Margin-bottom: `24px`

### Chart section wrapper (Бульбашки, Карта, Грід)
```css
.chart-section {
  background: --paper;
  border: 1.5px solid --g300;
  border-radius: 16px;
  overflow: hidden;
}
.chart-head { padding: 20px 24px 16px; border-bottom: 1.5px solid --g200; }
.chart-body { padding: 24px; }
```

---

## Viz Illustrations (Практики)

Геометричні SVG-ілюстрації без тексту і емоджі. viewBox: `0 0 260 110`.

### Палітра viz
| Змінна | HEX | Роль |
|--------|-----|------|
| `VR` | `#C4614A` | Brick red — акцент, активні/фінальні елементи |
| `VS` | `#7A8C62` | Sage green — проміжні елементи |
| `VD` | `#3A3A3A` | Dark — структурні елементи, neutral boxes |
| `VM` | `#C5BAB0` | Warm mid gray — неактивні елементи, стрілки |
| `VL` | `#E8DFD8` | Light warm — ghost/фонові елементи, дуги |

### Типи ілюстрацій

| Тип | Геометрія | Концепція |
|-----|-----------|-----------|
| `ladder` | 5 горизонтальних барів різної ширини, активні — VR | Рівні зрілості / прогресія |
| `stack` | 3–4 прямокутники що звужуються знизу вгору (VR→VS→VD→VM) | Архітектурні шари |
| `flow` | N квадратів з→стрілками, останній VR, решта VD | Пайплайн / послідовність |
| `council` | 2×2 grid VD-боксів + 1 VR-бокс знизу з лініями | Мульти-агентна архітектура |
| `steps` | N зростаючих колонок + dots зверху (VD→VS→VR) | Кроки / прогресія |
| `gauge` | Напівколо-дуга з VL фоном і VR fill + endpoint dot | Відсотковий показник |
| `compare` | Ліва панель (VL + VM dashes) → права панель (VR blocks) | До/після порівняння |

### Принципи
- Ніякого тексту всередині SVG
- Ніяких емоджі
- Максимум 3 кольори з палітри viz на одну ілюстрацію
- Форми: rounded rectangles (rx=3–6), circles, lines
- Стрілки: тонкі лінії з polygon-arrow, колір VM

---

## Навігація

`nav.js` — уніфікована навігація підключається через `<script src="../nav.js" defer>` на всіх сторінках.

Посилання: Бульбашки / Карта / Грід / Практики / Архів

---

## Shared CSS (style.css)

`style.css` містить `:root` токени (кольори, шрифти) та спільні компоненти. Всі сторінки підключають його першим через `<link rel="stylesheet" href="/style.css">`.

### Компоненти що живуть централізовано

| Клас / Селектор | Опис |
|---|---|
| `* { box-sizing … }` | Reset |
| `html` | scroll-behavior: smooth |
| `body` | Базовий шрифт, фон, колір, line-height |
| `.page-header` | Шапка сторінки: grid 1fr auto, padding, border-bottom |
| `.page-eyebrow` | Надпис-мітка над заголовком: mono, 11px, clay |
| `.page-header h1` | Заголовок сторінки: serif, clamp(28px–48px) |
| `.page-header p` | Підзаголовок: 15px, g500, max-width 480px |
| `.header-stats` | Колонка статистики в шапці |
| `.stat` | Картка з числом: paper, border, border-radius 12px |
| `.stat-num` | Число у стат-картці: serif, 24px |
| `.stat-label` | Підпис числа: mono, 10px, g500 |
| `.chart-section` | Обгортка чарта: paper, border, border-radius 16px, overflow hidden |
| `.chart-head` | Шапка чарта: padding, border-bottom, flex space-between |
| `.chart-head-left h2` | Заголовок чарта |
| `.chart-head-left p` | Підзаголовок чарта |
| `.chart-body` | Тіло чарта: padding 24px |
| `.legend-item` | Елемент легенди: flex, gap, 12px |
| `.filters` | Рядок фільтрів: flex, wrap, gap 8px |
| `.filter-label` | Текст перед фільтрами |
| `.filter-btn` | Кнопка-фільтр: pill, paper background |
| `.filter-btn .dot` | Кольорова крапка в фільтрі |
| `.filter-btn:hover` | Hover стан фільтра |
| `.filter-btn.active` | Активний стан фільтра: slate fill |
| `.dot-company` | Крапка: clay (компанії) |
| `.dot-topic` | Крапка: olive (теми) |
| `.dot-product` | Крапка: blue (продукти) |
| `#tooltip strong` | Заголовок тултіпа |
| `#tooltip span` | Підтекст тултіпа |
| `.loading` | Лоадер: flex center, 200px height, mono |
| `footer` | Підвал: 1100px center, padding, border-top, flex |
| `footer a` | Посилання у підвалі: clay |
| `@media (max-width: 768px)` | `.page-header` → single column; `.header-stats` → row; `.content, footer` padding 20px; `.chart-body` padding 16px |

### Правила для нових сторінок

- Підключай `/style.css` першим у `<head>`
- Не копіюй перелічені вище правила у `<style>` сторінки
- Якщо сторінка потребує відхилення від базового правила — залишай тільки override-декларацію з коментарем `/* override */`
- Елементи що притаманні лише одній сторінці (sidebar, специфічний grid, canvas) — залишай у `<style>` сторінки

### Відомі override-відхилення

| Сторінка | Селектор | Відхилення |
|---|---|---|
| `bubbles.html` | `.chart-section` | Додає `margin-bottom: 40px` (відступ між секціями) |
| `bubbles.html` | `.loading` | `height: 420px` (canvas вищий за default 200px) |
| `arkhiv.html` | `.stat` | `min-width: 90px` (компактніші числа у рядку) |
| `praktyky.html` | `.stat-num` | `font-size: 28px` (більший акцент, shared base 24px) |
| `index.html` | `footer` | Додає `align-items: center` |
| `404.html` | `body` | Додає flex-column для sticky footer |
| `404.html` | `.page-header` | `width: 100%; grid-template-columns: 1fr` (без колонки статів) |
| `404.html` | `.page-header p` | `max-width: none` |
| `404.html` | `footer` | Додає `width: 100%` для flex child |
| `bubbles.html`, `karta.html`, `hrid.html` | `#tooltip` | Різні `z-index` та `max-width` — залишається per-page |
| `bubbles.html`, `karta.html`, `hrid.html` | `.legend-dot` | Різна форма: bubbles — коло (50%), karta/hrid — прямокутник (2px) |

---

## Принципи архітектури

- **Zero dependencies** — vanilla JS, без React/D3/npm
- **No build step** — файли деплояться as-is
- **Single-file pages** — кожна сторінка самодостатня крім `nav.js` і `data/*.json`
- `data/topics.json`, `data/posts.json` — генеруються через `generate_index.py`, не редагувати вручну
- `data/cards.json` — editorial curation, оновлюється через `scripts/update_cards.py` + діалог з Claude
