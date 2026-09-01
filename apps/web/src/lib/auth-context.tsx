'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { api, setTokens, clearTokens, getTokens } from './api-client';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  roles?: string[];
  phone?: string;
  avatarUrl?: string;
}

interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: { email: string; password: string; firstName: string; lastName: string; phone?: string }) => Promise<{ success: boolean; error?: string }>;
  forgotPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  resetPassword: (token: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    const { accessToken } = getTokens();
    if (!accessToken) { setUser(null); setLoading(false); return; }
    const res = await api<{ user: User }>('/v1/auth/me');
    if (res.success && res.data?.user) {
      setUser(res.data.user);
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => { void refreshUser(); }, [refreshUser]);

  const login = async (email: string, password: string) => {
    const res = await api<AuthResponse>('/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (res.success && res.data) {
      setTokens(res.data.accessToken, res.data.refreshToken);
      setUser(res.data.user);
      return { success: true };
    }
    return { success: false, error: res.error?.message || 'Login failed' };
  };

  const register = async (data: { email: string; password: string; firstName: string; lastName: string; phone?: string }) => {
    const res = await api<AuthResponse>('/v1/auth/register', {
      method: 'POST',
      body: JSON.stringify({ ...data, acceptTerms: true }),
    });
    if (res.success && res.data) {
      setTokens(res.data.accessToken, res.data.refreshToken);
      setUser(res.data.user);
      return { success: true };
    }
    return { success: false, error: res.error?.message || 'Registration failed' };
  };

  const forgotPassword = async (email: string) => {
    const res = await api('/v1/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
    return res.success
      ? { success: true }
      : { success: false, error: res.error?.message || 'Request failed' };
  };

  const resetPassword = async (token: string, password: string) => {
    const res = await api('/v1/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, password }),
    });
    return res.success
      ? { success: true }
      : { success: false, error: res.error?.message || 'Password reset failed' };
  };

  const logout = async () => {
    const { accessToken } = getTokens();
    if (accessToken) {
      // Best-effort server-side revocation; always clear locally.
      await api('/v1/auth/logout', { method: 'POST' }).catch(() => undefined);
    }
    clearTokens();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, forgotPassword, resetPassword, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
