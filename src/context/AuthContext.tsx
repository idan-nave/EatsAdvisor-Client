import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '@types';
import api from '@api';


interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: () => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Helper function to check if jwt_present cookie exists
  const hasJwtCookie = (): boolean => {
    return document.cookie.split(';').some(cookie => cookie.trim().startsWith('jwt_present='));
  };

  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      try {
        console.log('[AuthProvider] Fetching user data from /auth/me');
        console.log('[AuthProvider] document.cookie:', document.cookie);

        // Check for jwt_present cookie
        const jwtPresent = hasJwtCookie();
        console.log('[AuthProvider] JWT Cookie present:', jwtPresent);

        if (!jwtPresent) {
          console.log('[AuthProvider] No JWT cookie found, user not authenticated');
          setUser(null);
          setLoading(false);
          return;
        }

        const response = await api.get('/auth/me', { withCredentials: true });
        console.log('[AuthProvider] Response:', response.status, response.data);

        if (response.status === 200 && isMounted) {
          console.log('[AuthProvider] User authenticated:', response.data);
          setUser(response.data);
        } else if (isMounted) {
          console.log('[AuthProvider] User not authenticated, setting null');
          setUser(null);
        }
      } catch (error) {
        console.error('[AuthProvider] Auth fetch failed:', error);
        if (isMounted) {
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchUser();

    // Listen for storage events for cross-tab auth sync
    const handleStorageChange = () => {
      console.log('[AuthProvider] Storage event detected, refetching user');
      fetchUser();
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      isMounted = false;
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const login = () => {
    console.log('[AuthProvider] Redirecting to Google OAuth login');
    window.location.href = `${api.defaults.baseURL}/oauth2/authorization/google`;
  };

  const logout = async () => {
    console.log('[AuthProvider] Logging out');
    try {
      await api.get('/auth/logout', { withCredentials: true });
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('[AuthProvider] Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};