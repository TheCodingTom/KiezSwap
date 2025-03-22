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
        toast.error("Registration failed. Please try again.", {
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
    console.log("user logged out successfully");
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

  // const getFavourites = async () => {
  //   const myHeaders = new Headers();
  //   myHeaders.append("Authorization", `Bearer ${token}`);

  //   const requestOptions = {
  //     method: "GET",
  //     headers: myHeaders,
  //   };

  //   try {
  //     const response = await fetch(
  //       `${baseUrl}/api/users/profile/favourites`,
  //       requestOptions
  //     );

  //     if (response.ok) {
  //       const result = await response.json();
  //       console.log(result);
  //       setFavListings(result.favourites);
  //     } else {
  //       console.log("Failed to fetch favourites");
  //     }
  //   } catch (error) {
  //     console.log("Error while fetching favourites: ", error);
  //   }
  // };

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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
