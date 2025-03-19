type AuthContextProviderProps = {
  children: ReactNode;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;

  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkUserStatus: () => void;
};

const contextInitialValue: AuthContextType = {
  user: null,
  isAuthenticated: false,
  register: () => {
    throw Error("context not initialised");
  },
  login: () => {
    throw Error("context not initialised");
  },
  logout: () => {
    throw Error("context not initialised");
  },
  checkUserStatus: async () => {},
};

import { createContext, ReactNode, useEffect, useState } from "react";
import {
  LoginOkResponse,
  RegisterOkResponse,
  User,
} from "../types/customTypes";

export const AuthContext = createContext<AuthContextType>(contextInitialValue);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const token = localStorage.getItem("token");

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();

    if (username && email && password) {
      urlencoded.append("username", username);
      urlencoded.append("email", email);
      urlencoded.append("password", password);
    } else {
      console.log("All the fields are required");
    }
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };

    try {
      const response = await fetch(
        "http://localhost:4000/api/users/register",
        requestOptions
      );
      const result = (await response.json()) as RegisterOkResponse;
      console.log(result.message);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const login = async (email: string, password: string) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();

    if (email && password) {
      urlencoded.append("email", email);
      urlencoded.append("password", password);
    } else {
      console.log("All the fields are required");
    }
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };

    try {
      const response = await fetch(
        "http://localhost:4000/api/users/login",
        requestOptions
      );
      const result = (await response.json()) as LoginOkResponse;
      // alert(result.message);
      console.log(result);

      if (!result.token) {
        // do something if token is not there
      }

      if (result.token) {
        // store token in the local storage
        localStorage.setItem("token", result.token);
        setUser(result.user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    console.log("user logged out successfully");
  };

  const checkUserStatus = async () => {
    console.log("check user status function");
    if (token) {
      setIsAuthenticated(true); //  ensures that user stays logged in after refresh

      // if (!user) {
      // if the user is not set, we fetch data from the backend
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };

      try {
        const response = await fetch(
          "http://localhost:4000/api/users/profile",
          requestOptions
        );
        if (!response.ok) {
          console.log("Log in again, redirect user to login page");
          return;
        }

        if (response.ok) {
          const result = await response.json();
          console.log("result in the check user status):>> ", result);
          setUser(result);
        }
      } catch (error) {
        console.log("error :>> ", error);
      }
      // }
    } else {
      // if no token, the user is logged out
      setIsAuthenticated(false);
    }
  };

  // check if the user is logged in when the app loads
  useEffect(() => {
    checkUserStatus();
  }, []);

  return (
    <div>
      <AuthContext.Provider
        value={{
          user,
          isAuthenticated,
          register,
          login,
          logout,
          checkUserStatus,
        }}
      >
        {children}
      </AuthContext.Provider>
    </div>
  );
};
