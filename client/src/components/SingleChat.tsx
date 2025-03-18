import { useState } from "react";

type SingleChatProps = {
  senderId: SenderType;
  text: string;
};

type SenderType = {
  senderId: string;
  username: string;
};

function SingleChat({ senderId, text }: SingleChatProps) {
  const [username, setUsername] = useState("");
  return (
    <div>
      <p>
        {senderId.username}: {text}
      </p>
    </div>
  );
}

export default SingleChat;
