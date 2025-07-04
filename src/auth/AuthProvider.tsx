import React, { createContext, useContext, useEffect, useState } from 'react';
import keycloak, { initKeycloak, getToken, isLoggedIn, doLogin, doLogout, updateToken } from './keycloak';

interface AuthContextProps {
  isAuthenticated: boolean;
  token: string | undefined;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Always initialize Keycloak and let it handle the flow
    initKeycloak(() => {
      setIsAuthenticated(isLoggedIn());
      setToken(getToken());
    });
    // Optionally, set up token refresh interval
    const interval = setInterval(() => {
      updateToken(() => setToken(getToken()));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Custom logout to also clear state and redirect to Keycloak login page
  const logout = () => {
    setIsAuthenticated(false);
    setToken(undefined);
    // End session and redirect to Keycloak login page
    keycloak.logout({
      redirectUri: window.location.origin,
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login: doLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
