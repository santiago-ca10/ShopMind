import {
  useState
} from 'react';

import axios from 'axios';

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

  // LOGIN REAL
  const login = async (
    email,
    password
  ) => {
    try {
      const response =
        await axios.post(
          'http://localhost:3000/api/auth/login',
          {
            email,
            password
          }
        );

      const data =
        response.data;

      // SAVE USER
      setUser(data.usuario);

      localStorage.setItem(
        'shopmind-user',
        JSON.stringify(
          data.usuario
        )
      );

      // SAVE TOKEN
      localStorage.setItem(
        'shopmind-token',
        data.token
      );

      return {
        success: true
      };
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data
            ?.error ||
          'Error login'
      };
    }
  };

  // LOGOUT
  const logout = () => {
    setUser(null);

    localStorage.removeItem(
      'shopmind-user'
    );

    localStorage.removeItem(
      'shopmind-token'
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