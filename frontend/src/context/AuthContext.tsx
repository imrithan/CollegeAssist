import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, StudentProfile } from '../types';
import { apiUrl } from '../config/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  profile: StudentProfile | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<{ success: boolean; error?: string }>;
  signup: (fullName: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfileState: (newProfile: StudentProfile) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('ca_user');
    return saved ? JSON.parse(saved) : { id: 1, full_name: 'Rithan V', email: 'rithan@example.com' };
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('ca_token') || 'demo-jwt-token';
  });

  const [profile, setProfile] = useState<StudentProfile | null>(() => {
    const saved = localStorage.getItem('ca_profile');
    return saved
      ? JSON.parse(saved)
      : {
          name: 'Rithan V',
          dob: '2006-05-12',
          class_12_stream: 'Computer Science',
          preferred_location: 'Tamil Nadu',
          interests: ['Computer Science', 'Artificial Intelligence'],
          preferred_degree: 'B.Tech',
          academic_score: 92
        };
  });

  useEffect(() => {
    // Optionally fetch active profile on boot
    fetch(apiUrl('/api/profile'), {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.name) {
          setProfile(data);
          localStorage.setItem('ca_profile', JSON.stringify(data));
        }
      })
      .catch(() => {
        // Fallback silently
      });
  }, [token]);

  const login = async (email: string, password: string, rememberMe = false) => {
    try {
      const res = await fetch(apiUrl('/api/auth/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, remember_me: rememberMe })
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Login failed' };
      }

      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('ca_user', JSON.stringify(data.user));
      localStorage.setItem('ca_token', data.token);

      return { success: true };
    } catch (err) {
      return { success: false, error: 'Could not connect to server. Please try again.' };
    }
  };

  const signup = async (fullName: string, email: string, password: string) => {
    try {
      const res = await fetch(apiUrl('/api/auth/signup'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name: fullName, email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Signup failed' };
      }

      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('ca_user', JSON.stringify(data.user));
      localStorage.setItem('ca_token', data.token);

      return { success: true };
    } catch (err) {
      return { success: false, error: 'Could not connect to server. Please try again.' };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('ca_user');
    localStorage.removeItem('ca_token');
  };

  const updateProfileState = (newProfile: StudentProfile) => {
    setProfile(newProfile);
    localStorage.setItem('ca_profile', JSON.stringify(newProfile));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        profile,
        isAuthenticated: !!token && !!user,
        login,
        signup,
        logout,
        updateProfileState
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
