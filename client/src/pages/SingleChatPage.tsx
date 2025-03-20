import { useContext, useEffect } from "react";
import { useParams } from "react-router";

import SingleChat from "../components/SingleChat";
import "../styles/SingleChat.css";
import SendMessageChat from "../components/SendMessageChat";
import { ChatsContext } from "../context/ChatsContext";

function SingleChatPage() {
  const { chatId } = useParams<string>();

  const { messages, getChatById } = useContext(ChatsContext);

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
