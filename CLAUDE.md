# CLAUDE.md — imatrofailo.github.io (Pages repo)

Інструкція для агентів що працюють з цим репозиторієм.

> **Читай першим:** [docs/ROADMAP.md](docs/ROADMAP.md) — план 10 пунктів, що зроблено, що лишилось.

---

## Структура репозиторію

```
imatrofailo.github.io/
  index.html       ← Bubble Explorer (головна) ✅
  charts.html      ← Legacy redirect → /pages/karta.html (залишено для старих посилань)
  tips.html        ← Legacy redirect → /pages/praktyky.html (залишено для старих посилань)
  nav.js           ← Shared navigation ✅
  DESIGN.md        ← Дизайн-токени і компоненти (читай перед CSS-змінами) ✅
  CLAUDE.md        ← Цей файл
  data/
    topics.json    ← Генерується generate_index.py (не редагувати вручну)
    tips.json      ← Генерується generate_index.py (не редагувати вручну)
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

---

## Як оновити дані (topics.json, tips.json)

```bash
# З директорії imatrof-wiki:
python3 scripts/generate_index.py --output /tmp/imatrof-pages/data/

# Або з абсолютним шляхом до wiki:
python3 ~/imatrof-space/imatrof-wiki/scripts/generate_index.py \
  --wiki ~/imatrof-space/imatrof-wiki \
  --output /tmp/imatrof-pages/data/
```

Скрипт сканує всі `raw/telegram-history/*.md` і генерує JSON.
Запускати після кожного імпорту нових Telegram-постів.

---

## Як задеплоїти

```bash
cd /tmp/imatrof-pages
git add data/ index.html charts.html tips.html nav.js
git commit -m "data: update index $(date +%Y-%m-%d)"
git push
```

GitHub Pages автоматично деплоїть після push на main.
URL: https://imatrofailo.github.io

**Правило:** агент НЕ пушить без явного підтвердження від Ігоря.

---

## Правила розробки

1. **Zero dependencies** — тільки vanilla JS, без React, D3, npm
2. **Single-file pages** — кожна сторінка самодостатня, крім `nav.js` і `data/*.json`
3. **Fetch from JSON** — ніколи не хардкодь дані тем в HTML
4. **No build step** — файли деплояться as-is
5. Дизайн-рішення → читай [DESIGN.md](DESIGN.md) перед змінами CSS

---

## Формат data/topics.json

```json
{
  "generated": "2026-05-16T10:00:00",
  "total_posts": 1358,
  "topics": [
    {
      "id": "openai",
      "label": "OpenAI",
      "category": "company",
      "count": 163,
      "posts": [
        {
          "title": "Назва посту",
          "date": "2026-05-01",
          "url": "https://t.me/imatrofAI/2010",
          "preview": "Перше речення посту для preview..."
        }
      ]
    }
  ]
}
```

## Формат data/tips.json

```json
{
  "generated": "2026-05-16T10:00:00",
  "tips": [
    {
      "title": "Назва практичного посту",
      "date": "2026-05-01",
      "url": "https://t.me/imatrofAI/2010",
      "preview": "Перше речення...",
      "tags": ["#anthropic", "#практика", "#claude-code"]
    }
  ]
}
```

---

## ADR (Architecture Decision Records)

Зберігаються у `docs/adr/`. Читати перед архітектурними рішеннями:
- [ADR-0001](docs/adr/0001-data-json-lives-in-pages-repo.md) — JSON-файли живуть у Pages repo
