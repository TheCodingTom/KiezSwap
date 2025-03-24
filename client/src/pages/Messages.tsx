import { useContext, useEffect } from "react";

import { ListGroup, ListGroupItem } from "react-bootstrap";
import { NavLink } from "react-router";

import { ChatsContext } from "../context/ChatsContext";

function Messages() {
  const { chats, getChats } = useContext(ChatsContext);

  useEffect(() => {
    getChats();
  }, []);

  return (
    <ListGroup className="message-list">
      {chats && chats.length < 1 ? (
        <h1>No chats yet</h1>
      ) : (
        chats &&
        chats.map((chat) => (
          <NavLink className={"messages-link"} key={chat._id} to={chat._id}>
            <ListGroupItem action className="message-preview">
              <div>
                <strong>Listing:</strong> {chat.listing.name}
              </div>
              <div>
                <strong>Last Message: </strong>
                {chat.messages[chat.messages.length - 1]?.text}
              </div>
            </ListGroupItem>
          </NavLink>
        ))
      )}
    </ListGroup>
  );
}

export default Messages;
