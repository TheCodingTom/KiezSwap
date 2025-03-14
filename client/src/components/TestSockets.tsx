import "../styles/testSockets.css";

function TestSockets() {
  return (
    <div className="chat-body">
      <h1>Live 💬Chat ⚛️</h1>
      {/* <ConnectionManager /> */}
      <section id="chat">
        {/* <Messages messages={messages} messagesEndRef={messagesEndRef} /> */}
        <form id="form">
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
