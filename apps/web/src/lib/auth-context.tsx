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

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: { email: string; password: string; firstName: string; lastName: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
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
    if (res.success && res.data) {
      setUser(res.data.user);
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => { refreshUser(); }, [refreshUser]);

  const login = async (email: string, password: string) => {
    const res = await api<{ accessToken: string; refreshToken: string; user: User }>('/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (res.success && res.data) {
      setTokens(res.data.accessToken, res.data.refreshToken);
      await refreshUser();
      return { success: true };
    }
    return { success: false, error: res.error?.message || 'Login failed' };
  };

  const register = async (data: { email: string; password: string; firstName: string; lastName: string }) => {
    const res = await api<{ accessToken: string; refreshToken: string; user: User }>('/v1/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (res.success && res.data) {
      setTokens(res.data.accessToken, res.data.refreshToken);
      await refreshUser();
      return { success: true };
    }
    return { success: false, error: res.error?.message || 'Registration failed' };
  };

  const logout = () => {
    clearTokens();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
