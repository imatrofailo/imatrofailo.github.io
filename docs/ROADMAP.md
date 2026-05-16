# ROADMAP — imatrofailo.github.io

> Останнє оновлення: 2026-05-16
> Статус: 9/10 виконано. Лишився [10] wiki-deploy plugin.

Повний план із 10 пунктів (Сесії A–D). Читай перед початком нової сесії.

---

## Пов'язані репозиторії

| Репо | Шлях | Роль |
|------|------|------|
| imatrofailo.github.io | `/tmp/imatrofailo-pages/` | Публічний сайт (цей репо) |
| imatrof-wiki | `~/imatrof-space/imatrof-wiki/` | Сирі дані та wiki |
| imatrof-marketplace | `~/imatrof-space/imatrof-marketplace/` | Плагіни та автоматизація |

---

## Сесія A — Фундамент

### [1] DESIGN.md ✅ DONE
**Файл:** `DESIGN.md`
Color tokens, fonts, component patterns. Читати перед будь-якими CSS-змінами.

### [2] CLAUDE.md у Pages repo ✅ DONE
**Файл:** `CLAUDE.md`
Структура репо, як оновлювати дані, як деплоїти, правила розробки.

### [3] generate_index.py ✅ DONE
**Файл:** `~/imatrof-space/imatrof-wiki/scripts/generate_index.py`

Сканує `raw/telegram-history/*.md` + `raw/youtube-history/news-index.md` → пише:
- `data/topics.json` — 92 теми, 2300 TG + 810 YT записів
- `data/tips.json` — 517 практичних постів (#практика)

```bash
python3 scripts/generate_index.py \
  --wiki /path/to/worktree \
  --output /tmp/imatrofailo-pages/data/
```

**Ключове:** запускати з worktree де є нові пости (до merge в main).

---

## Сесія B — Сторінки

### [4] nav.js ✅ DONE
**Файл:** `nav.js` — shared navigation, 3 пункти: Home | Charts | Tips.
Активний пункт підсвічується по `window.location`.

### [5] index.html — Bubble Explorer ✅ DONE
**Файл:** `index.html`
Bubble canvas, fetch `data/topics.json`, sidebar з постами, filter by category.
Лічильник: Telegram постів | YouTube записів | тем.

### [6] charts.html — Treemap + Waffle ✅ DONE
**Файл:** `charts.html`
Squarified treemap + waffle chart. Fetch `data/topics.json`. Hover → назва + кількість.

### [7] tips.html — Practical Tips ✅ DONE
**Файл:** `tips.html`
Картки постів з #практика тегом. Fetch `data/tips.json`. Пошук + фільтр по тегах.

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

### [10] wiki-deploy плагін ⏳ TODO
**Файл:** `~/imatrof-space/imatrof-marketplace/plugins/wiki-deploy/`

```
plugins/wiki-deploy/
  .claude-plugin/plugin.json
  skills/wiki-deploy/SKILL.md
```

`SKILL.md` має містити 4-кроковий deploy routine:
1. **LINT** — `python3 scripts/wiki_lint.py`
2. **IMPORT** — `import_telegram_json.py --dry-run` → підтвердження → без dry-run
3. **GENERATE** — `generate_index.py --wiki . --output /tmp/imatrofailo-pages/data/`
4. **DEPLOY** — `cd /tmp/imatrofailo-pages && git add data/ && git commit && git push`

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
