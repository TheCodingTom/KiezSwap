//3. define provider props type

type AuthContextProviderProps = {
  children: ReactNode;
};

//5. define context type

type AuthContextType = {
  user: UserType | null;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
};

//6. create variable with context initial value

const contextInitialValue: AuthContextType = {
  user: null,
  register: () => {
    throw Error("context not initialised");
  },
};

//1. create and export the context

import { createContext, ReactNode, useState } from "react";
import { RegisterOkResponse, UserType } from "../types/customTypes";

export const AuthContext = createContext<AuthContextType>(contextInitialValue);

//2. create and export the provider: a component that contains states, functions, etc., that I want to share

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  //4. create in (or move to) the provider all states/functions you wanna share

  const [user, setUser] = useState<UserType | null>(null);

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
      setUser(result.user);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  return (
    <div>
      <AuthContext.Provider
        value={{
          user,
          register,
        }}
      >
        {children}
      </AuthContext.Provider>
    </div>
  );
};
