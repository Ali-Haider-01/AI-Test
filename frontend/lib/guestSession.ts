const STORAGE_KEY = 'nexusai_guest_session';
const SESSION_DURATION = 3 * 60 * 60 * 1000; // 3 hours in ms

interface GuestSession {
  sessionId: string;
  expiry: number;
}

/**
 * Generates a uuid-like string without external dependencies.
 */
function generateSessionId(): string {
  const timestamp = Date.now().toString(36);
  const randomPart = () =>
    Math.random().toString(36).substring(2, 10);
  return `guest_${timestamp}_${randomPart()}${randomPart()}`;
}

/**
 * Creates a new guest session, persists it to localStorage, and returns it.
 */
export function createGuestSession(): GuestSession {
  const sessionId = generateSessionId();
  const expiry = Date.now() + SESSION_DURATION;
  const session: GuestSession = { sessionId, expiry };

  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  }

  return session;
}

/**
 * Returns the stored session if it exists and has not expired, otherwise null.
 */
export function getGuestSession(): GuestSession | null {
  if (typeof window === 'undefined') return null;

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    const session = JSON.parse(raw) as GuestSession;
    if (isSessionExpired(session.expiry)) {
      clearGuestSession();
      return null;
    }
    return session;
  } catch {
    clearGuestSession();
    return null;
  }
}

/**
 * Removes the guest session from localStorage.
 */
export function clearGuestSession(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
}

/**
 * Returns true if the session expiry timestamp is in the past.
 */
export function isSessionExpired(expiry: number): boolean {
  return Date.now() > expiry;
}

/**
 * Returns the number of minutes remaining until the session expires.
 * Returns 0 if already expired.
 */
export function getTimeRemaining(expiry: number): number {
  const remaining = expiry - Date.now();
  if (remaining <= 0) return 0;
  return Math.floor(remaining / (60 * 1000));
}
