# NexusAI Platform — Architecture

## Overview

NexusAI is a full-stack AI Model Hub with 400+ models, guest chat, auth, marketplace, and dashboard.

```
┌─────────────────────────────────────────────┐
│              Frontend (Next.js 16)           │
│              http://localhost:3000           │
├─────────────────────────────────────────────┤
│  App Router pages:                          │
│  /                → Landing (hero + search) │
│  /chat            → 3-col Chat Hub          │
│  /marketplace     → Model grid + filters    │
│  /discover        → Trending + categories   │
│  /agents          → Agent builder           │
│  /auth/login      → Sign in                 │
│  /auth/signup     → Create account          │
│  /dashboard       → Stats + activity        │
│  /dashboard/history   → Chat sessions       │
│  /dashboard/settings  → Profile + prefs     │
│  /dashboard/billing   → Plans + usage       │
└──────────────┬──────────────────────────────┘
               │ HTTP (axios / fetch)
               │ NEXT_PUBLIC_API_URL=http://localhost:3001/api
               ▼
┌─────────────────────────────────────────────┐
│             Backend (NestJS 11)             │
│             http://localhost:3001           │
│             Swagger: /api/docs              │
├─────────────────────────────────────────────┤
│  Modules:                                   │
│  AuthModule    → /api/auth/*                │
│  ModelsModule  → /api/models/*              │
│  ChatModule    → /api/chat/*                │
│  UploadModule  → /api/upload                │
│  FormsModule   → /api/forms/*               │
│  DashboardModule → /api/dashboard/*         │
└──────────────┬──────────────────────────────┘
               │ Mongoose
               ▼
┌─────────────────────────────────────────────┐
│           MongoDB (localhost:27017)          │
│           Database: nexusai                 │
│  Collections: users, chatsessions           │
└─────────────────────────────────────────────┘
```

## Frontend Architecture

### Tech Stack
- **Next.js 16** App Router (server + client components)
- **MUI 7** for all UI components — light theme only
- **Redux Toolkit** for global state (auth, chat, models slices)
- **Axios** configured client (`lib/api.ts`) with auth interceptors
- **TypeScript 5** throughout

### Key Files
| File | Purpose |
|---|---|
| `lib/theme.ts` | MUI theme: accent=#C8622A, bg=#F4F2EE, Syne+Instrument Sans fonts |
| `lib/store.ts` | Redux store: authSlice, chatSlice, modelsSlice |
| `lib/api.ts` | Axios instance with Bearer token + 401 redirect to /auth/login |
| `lib/guestSession.ts` | Guest session create/read/expire (3-hour TTL, localStorage) |
| `components/Navbar.tsx` | Sticky nav, language selector (RTL for AR/UR), auth user menu |
| `components/Providers.tsx` | Redux + MUI ThemeProvider wrapper |
| `components/chat/CameraModal.tsx` | getUserMedia camera capture dialog |
| `components/dashboard/DashboardLayout.tsx` | Protected sidebar layout |
| `data/models.json` | 32 AI model definitions |
| `data/cpanel.ts` | Prompt panel data (7 categories x 6 prompts) |

### Guest Session Flow
1. User visits `/chat` without auth
2. `createGuestSession()` generates UUID + stores in `localStorage` with 3h expiry key `nexusai_guest_session`
3. All chat requests sent with `sessionId` and `isGuest: true`
4. Banner shown with time remaining + sign-in CTA
5. On sign-in: `access_token` stored as `localStorage.nexusai_token`
6. Redux `setAuth` dispatched → `isAuthenticated: true`

### Auth Flow
1. POST `/auth/login` → returns `{ user, access_token }`
2. `access_token` stored as `localStorage.nexusai_token`
3. Redux `authSlice.setAuth` sets `isAuthenticated: true`
4. All API calls via `lib/api.ts` auto-attach `Authorization: Bearer <token>`
5. 401 responses → clear token + redirect to `/auth/login`
6. Dashboard routes protected by `DashboardLayout` (redirects if `!isAuthenticated`)

## Backend Architecture

### Tech Stack
- **NestJS 11** with Express platform
- **MongoDB 7+** via Mongoose 9
- **JWT** (`@nestjs/jwt` + `passport-jwt`) — 7-day tokens
- **bcrypt** for password hashing (10 rounds)
- **Multer** for file uploads (10MB limit, whitelisted extensions)
- **Swagger** at `/api/docs`

### Module Structure
```
src/
├── auth/          JWT signup/login/me, bcrypt, JwtStrategy, JwtAuthGuard
├── models/        Serves models.json with type/provider/search/pagination filtering
├── chat/          Session management, message storage, Kimi API / mock fallback
├── upload/        Multer file handler → ./uploads/ (jpg/png/pdf/txt/docx/csv)
├── forms/         Contact + feedback POST endpoints
└── dashboard/     Protected stats + activity endpoints
```

### API Endpoints
| Method | Path | Auth | Description |
|---|---|---|---|
| POST | /api/auth/signup | No | Register new user |
| POST | /api/auth/login | No | Login, returns JWT |
| GET | /api/auth/me | JWT | Get current user |
| GET | /api/models | No | List models (filter: type, provider, search) |
| GET | /api/models/:id | No | Single model |
| GET | /api/models/providers | No | Unique providers list |
| POST | /api/chat/send | Optional | Send message (guest or auth) |
| GET | /api/chat/history | JWT | User's chat sessions |
| GET | /api/chat/session/:id | No | Get session messages |
| DELETE | /api/chat/session/:id | JWT | Delete session |
| POST | /api/upload | No | Upload file |
| POST | /api/forms/contact | No | Contact form |
| POST | /api/forms/feedback | No | Feedback form |
| GET | /api/dashboard/stats | JWT | Usage statistics |
| GET | /api/dashboard/activity | JWT | Recent activity |

### AI Provider
- **Primary**: Kimi API (`moonshot-v1-8k`) — set `KIMI_API_KEY` in `.env`
- **Fallback**: Mock response (used automatically when no API key)

### Chat Session Schema
```
ChatSession {
  sessionId: string (UUID)
  userId?: string       // null for guests
  modelId: string
  title?: string        // first 60 chars of first message
  messages: [{role, content, timestamp}]
  isGuest: boolean
  expiresAt?: Date      // guests only: now + 3h
}
```

## Environment Variables

### Frontend (`frontend/.env.local`)
```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### Backend (`backend/.env`)
```
PORT=3001
MONGODB_URI=mongodb://localhost:27017/nexusai
JWT_SECRET=your-super-secret-jwt-key-change-in-production
KIMI_API_KEY=        # optional — leave blank for mock mode
```

## Running the Platform

```bash
# Terminal 1 — Backend
cd backend
npm run start:dev       # http://localhost:3001/api
                        # Swagger: http://localhost:3001/api/docs

# Terminal 2 — Frontend
cd frontend
npm run dev             # http://localhost:3000
```

MongoDB must be running locally (`mongod`) or set `MONGODB_URI` to a remote URI.
