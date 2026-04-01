import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

// --- Auth Slice ---
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

const initialAuthState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    setAuth(state, action: PayloadAction<{ user: User; token: string }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    // Alias for logout — used in existing components
    clearAuth(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

// --- Chat Slice ---
interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  modelId?: string;
}

interface ChatState {
  activeModelId: string;
  messages: Message[];
  guestSessionId: string | null;
  sessionExpiry: number | null;
  isGuest: boolean;
}

const initialChatState: ChatState = {
  activeModelId: 'gpt5',
  messages: [],
  guestSessionId: null,
  sessionExpiry: null,
  isGuest: true,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState: initialChatState,
  reducers: {
    setActiveModel(state, action: PayloadAction<string>) {
      state.activeModelId = action.payload;
    },
    addMessage(state, action: PayloadAction<Message>) {
      state.messages.push(action.payload);
    },
    setGuestSession(
      state,
      action: PayloadAction<{ sessionId: string; expiry: number }>
    ) {
      state.guestSessionId = action.payload.sessionId;
      state.sessionExpiry = action.payload.expiry;
    },
    clearChat(state) {
      state.messages = [];
    },
  },
});

// --- Models Slice ---
interface AIModel {
  id: string;
  name: string;
  provider: string;
  description?: string;
  tags?: string[];
  pricing?: Record<string, number>;
}

interface ModelsState {
  models: AIModel[];
  loading: boolean;
  error: string | null;
}

const initialModelsState: ModelsState = {
  models: [],
  loading: false,
  error: null,
};

const modelsSlice = createSlice({
  name: 'models',
  initialState: initialModelsState,
  reducers: {
    setModels(state, action: PayloadAction<AIModel[]>) {
      state.models = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

// --- Store ---
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    chat: chatSlice.reducer,
    models: modelsSlice.reducer,
  },
});

// --- Exports ---
export const { setAuth, logout, clearAuth } = authSlice.actions;
export const { setActiveModel, addMessage, setGuestSession, clearChat } =
  chatSlice.actions;
export const { setModels, setLoading } = modelsSlice.actions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
