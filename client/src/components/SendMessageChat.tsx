import React, { useState } from "react";
import { Form } from "react-router";

function SendMessageChat() {
  const token = localStorage.getItem("token");
  const [message, setMessage] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");

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
    urlencoded.append("listingId", listingId);
    urlencoded.append("text", message);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };

    const response = await fetch(
      "http://localhost:4000/api/chats/newChat",
      requestOptions
    );

    try {
      if (response) {
        const result = await response.json();
        console.log(result);
        setConfirmMessage("Message sent!");
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
        />
        <button onClick={sendMessage} id="button-send" type="submit">
          Send
        </button>
      </form>
    </div>
  );
}

export default SendMessageChat;
