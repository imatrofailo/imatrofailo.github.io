# ADR-0002: Autonomous push for imatrofailo.github.io data updates

**Date:** 2026-05-16  
**Status:** Accepted

## Context

`imatrof-wiki/CLAUDE.md` contains a general rule: agents must not push to any git repository without explicit confirmation from Igor. This rule exists to protect the imatrof-wiki content from unintended changes.

The daily site routine needs to push updated `data/*.json` files to `imatrofailo.github.io` on a schedule — by definition without Igor present.

## Decision

The daily site routine is granted an explicit exception to the no-push rule. It may autonomously push to `imatrofailo.github.io` without per-run confirmation.

The exception applies **only** to:
- Repository: `imatrofailo.github.io`
- Files: `data/*.json` (generated, not hand-authored)
- Operation: result of running `generate_index.py` on already-imported posts

The general no-push rule remains in force for `imatrof-wiki` and all other repositories.

## Rationale

- `imatrofailo.github.io` is a static public site; `data/*.json` are generated files, not editorial content
- A mistaken push is trivially reverted (`git revert` or re-run of generate_index.py)
- Requiring per-run confirmation defeats the purpose of a scheduled routine
- The imatrof-wiki repo (editorial content, tags, wiki pages) remains protected by the original rule
