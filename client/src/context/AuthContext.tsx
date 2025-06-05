import { toast } from "react-toastify";

type AuthContextProviderProps = {
  children: ReactNode;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  // favListings: FavType[] | null;
  // getFavourites: () => void;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;

  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkUserStatus: () => void;
  loginAsGuest: () => void;
};

const contextInitialValue: AuthContextType = {
  user: null,
  isAuthenticated: false,
  // favListings: null,
  register: () => {
    throw Error("context not initialised");
  },
  login: () => {
    throw Error("context not initialised");
  },
  logout: () => {
    throw Error("context not initialised");
  },
  loginAsGuest: () => {
    throw Error("context not initialised");
  },
  checkUserStatus: async () => {},

  // getFavourites: () => {
  //   throw Error("context not initialised");
  // },
};

import { createContext, ReactNode, useEffect, useState } from "react";
import {
  GetProfileOkResponse,
  LoginOkResponse,
  RegisterOkResponse,
  User,
} from "../types/customTypes";
import { baseUrl } from "../utils/baseUrl";
import { useNavigate } from "react-router";

export const AuthContext = createContext<AuthContextType>(contextInitialValue);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  // const [favListings, setFavListings] = useState<FavType[] | null>(null);

  const token = localStorage.getItem("token");
  const goToHome = useNavigate();
  const goToLogin = useNavigate();

  const loginAsGuest = () => {
    const guestUser: User = {
      _id: "guest",
      username: "Guest",
      email: "guest@example.com",
      image: "https://cdn-icons-png.flaticon.com/512/4123/4123763.png",
      listings: [],
      favourites: [],
    };

    setUser(guestUser);
    setIsAuthenticated(true);

    toast.success("Logged in as Guest!", {
      position: "top-right",
      autoClose: 3000,
    });

    goToHome("/");
  };

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
        `${baseUrl}/api/users/register`,
        requestOptions
      );
      if (!response.ok) {
        console.log("Error while trying to register new user");
        //REVIEW all the toast logic could be moved to a toast's controllers file, and create a function that receives the position, the autoclose time, and even the message, to be reused and also reduce the code in this file.
        toast.error("Registration failed, email already in use. Try again.", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }

      if (response.ok) {
        const result = (await response.json()) as RegisterOkResponse;
        console.log(result.message);
        toast.success(
          "Registration successful! You'll be redirected in 3 seconds.",
          {
            position: "top-right",
            autoClose: 3000,
          }
        );
        setTimeout(() => {
          goToLogin("/login");
        }, 3000);
        return;
      }
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
        `${baseUrl}/api/users/login`,
        requestOptions
      );
      if (!response.ok) {
        console.log("Error while trying to login");
        toast.error("Login failed. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });

        return;
      }

      if (response.ok) {
        const result = (await response.json()) as LoginOkResponse;
        console.log(result);

        if (!result.token) {
          console.log("Login failed: no token received");
          setIsAuthenticated(false);
          return;
        }

        if (result.token) {
          // store token in the local storage
          localStorage.setItem("token", result.token);
          setUser(result.user);
          setIsAuthenticated(true);
          checkUserStatus();

          toast.success(
            "Login successful! You'll be redirected in 3 seconds.",
            {
              position: "top-right",
              autoClose: 3000,
            }
          );

          setTimeout(() => {
            goToHome("/");
          }, 3000);
          return;
        }
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    goToHome("/");
    console.log("user logged out successfully");
    //REVIEW no toast when user logout?
  };

  const checkUserStatus = async () => {
    console.log("check user status function");
    if (token) {
      setIsAuthenticated(true); //  ensures that user stays logged in after refresh

      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };

      try {
        const response = await fetch(
          `${baseUrl}/api/users/profile`,
          requestOptions
        );
        if (!response.ok) {
          console.log("Log in again, redirect user to login page");
          return;
        }

        if (response.ok) {
          const result = (await response.json()) as GetProfileOkResponse;
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
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,

        register,
        login,
        logout,
        checkUserStatus,
        loginAsGuest,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
