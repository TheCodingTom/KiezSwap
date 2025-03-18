import React from "react";
import { MessageType } from "../pages/Messages";

type SingleChatProps = {
  senderId: string;
  text: string;
};

function SingleChat({ senderId, text }: SingleChatProps) {
  return (
    <div>
      <p>{text}</p>
    </div>
  );
}

export default SingleChat;
