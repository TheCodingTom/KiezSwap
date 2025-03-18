import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { NavLink } from "react-router";

type ChatType = {
  buyerId: string;
  created_at: string;
  listingId: ChatListingType;
  messages: MessageType[];
  sellerId: string;
  updatedAt: string;
  _id: string;
};

export type MessageType = {
  senderId: string;
  text: string;
  _id: string;
};

type ChatListingType = {
  name: string;
  _id: string;
};

function Messages() {
  const { user } = useContext(AuthContext);
  const [chats, setChats] = useState<ChatType[] | null>(null);

  const getChats = async () => {
    const requestOptions = {
      method: "GET",
    };

    const response = await fetch(
      `http://localhost:4000/api/chats/userChats/?sellerId=${user?.id}&buyerId=${user?.id}`,
      requestOptions
    );

    try {
      if (response) {
        const result = await response.json();
        console.log(result);
        setChats(result.userChats);
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  useEffect(() => {
    getChats();
  }, []);

  return (
    <ListGroup>
      {!chats ? (
        <ListGroupItem>No chats found.</ListGroupItem>
      ) : (
        chats &&
        chats.map((chat) => (
          <NavLink key={chat._id} to={chat._id}>
            <ListGroupItem action>
              <div>
                <strong>Listing:</strong> {chat.listingId.name}
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
