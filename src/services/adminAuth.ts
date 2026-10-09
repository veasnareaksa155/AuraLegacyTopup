/**
 * Aura Legacy Top-Up Admin Authentication Service
 */

const ADMIN_STORAGE_KEY = 'aura_admin_session';
const ADMIN_CREDENTIALS_KEY = 'aura_admin_credentials';

export interface AdminUser {
  username: string;
  role: 'super_admin';
  loggedInAt: string;
}

const DEFAULT_ADMIN = {
  username: 'admin',
  password: 'aura2026', // Default master password
};

export function getStoredCredentials() {
  try {
    const saved = localStorage.getItem(ADMIN_CREDENTIALS_KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    // fallback
  }
  return DEFAULT_ADMIN;
}

export function saveNewPassword(newPassword: string): boolean {
  try {
    const creds = getStoredCredentials();
    creds.password = newPassword;
    localStorage.setItem(ADMIN_CREDENTIALS_KEY, JSON.stringify(creds));
    return true;
  } catch {
    return false;
  }
}

export function loginAdmin(usernameInput: string, passwordInput: string): { success: boolean; error?: string; user?: AdminUser } {
  const creds = getStoredCredentials();
  const trimmedUser = usernameInput.trim().toLowerCase();
  const trimmedPass = passwordInput.trim();

  if (
    (trimmedUser === creds.username.toLowerCase() || trimmedUser === 'aura') &&
    trimmedPass === creds.password
  ) {
    const user: AdminUser = {
      username: creds.username,
      role: 'super_admin',
      loggedInAt: new Date().toISOString(),
    };
    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(user));
    return { success: true, user };
  }

  return { success: false, error: 'ឈ្មោះគណនី ឬពាក្យសម្ងាត់មិនត្រឹមត្រូវទេ (Invalid credentials)!' };
}

export function checkAdminSession(): AdminUser | null {
  try {
    const session = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (!session) return null;
    return JSON.parse(session) as AdminUser;
  } catch {
    return null;
  }
}

export function logoutAdmin(): void {
  localStorage.removeItem(ADMIN_STORAGE_KEY);
}
