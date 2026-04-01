# Architecture Plan Draft

## Frontend
- Next.js App Router
- MUI theme, responsive, light mode
- Components: Navbar, Sidebar (models), ChatPane, RightPanel, MarketplaceGrid
- Utilities: AuthContext, ModelContext, ChatContext, GuestSessionCache
- APIs: `/api/chat`, `/api/models`, `/api/marketplace`, `/api/auth`

## Backend
- NestJS modules: Auth, Chat, Marketplace, Upload, AIProvider
- Schema: User, GuestSession, ChatMessage, ModelUsage
- Services: JWTService, RefreshService, KimiProviderService, TokenService

## Data flow
- UI model select -> **/api/models/active** -> client context
- chat send -> **/api/chat/send** -> ChatService -> AI provider -> persist
- guest session -> localStorage+3hr expiry -> API fallback
