import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

// Demo auth: a signed-in user by default so the app is usable without a backend.
export function AuthProvider({ children }) {
  const [user, setUser] = useState({ name: 'Demo User', role: 'Compliance Manager' });
  const value = useMemo(
    () => ({
      user,
      login: () => setUser({ name: 'Demo User', role: 'Compliance Manager' }),
      logout: () => setUser(null),
    }),
    [user],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
