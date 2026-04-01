# Claude Rules

1. One commit group per logical domain (frontend, backend, QA, analyzer).
2. Do not modify frontend/backend code in STEP 1 except CLAUDE instruction files.
3. Follow NAVBAR and CHAT HUB requirements exactly.
4. Guest flow: 3-hr expiry persistent storage, login migration to DB.
5. Model switching statefully applied (active model shown in UI).
6. Smart capability routing fallback prompt for unsupported model tasks.
7. Token/performance: no huge chat dumps, incremental changes, no duplicate code.
8. Validate with analyzer agent, fix until match screenshots.
