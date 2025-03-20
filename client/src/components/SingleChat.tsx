import "../styles/SingleChat.css";
import { SenderType } from "../types/customTypes";

type SingleChatProps = {
  sender: SenderType;
  text: string;
};

function SingleChat({ sender, text }: SingleChatProps) {
  return (
    <div>
      <p>
        <strong>{sender.username}: </strong>
        {text}
      </p>
    </div>
  );
}

export default SingleChat;
