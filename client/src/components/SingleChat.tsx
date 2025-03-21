import "../styles/SingleChat.css";
import { SenderType } from "../types/customTypes";

type SingleChatProps = {
  sender: SenderType;
  text: string;
  isUserMessage: boolean;
};

function SingleChat({ sender, text, isUserMessage }: SingleChatProps) {
  return (
    <div
      className={`single-message-container ${
        isUserMessage ? "user-message" : "other-message"
      }`}
    >
      <p>
        <strong>{sender.username}: </strong>
        {text}
      </p>
    </div>
  );
}

export default SingleChat;
