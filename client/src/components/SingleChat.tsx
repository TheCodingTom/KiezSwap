import { useContext } from "react";
import "../styles/SingleChat.css";
import { ChatsContext } from "../context/ChatsContext";

type SingleChatProps = {
  sender: SenderType;
  text: string;
};

export type SenderType = {
  _id: string;
  username: string;
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
