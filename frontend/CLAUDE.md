# Frontend CLAUDE Instructions

## Setup

```bash
cd frontend
npm install
cp .env.local.example .env.local   # or create .env.local manually
npm run dev                         # http://localhost:3000
```

## Environment Variables

Create `frontend/.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## Run Commands

| Command | Description |
|---|---|
| `npm run dev` | Start dev server (port 3000) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Project Structure

```
app/
├── page.tsx              # Home/Landing (server component)
├── chat/page.tsx         # Chat Hub — 3-column layout
├── marketplace/page.tsx  # Model grid with filters
├── discover/page.tsx     # Trending + category browsing
├── agents/page.tsx       # Agent cards + custom builder
├── auth/
│   ├── login/page.tsx    # Sign in → /dashboard
│   └── signup/page.tsx   # Register → /dashboard
└── dashboard/
    ├── page.tsx          # Overview + stats
    ├── history/page.tsx  # Chat session history
    ├── settings/page.tsx # Profile, prefs, API keys
    └── billing/page.tsx  # Plans, usage, invoices

components/
├── Navbar.tsx            # Sticky nav with language selector
├── Providers.tsx         # Redux + MUI theme wrapper
├── SearchBar.tsx         # Hero search (→ /chat)
├── chat/
│   └── CameraModal.tsx   # Camera capture dialog
└── dashboard/
    └── DashboardLayout.tsx  # Protected sidebar layout

lib/
├── theme.ts              # MUI theme (accent=#C8622A, bg=#F4F2EE)
├── store.ts              # Redux (authSlice, chatSlice, modelsSlice)
├── api.ts                # Axios with Bearer token + 401 redirect
└── guestSession.ts       # 3-hour guest session (localStorage)

data/
├── models.json           # 32 AI model definitions
└── cpanel.ts             # Prompt panel (7 categories x 6 prompts)
```

## How Guest Sessions Work

1. On first visit to `/chat`, `createGuestSession()` is called
2. Stores `{ sessionId, expiry }` in `localStorage.nexusai_guest_session`
3. Expiry = `Date.now() + 3 * 60 * 60 * 1000` (3 hours)
4. Guest banner shows time remaining and "Sign In" CTA
5. After 3 hours, session is cleared and a new one is created
6. `getGuestSession()` returns `null` for expired sessions
7. Chat messages are in-memory only (not persisted) for guests
8. On login: token saved to `localStorage.nexusai_token`, Redux state updated

## Auth Token Storage

- Key: `localStorage.nexusai_token`
- Set by: `app/auth/login/page.tsx` and `app/auth/signup/page.tsx`
- Read by: `lib/api.ts` request interceptor (attaches as `Authorization: Bearer`)
- Cleared by: `lib/api.ts` 401 interceptor + `DashboardLayout` logout

## Language Selector (RTL Support)

Navbar language selector sets `document.documentElement.dir`:
- AR (العربية) → `dir="rtl"`
- UR (اردو) → `dir="rtl"`
- All others → `dir="ltr"`

MUI ThemeProvider in `Providers.tsx` observes `html[dir]` via MutationObserver and reconstructs the theme with `direction: 'rtl'` automatically.

## Key Conventions

- All client components: `'use client'` at top of file
- Import paths: use `@/` alias (e.g. `@/lib/store`, `@/components/Navbar`)
- API calls: always use `lib/api.ts` (not bare axios), routes without `/api` prefix
- Colors: use CSS variables or sx props — never hardcode outside the design system
- No dark theme — light theme only throughout
