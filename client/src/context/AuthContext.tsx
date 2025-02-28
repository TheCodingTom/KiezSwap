//3. define provider props type

type AuthContextProviderProps = {
    children: ReactNode;
  };
  
  //5. define context type
  
  type AuthContextType = {
    user: UserRegisterFormType | null;
    register: (email: string, password: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
  };
  
  //6. create variable with context initial value
  
  const contextInitialValue: AuthContextType = {
    user: null,
    login: () => {
      throw Error("context not initialised");
    },
    logout: () => {
      throw Error("context not initialised");
    },
    register: () => {
      throw Error("context not initialised");
    },
  };
  
  //1. create and export the context
  
  import { createContext, ReactNode, useEffect, useState } from "react";
import { RegisterOkResponse, UserRegisterFormType, UserType } from "../types/customTypes";

  
  export const AuthContext = createContext<AuthContextType>(contextInitialValue);
  
  //2. create and export the provider: a component that contains states, functions, etc., that I want to share
  
  export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    //4. create in (or move to) the provider all states/functions you wanna share
  
    const [newUser, setNewUser] = useState<UserRegisterFormType | null>(null);

    const [user, setUser] = useState<UserType | null>(null)
  
     const handleRegisterSubmit = async (
       e: React.MouseEvent<HTMLButtonElement, MouseEvent>
     ) => {
       e.preventDefault();
       console.log(newUser);
   
       const myHeaders = new Headers();
       myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
   
       const urlencoded = new URLSearchParams();
       // Input validation here - username,password,email
       if (newUser) {
         urlencoded.append("username", newUser.username);
         urlencoded.append("email", newUser.email);
         urlencoded.append("password", newUser.password);
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
         const result = await response.json() as RegisterOkResponse
         console.log(result.message);
         setUser(result.user)
         
   
       } catch (error) {
         console.log("error :>> ", error);
       }
     };
  
   
  
    // useEffect(() => {
    //   
    // }, []);

     //7. include elements you wanna share in provider property value
  
    return (
      <div>
        <AuthContext.Provider value={{user }}>
          {children}
        </AuthContext.Provider>
      </div>
    );
  };