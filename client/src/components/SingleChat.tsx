import { useContext } from "react";
import "../styles/SingleChat.css";
import { SenderType } from "../types/customTypes";
import { AuthContext } from "../context/AuthContext";

type SingleChatProps = {
  sender: SenderType;
  text: string;
  isUserMessage: boolean;
};

function SingleChat({ sender, text, isUserMessage }: SingleChatProps) {
  const { user } = useContext(AuthContext);

  return (
    <div
      className={`single-message-container ${
        isUserMessage ? "user-message" : "other-message"
      }`}
    >
      {sender._id === user?._id ? (
        <p>
          <strong>You: </strong>
          {text}
        </p>
      ) : (
        <p>
          <strong>{sender.username}: </strong>
          {text}
        </p>
      )}
    </div>
  );
}

export default SingleChat;
