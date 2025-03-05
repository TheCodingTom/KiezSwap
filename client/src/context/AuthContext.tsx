type AuthContextProviderProps = {
  children: ReactNode;
};

type AuthContextType = {
  user: User | null;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;

  login: (email: string, password: string) => Promise<void>;
  logout:() => void
};


const contextInitialValue: AuthContextType = {
  user: null,
  register: () => {
    throw Error("context not initialised");
  },
  login: () => {
    throw Error("context not initialised");
  },
  logout: () => {
    throw Error("context not initialised");
  },
};


import { createContext, ReactNode, useEffect, useState } from "react";
import { LoginOkResponse, RegisterOkResponse, User } from "../types/customTypes";


export const AuthContext = createContext<AuthContextType>(contextInitialValue);


export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {

  const [user, setUser] = useState<User | null>(null);
 

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
      alert(result.message)
      console.log(result);
      setUser(result.user);

      if (!result.token) {
        // do something if token is not there
      }

      if (result.token) {
        // store token in the local storage
        localStorage.setItem("token", result.token)
      }
      
      
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
    console.log("user logged out successfully");
  }


  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      console.log("user is logged in");
    }
    else {
      console.log("user is logged out");
    }
  }, [])
  

  return (
    <div>
      <AuthContext.Provider
        value={{
          user,
          register,
          login,
          logout
        }}
      >
        {children}
      </AuthContext.Provider>
    </div>
  );
};
