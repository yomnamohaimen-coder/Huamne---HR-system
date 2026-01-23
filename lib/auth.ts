/**
 * Mock authentication utilities for Phase 0
 * TODO: Replace with real auth provider (NextAuth, etc.) in future phases
 */

export type Role = "employee" | "manager" | "hr" | "finance";

export interface Session {
  email: string;
  role: Role;
}

// Allowed demo users (emails normalized to lowercase in functions)
const ALLOWED_USERS: Record<string, Role> = {
  "yomna.employee@mail.com": "employee",
  "manager@mail.com": "manager",
  "ahmed.hr@mail.com": "hr",
  "ali.finance@mail.com": "finance", // Normalized from "Ali.finance@mail.com"
};

// Shared password for all demo users
const DEMO_PASSWORD = "1234";

// localStorage key for session
const SESSION_STORAGE_KEY = "humane_session";

// Cookie names for middleware (Phase 0: non-httpOnly, will be replaced with httpOnly session cookies later)
const COOKIE_EMAIL = "humane_email";
const COOKIE_ROLE = "humane_role";

/**
 * Get the role for a given email
 */
export function roleFromEmail(email: string): Role | null {
  const normalizedEmail = email.toLowerCase().trim();
  return ALLOWED_USERS[normalizedEmail] || null;
}

/**
 * Check if email and password are valid
 */
export function isAllowedUser(email: string, password: string): boolean {
  const normalizedEmail = email.toLowerCase().trim();
  return (
    normalizedEmail in ALLOWED_USERS && password === DEMO_PASSWORD
  );
}

/**
 * Get session from localStorage
 */
export function getSession(): Session | null {
  if (typeof window === "undefined") return null;
  
  try {
    const stored = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!stored) return null;
    
    const session = JSON.parse(stored) as Session;
    // Validate session structure
    if (session.email && session.role) {
      return session;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Set session in localStorage and cookies
 */
export function setSession(session: Session): void {
  if (typeof window === "undefined") return;
  
  // Store in localStorage
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  
  // Set cookies for middleware (Phase 0: non-httpOnly, will be replaced with httpOnly session cookies later)
  document.cookie = `${COOKIE_EMAIL}=${session.email}; path=/; max-age=86400`; // 24 hours
  document.cookie = `${COOKIE_ROLE}=${session.role}; path=/; max-age=86400`;
}

/**
 * Clear session from localStorage and cookies
 */
export function clearSession(): void {
  if (typeof window === "undefined") return;
  
  localStorage.removeItem(SESSION_STORAGE_KEY);
  
  // Clear cookies
  document.cookie = `${COOKIE_EMAIL}=; path=/; max-age=0`;
  document.cookie = `${COOKIE_ROLE}=; path=/; max-age=0`;
}

/**
 * Get session from cookies (for middleware/server-side)
 */
export function getSessionFromCookies(cookies: {
  get: (name: string) => { value: string } | undefined;
}): Session | null {
  const emailCookie = cookies.get(COOKIE_EMAIL);
  const roleCookie = cookies.get(COOKIE_ROLE);
  
  if (!emailCookie || !roleCookie) return null;
  
  const role = roleCookie.value as Role;
  if (!["employee", "manager", "hr", "finance"].includes(role)) {
    return null;
  }
  
  return {
    email: emailCookie.value,
    role,
  };
}

/**
 * Get dashboard route for a role
 */
export function getDashboardRoute(role: Role): string {
  return `/${role}/dashboard`;
}

/**
 * Get all demo user emails (for suggestions)
 */
export function getDemoUserEmails(): string[] {
  return Object.keys(ALLOWED_USERS);
}
