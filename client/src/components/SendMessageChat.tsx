import { useContext, useState } from "react";
import { baseUrl } from "../utils/baseUrl";
import { ChatsContext } from "../context/ChatsContext";

type SendMessageChatProps = {
  chatId?: string;
};

function SendMessageChat({ chatId }: SendMessageChatProps) {
  const token = localStorage.getItem("token");
  const [message, setMessage] = useState("");

  const { getChatById } = useContext(ChatsContext);

  const handleInputText = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setMessage(e.target.value);
  };

  const sendMessage = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const urlencoded = new URLSearchParams();
    urlencoded.append("text", message);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };

    const response = await fetch(
      `${baseUrl}/api/chats/userChats/send/${chatId}`,
      requestOptions
    );

    try {
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setMessage(""); // Clear the input after sending
        getChatById();
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  return (
    <div>
      <form id="form">
        <input
          type="text"
          name="message"
          id="message-input"
          placeholder="Type a message"
          autoCapitalize="on"
          autoComplete="off"
          autoCorrect="on"
          onChange={handleInputText}
          value={message}
        />
        {message.length > 0 ? (
          <button onClick={sendMessage} id="button-send" type="submit">
            Send
          </button>
        ) : (
          <button disabled>Send</button>
        )}
      </form>
    </div>
  );
}

export default SendMessageChat;
