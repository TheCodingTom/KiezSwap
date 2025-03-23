import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import SingleChat from "../components/SingleChat";
import "../styles/SingleChat.css";
import SendMessageChat from "../components/SendMessageChat";
import { ChatsContext } from "../context/ChatsContext";
import { AuthContext } from "../context/AuthContext";

function SingleChatPage() {
  const { chatId } = useParams<string>();
  const { messages, getChatById } = useContext(ChatsContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getChatById();
  }, []);

  return (
    <div>
      <h1>Single chat page</h1>

      <div className="chat-container">
        {messages &&
          messages.map((message) => {
            const isUserMessage = message.sender._id === user?._id; // Check if message is from the logged in user
            return (
              <SingleChat
                text={message.text}
                sender={message.sender}
                isUserMessage={isUserMessage}
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
