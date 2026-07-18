# CLAUDE.md — imatrofailo.github.io (Pages repo)

Інструкція для агентів що працюють з цим репозиторієм.

> **Читай першим:** [docs/ROADMAP.md](docs/ROADMAP.md) — план 10 пунктів, що зроблено, що лишилось.

---

## Структура репозиторію

```
imatrofailo.github.io/
  index.html            ← Bubble Explorer (головна) ✅
  404.html              ← Branded error page ✅
  charts.html           ← Legacy redirect → /pages/karta.html (залишено для старих посилань)
  tips.html             ← Legacy redirect → /pages/praktyky.html (залишено для старих посилань)
  nav.js                ← Shared navigation ✅
  style.css             ← :root CSS vars і токени ✅
  favicon.svg           ← Три бульбашки (clay/blue/olive), viewBox 0 0 64 64 ✅
  apple-touch-icon.png  ← 180×180 iOS icon ✅
  og-image.png          ← 1200×630 Open Graph image ✅
  sitemap.xml           ← 6 URL, lastmod 2026-06-10 ✅
  robots.txt            ← Allow all + Sitemap ref ✅
  DESIGN.md             ← Дизайн-токени і компоненти (читай перед CSS-змінами) ✅
  CLAUDE.md             ← Цей файл
  data/
    topics-meta.json ← Легкий мета-файл (id/label/category/color/count), ~8KB ✅
    topics.json      ← Повний список тем (сумісність; може видалятись) ← generate_index.py
    posts.json       ← Всі пости TG+YT з labels; для Архіву ← generate_index.py
    cards.json       ← Editorial картки Практик; оновлюється scripts/site/update_cards.py
    topics/          ← data/topics/<id>.json — повні пости теми, lazy fetch ✅
  docs/
    ROADMAP.md     ← План 10 пунктів (9/10 done), що лишилось ✅
    adr/           ← Architecture Decision Records
  pages/
    bubbles.html   ← Bubble Explorer ✅
    karta.html     ← Treemap + Waffle ✅
    hrid.html      ← Grid view ✅
    praktyky.html  ← Practical Tips ✅
    arkhiv.html    ← Archive ✅
```

---

## Пов'язані репозиторії

| Репо | Шлях | Роль |
|------|------|------|
| imatrof-wiki | `~/imatrof-space/imatrof-wiki/` | Сирі дані (raw/) і wiki/topics/ |
| imatrof-marketplace | `~/imatrof-space/imatrof-marketplace/` | Плагіни і автоматизація |
| imatrof-docs | приватне репо `imatrofailo/imatrof-docs` | Ecosystem-рівнева документація: крос-репо патерни, automation-політики |

Перед новою роботою прочитай патерни/архітектуру в приватному `imatrofailo/imatrof-docs`; якщо доступу/клону немає — спитай власника.

---

## Як оновити дані

```bash
# З директорії imatrof-wiki (або worktree з новими постами):
python3 scripts/site/generate_index.py \
  --wiki ../imatrof-wiki \
  --output ../imatrofailo.github.io/data/
```

Скрипт сканує всі `raw/telegram-history/*.md` і `raw/youtube-history/news-index.md`, генерує JSON.
Запускати після кожного імпорту нових Telegram-постів або вручну.

> **Автоматично:** cron site-update.sh запускає `scripts/site/site_update.py` щодня о 08:00 Kyiv (05:00 UTC).

---

## Як задеплоїти

```bash
cd imatrofailo.github.io
git add data/ index.html charts.html tips.html nav.js
git commit -m "data: update index $(date +%Y-%m-%d)"
git push
```

GitHub Pages автоматично деплоїть після push на main.
URL: https://imatrofailo.github.io

> **Автоматично:** cron `site-update.sh` робить це щодня о 08:00 Kyiv (05:00 UTC) без участі Ігоря.
> **Ручний push:** тільки після явного підтвердження від Ігоря — агент самостійно НЕ пушить.

---

## Правила розробки

1. **Zero dependencies** — тільки vanilla JS, без React, D3, npm
2. **Single-file pages** — кожна сторінка самодостатня, крім `nav.js`, `style.css` і `data/*.json`
3. **Fetch from JSON** — ніколи не хардкодь дані тем в HTML
4. **No build step** — файли деплояться as-is
5. Дизайн-рішення → читай [DESIGN.md](DESIGN.md) перед змінами CSS

---

## Формати JSON-файлів

### data/topics-meta.json (~8KB, lazy-start)
```json
{
  "generated": "2026-06-10T08:00:00",
  "total_posts": 2355,
  "total_youtube": 165,
  "total": 2520,
  "topics": [
    { "id": "openai", "label": "OpenAI", "category": "company", "color": "#...", "count": 163 }
  ]
}
```

### data/topics/\<id\>.json (повні пости теми, lazy fetch)
```json
{
  "id": "openai",
  "posts": [
    { "title": "...", "date": "2026-05-01", "url": "https://t.me/imatrofAI/2010", "preview": "..." }
  ]
}
```

### data/posts.json (для Архіву)
```json
{
  "total": 3110, "total_telegram": 2355, "total_youtube": 165,
  "posts": [
    {
      "title": "...", "date": "YYYY-MM-DD", "url": "...", "preview": "...",
      "source": "telegram",
      "labels": ["новина", "anthropic", "claude-code"]
    }
  ]
}
```

### data/cards.json (Editorial практики, оновлюється scripts/site/update_cards.py)
```json
{
  "generated": "2026-06-10",
  "cards": [
    { "title": "...", "date": "YYYY-MM-DD", "url": "...", "preview": "...", "segment": "..." }
  ]
}
```

---

## ADR (Architecture Decision Records)

Зберігаються у `docs/adr/`. Читати перед архітектурними рішеннями:
- [ADR-0001](docs/adr/0001-data-json-lives-in-pages-repo.md) — JSON-файли живуть у Pages repo
