import "../styles/SingleChat.css";

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
