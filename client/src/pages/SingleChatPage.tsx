import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { MessageType } from "./Messages";
import SingleChat from "../components/SingleChat";

function SingleChatPage() {
  const { chatId } = useParams<string>();

  const [messages, setMessages] = useState<MessageType[] | null>(null);
  const getChatById = async () => {
    try {
      const requestOptions = {
        method: "GET",
      };
      const response = await fetch(
        `http://localhost:4000/api/chats/userChats/${chatId}`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Something went wrong fetching the single chat");
      }

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setMessages(result.chat.messages);
      }
      console.log(messages);
    } catch (error) {
      console.log("error fetching the single chat :>> ", error);
    }
  };

  useEffect(() => {
    getChatById();
  }, []);

  return (
    <div>
      <h1>Single chat page</h1>
      {messages &&
        messages.map((message) => {
          return (
            <SingleChat
              text={message.text}
              senderId={message.senderId}
              key={message._id}
            />
          );
        })}
    </div>
  );
}

export default SingleChatPage;
