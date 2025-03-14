import { useEffect } from "react";
import socket from "../config/socket";
import "../styles/testSockets.css";

function TestSockets() {
  console.log(socket);

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = document.querySelector("form");
    const formData = new FormData(form!);
    const message = formData.get("message");
    console.log("message :>> ", message);
    // client emits a signal that contains "chat message" label and our server listens to the event coming from client that contains same label
    socket.emit("chat message", message, () => {
      console.log("message sent");
    });
  };

  const getMessages = (message: string) => {
    console.log("message received :>> ", message);
  };

  useEffect(() => {
    // we listen to incoming messages - whenever the server emits a "chat message" event, the client receives it and executes the callback
    socket.on("chat message", getMessages);

    return () => {
      // clean previous effect - event client is listening to
      socket.off("chat message", getMessages);
    };
  }, []);

  return (
    <div className="chat-body">
      <h1>Live 💬Chat ⚛️</h1>
      {/* <ConnectionManager /> */}
      <section id="chat">
        {/* <Messages messages={messages} messagesEndRef={messagesEndRef} /> */}
        <form onSubmit={sendMessage} id="form">
          <input
            type="text"
            name="message"
            id="message-input"
            placeholder="Type a message"
            autoCapitalize="on"
            autoComplete="off"
            autoCorrect="on"
          />
          <button id="button-send" type="submit">
            Send
          </button>
        </form>
      </section>
    </div>
  );
}

export default TestSockets;
