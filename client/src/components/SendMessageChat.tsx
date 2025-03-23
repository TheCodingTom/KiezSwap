import { useContext, useState } from "react";
import { baseUrl } from "../utils/baseUrl";
import { ChatsContext } from "../context/ChatsContext";
import { Button, Form } from "react-bootstrap";

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
    <div className="input-chat-container">
      <Form id="form">
        <div className="send-message-container">
          <Form.Group controlId="message-input">
            <Form.Control
              type="text"
              as="textarea"
              placeholder="Type a message"
              name="message"
              autoCapitalize="on"
              autoComplete="off"
              autoCorrect="on"
              onChange={handleInputText}
              value={message}
            />
          </Form.Group>
          {message.length > 0 ? (
            <Button onClick={sendMessage} id="button-send" type="submit">
              Send
            </Button>
          ) : (
            <Button disabled>Send</Button>
          )}
        </div>
      </Form>
    </div>
  );
}

export default SendMessageChat;
