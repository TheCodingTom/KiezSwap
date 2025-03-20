import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";

import SingleChat from "../components/SingleChat";
import "../styles/SingleChat.css";
import SendMessageChat from "../components/SendMessageChat";
import { baseUrl } from "../utils/baseUrl";
import { MessageType } from "../types/customTypes";
import { ChatsContext } from "../context/ChatsContext";

function SingleChatPage() {
  const { chatId } = useParams<string>();

  const { messages, getChatById } = useContext(ChatsContext);

  // const [sender, setSender] = useState<SenderType | null>(null);
  // const [messages, setMessages] = useState<MessageType[] | null>(null);

  // const getChatById = async () => {
  //   try {
  //     const requestOptions = {
  //       method: "GET",
  //     };
  //     const response = await fetch(
  //       `${baseUrl}/api/chats/userChats/${chatId}`,
  //       requestOptions
  //     );

  //     if (!response.ok) {
  //       throw new Error("Something went wrong fetching the single chat");
  //     }

  //     if (response.ok) {
  //       const result = await response.json();
  //       console.log(result);
  //       setMessages(result.chat.messages);
  //     }
  //   } catch (error) {
  //     console.log("error fetching the single chat :>> ", error);
  //   }
  // };

  useEffect(() => {
    getChatById();
  }, []);

  return (
    <div>
      <h1>Single chat page</h1>

      <div className="chat-container">
        {messages &&
          messages.map((message) => {
            return (
              <SingleChat
                text={message.text}
                sender={message.sender}
                key={message._id}
              />
            );
          })}
      </div>
      <SendMessageChat chatId={chatId} />
    </div>
  );
}

export default SingleChatPage;
