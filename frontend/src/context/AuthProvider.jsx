import { useState } from 'react';

import { AuthContext }
  from './auth.context';

function AuthProvider({
  children
}) {
  const [user, setUser] =
    useState(() => {
      const storedUser =
        localStorage.getItem(
          'shopmind-user'
        );

      return storedUser
        ? JSON.parse(storedUser)
        : null;
    });

  // LOGIN
  const login = (
    email,
    password
  ) => {
    if (
      email ===
        'admin@shopmind.com' &&
      password === '123456'
    ) {
      const adminUser = {
        email,
        role: 'admin'
      };

      setUser(adminUser);

      localStorage.setItem(
        'shopmind-user',
        JSON.stringify(adminUser)
      );

      return true;
    }

    return false;
  };

  // LOGOUT
  const logout = () => {
    setUser(null);

    localStorage.removeItem(
      'shopmind-user'
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;