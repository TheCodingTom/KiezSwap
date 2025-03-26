import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ChatType, MessageType } from "../types/customTypes";
import { baseUrl } from "../utils/baseUrl";
import { AuthContext } from "./AuthContext";

type ChatsContextProviderProps = {
  children: ReactNode;
};

type ChatsContextType = {
  chats: ChatType[] | null;
  messages: MessageType[] | null;
  getChats: () => void;
  getChatById: () => void;
};

const initialValue: ChatsContextType = {
  chats: null,
  messages: null,
  getChats: () => {
    throw new Error("Context not initialised");
  },
  getChatById: () => {
    throw new Error("Context not initialised");
  },
};

export const ChatsContext = createContext(initialValue);

export const ChatsContextProvider = ({
  children,
}: ChatsContextProviderProps) => {
  const { user } = useContext(AuthContext);
  const [chats, setChats] = useState<ChatType[] | null>(null);

  const [messages, setMessages] = useState<MessageType[] | null>(null);

  const getChats = async () => {
    if (!user) return;

    const requestOptions = {
      method: "GET",
    };

    try {
      const response = await fetch(
        `${baseUrl}/api/chats/userChats/?seller=${user._id}&buyer=${user._id}`,
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

  const getChatById = async () => {
    try {
      // split() turns a string into an array splitting at each "/" and pop() removes and returns the last item
      const chatId = window.location.pathname.split("/").pop();

      if (!chatId) {
        console.error("No chatId found in URL");
        return;
      }

      const requestOptions = {
        method: "GET",
      };

      const response = await fetch(
        `${baseUrl}/api/chats/userChats/${chatId}`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Something went wrong fetching the single chat");
      }

      const result = await response.json();

      console.log(result);
      setMessages(result.chat.messages);
    } catch (error) {
      console.log("error fetching the single chat :>> ", error);
    }
  };

  useEffect(() => {
    getChats();

    if (window.location.pathname.startsWith("/messages")) {
      getChatById();
    }
  }, []);

  return (
    <ChatsContext.Provider value={{ chats, messages, getChats, getChatById }}>
      {children}
    </ChatsContext.Provider>
  );
};
