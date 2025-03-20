import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ChatType } from "../types/customTypes";
import { baseUrl } from "../utils/baseUrl";
import { AuthContext } from "./AuthContext";

type ChatsContextProviderProps = {
  children: ReactNode;
};

type ChatsContextType = {
  chats: ChatType[] | null;
  getChats: () => void;
};

const initialValue: ChatsContextType = {
  chats: null,
  getChats: () => {
    throw new Error("Context not initialised");
  },
};

export const ChatsContext = createContext(initialValue);

export const ChatsContextProvider = ({
  children,
}: ChatsContextProviderProps) => {
  const { user } = useContext(AuthContext);
  const [chats, setChats] = useState<ChatType[] | null>(null);

  const getChats = async () => {
    if (!user) return;

    const requestOptions = {
      method: "GET",
    };

    try {
      const response = await fetch(
        `${baseUrl}/api/chats/userChats/?sellerId=${user._id}&buyerId=${user._id}`,
        requestOptions
      );

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setChats(result.userChats);
      } else {
        console.log("Failed to fetch chats");
      }
    } catch (error) {
      console.log("Error fetching chats: ", error);
    }
  };

  useEffect(() => {
    getChats();
  }, [user]);

  return (
    <ChatsContext.Provider value={{ chats, getChats }}>
      {children}
    </ChatsContext.Provider>
  );
};
