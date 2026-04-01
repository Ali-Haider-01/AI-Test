# Backend CLAUDE Instructions

## Setup

```bash
cd backend
npm install
cp .env.example .env     # then fill in values
npm run start:dev        # http://localhost:3001/api
```

## Environment Variables

Create `backend/.env`:
```
PORT=3001
MONGODB_URI=mongodb://localhost:27017/nexusai
JWT_SECRET=your-super-secret-jwt-key-change-in-production
KIMI_API_KEY=            # optional — leave blank for mock AI mode
```

MongoDB must be running. Quick start: `mongod --dbpath /data/db`

## Run Commands

| Command | Description |
|---|---|
| `npm run start:dev` | Dev server with hot-reload (port 3001) |
| `npm run start:prod` | Production server |
| `npm run build` | Compile TypeScript to dist/ |
| `npm run test` | Run Jest unit tests |
| `npm run lint` | ESLint fix |

## API Base URL

All endpoints are prefixed with `/api` (set in `main.ts`).
Swagger UI: `http://localhost:3001/api/docs`

## Module Structure

```
src/
├── main.ts               # Bootstrap: CORS, ValidationPipe, Swagger, port 3001
├── app.module.ts         # Root module: imports all feature modules
├── auth/
│   ├── schemas/user.schema.ts      # Mongoose User model
│   ├── dto/signup.dto.ts           # Validated signup payload
│   ├── dto/login.dto.ts            # Validated login payload
│   ├── strategies/jwt.strategy.ts  # Passport JWT (reads Bearer token)
│   ├── guards/jwt-auth.guard.ts    # @UseGuards(JwtAuthGuard)
│   ├── auth.service.ts             # bcrypt hash, JWT sign
│   ├── auth.controller.ts          # POST /signup, POST /login, GET /me
│   └── auth.module.ts
├── models/
│   ├── data/models.json            # 30 AI model definitions (source of truth)
│   ├── models.service.ts           # Filter/search/paginate models
│   ├── models.controller.ts        # GET /models, GET /models/:id
│   └── models.module.ts
├── chat/
│   ├── schemas/chat-session.schema.ts  # MongoDB session + messages
│   ├── dto/send-message.dto.ts
│   ├── chat.service.ts             # Session logic, AI provider call
│   ├── chat.controller.ts          # POST /send, GET /history, etc.
│   └── chat.module.ts
├── upload/
│   ├── upload.controller.ts        # POST /upload (Multer, 10MB, whitelist)
│   └── upload.module.ts
├── forms/
│   ├── dto/contact.dto.ts
│   ├── dto/feedback.dto.ts
│   ├── forms.controller.ts         # POST /contact, POST /feedback
│   └── forms.module.ts
└── dashboard/
    ├── dashboard.controller.ts     # GET /stats, GET /activity (JWT protected)
    └── dashboard.module.ts
```

## Auth

- **JWT secret**: from `JWT_SECRET` env var (fallback: `nexusai-secret-key`)
- **Token expiry**: 7 days
- **Password hashing**: bcrypt, 10 rounds
- **Guard**: `@UseGuards(JwtAuthGuard)` on any protected endpoint
- **Token format**: `Authorization: Bearer <token>`

## How Guest Sessions Work

- Guest chat requests include `{ isGuest: true, sessionId: "<uuid>" }`
- Backend creates a `ChatSession` with `isGuest: true` and `expiresAt = now + 3h`
- Guest sessions are NOT linked to any user
- On user login (frontend), the client stores `nexusai_token` — subsequent requests include JWT
- Guest-to-user session migration: optionally call update on sessions where `sessionId` matches

## AI Provider Integration

In `chat.service.ts`, `callAI()`:

1. If `KIMI_API_KEY` is set: POST to `https://api.moonshot.cn/v1/chat/completions`
   - Model: `moonshot-v1-8k`
   - Uses native `fetch` (Node 18+)
2. If no key (or request fails): returns `mockResponse()` — a formatted demo string

To add a new provider, modify `callAI()` to route by `modelId` prefix.

## Adding More Models

Edit `src/models/data/models.json`. Each model needs:
```json
{
  "id": "unique-id",
  "name": "Display Name",
  "lab": "Provider Name",
  "org": "Provider Name",
  "desc": "Short description",
  "tags": ["Tag1", "Tag2"],
  "badge": "hot|new|",
  "rating": 4.5,
  "reviews": 1000,
  "price": "$X/1M tk",
  "price_start": 0,
  "types": ["language", "vision", "code", "image", "audio"],
  "context": "128K tokens"
}
```

No restart needed if using `start:dev` (hot-reload picks up JSON changes).

## Key Conventions

- Use `@UseGuards(JwtAuthGuard)` + `@ApiBearerAuth()` on protected endpoints
- DTOs use `class-validator` decorators (`@IsString`, `@IsEmail`, etc.)
- All modules register their Mongoose schemas via `MongooseModule.forFeature`
- `ConfigModule` is global — use `@Inject(ConfigService)` anywhere
- Port is always 3001 (frontend dev is 3000)
