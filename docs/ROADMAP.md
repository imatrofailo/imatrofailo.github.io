# ROADMAP — imatrofailo.github.io

> Останнє оновлення: 2026-06-10
> Статус: 10/10 виконано + Сесія E (hygiene & automation). Wiki-deploy plugin лишається опціональним (щоденна автоматизація вже реалізована через cron).

Повний план із 10 пунктів (Сесії A–D). Читай перед початком нової сесії.

---

## Пов'язані репозиторії

| Репо | Шлях | Роль |
|------|------|------|
| imatrofailo.github.io | цей репо | Публічний сайт |
| imatrof-wiki | приватне репо `imatrofailo/imatrof-wiki` | Сирі дані та wiki |
| imatrof-marketplace | приватне репо `imatrofailo/imatrof-marketplace` | Плагіни та автоматизація |

---

## Сесія A — Фундамент

### [1] DESIGN.md ✅ DONE
**Файл:** `DESIGN.md`
Color tokens, fonts, component patterns. Читати перед будь-якими CSS-змінами.

### [2] CLAUDE.md у Pages repo ✅ DONE
**Файл:** `CLAUDE.md`
Структура репо, як оновлювати дані, як деплоїти, правила розробки.

### [3] generate_index.py ✅ DONE → переїхав у scripts/site/
**Файл:** `imatrof-wiki: scripts/site/generate_index.py` (оркестратор: site_update.py)

Сканує `raw/telegram-history/*.md` + `raw/youtube-history/news-index.md` → пише:
- `data/topics-meta.json` — легкий мета (~8KB): id/label/category/color/count
- `data/topics/<id>.json` — повні пости теми (lazy fetch)
- `data/posts.json` — 3110+ постів TG+YT з labels
- `data/topics.json` — повний список тем (сумісність)

```bash
python3 scripts/site/generate_index.py \
  --wiki /path/to/worktree \
  --output /path/to/imatrofailo.github.io/data/
```

**Ключове:** запускати з worktree де є нові пости (до merge в main).
**Автоматично:** cron site-update.sh щодня о 08:00 Kyiv.

---

## Сесія B — Сторінки

### [4] nav.js ✅ DONE
**Файл:** `nav.js` — shared navigation, 5 пунктів: Бульбашки | Карта | Грід | Практики | Архів.
Активний пункт підсвічується по `window.location`.

### [5] index.html — Bubble Explorer ✅ DONE
**Файл:** `index.html`
Bubble canvas, fetch `data/topics.json`, sidebar з постами, filter by category.
Лічильник: Telegram постів | YouTube записів | тем.

### [6] charts.html — Treemap + Waffle ✅ DONE
**Файл:** `charts.html`
Squarified treemap + waffle chart. Fetch `data/topics.json`. Hover → назва + кількість.

### [7] tips.html → praktyky.html — Practical Tips ✅ DONE
**Файл:** `pages/praktyky.html` (tips.html — legacy redirect)
Картки практик. Fetch `data/cards.json` (editorial, update_cards.py). Пошук + фільтр по сегменту.

---

## Сесія C — Telegram import + Wiki check

### [8] Incremental Telegram import ✅ DONE (2026-05-16)
Файл: `all_telegram_as_of_may_16_2026.json`
Результат: +943 нових MD файлів (ID 5–2700, 2024-06-22 → 2026-05-15). Всього: 2302 файли.

Інструменти:
```bash
python3 scripts/inspect_telegram_json.py [json] --ids
python3 scripts/import_telegram_json.py --json [path] --dry-run
python3 scripts/import_telegram_json.py --json [path]
```

### [9] Wiki completeness check ✅ DONE (2026-05-16)
Заповнено 4 заглушки реальним контентом:
- `wiki/topics/new-models.md` — 14 джерел
- `wiki/topics/mcp.md` — 19 джерел
- `wiki/topics/video-generation.md` — 12 джерел
- `wiki/topics/productivity.md` — 11 джерел

---

## Сесія D — Automation

### [10] wiki-deploy плагін ✅ DONE (опціональний)
**Файл:** `imatrof-marketplace: plugins/wiki-deploy/`

> **Примітка (2026-06-10):** щоденна автоматизація вже реалізована інакше — `site-update.sh` cron о 08:00 Kyiv + `auto-tag.sh` chain після import-telegram. Деталі: `imatrof-marketplace/automations/README.md`. Плагін лишається опціональним для ручного deploy-флоу (коли потрібен інтерактивний контроль кожного кроку).

4-кроковий deploy routine:
1. **LINT** — `python3 scripts/wiki_lint.py`
2. **IMPORT** — `import_telegram_json.py --dry-run` → підтвердження → без dry-run
3. **GENERATE** — `generate_index.py --wiki . --output /path/to/imatrofailo.github.io/data/`
4. **DEPLOY** — у клоні `imatrofailo.github.io`: `git add data/ && git commit && git push`

Показувати результат кожного кроку перед наступним. Push тільки після підтвердження Ігоря.

---

## Архітектурні рішення (не обговорювати повторно)

1. JSON data files живуть у `imatrofailo.github.io/data/` — [ADR-0001](adr/0001-data-json-lives-in-pages-repo.md)
2. `generate_index.py` генерує JSON → пише в Pages repo
3. Навігація через shared `nav.js` (vanilla JS, zero deps)
4. `CLAUDE.md` + `DESIGN.md` — окремі файли у Pages repo
5. Incremental updates = завжди повний re-scan (~3 сек, OK)
6. Telegram import = тільки інкремент нових постів (не перезаписувати старі)
7. Теги для Practical Tips = `#практика` (без нових тегів)
8. Automation = скіл у imatrof-marketplace (ручний запуск через Claude Code)
9. **generate_index.py запускати з worktree** де є нові пости, до merge в main

---

## Сесія E (2026-06-10) — виконано

- **SEO-пакет:** favicon.svg (три бульбашки), apple-touch-icon.png, og-image.png, sitemap.xml (6 URL), robots.txt, 404.html з навігацією
- **Perf — meta + lazy:** topics-meta.json (~8KB), data/topics/<id>.json — bubbles і karta стартують без завантаження повних постів
- **tags.json машинне джерело:** generate_index.py читає tags.json з wiki; wiki_lint.py перевіряє синхронність словника
- **UX/A11y + labels:** labels у posts.json, URL-стан фільтрів Архіву, accessibility-атрибути
- **CSS consolidation:** спільні :root-змінні і компоненти переїхали у style.css; сторінки підключають один файл
- **auto-tag.sh:** chain після import-telegram.sh — автоматичне семантичне тегування нових постів батчами
- **Cron stagger:** site-update.sh, wiki-update.sh, import-telegram/youtube рознесені по часу, щоб не конфліктували
