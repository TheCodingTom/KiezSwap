import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { NavLink } from "react-router";
import { baseUrl } from "../utils/baseUrl";
import { ChatType } from "../types/customTypes";
import { ChatsContext } from "../context/ChatsContext";

function Messages() {
  const { user } = useContext(AuthContext);

  const { chats } = useContext(ChatsContext);
  // const [chats, setChats] = useState<ChatType[] | null>(null);

  // const getChats = async () => {
  //   const requestOptions = {
  //     method: "GET",
  //   };

  //   const response = await fetch(
  //     `${baseUrl}/api/chats/userChats/?sellerId=${user?._id}&buyerId=${user?._id}`,
  //     requestOptions
  //   );

  //   try {
  //     if (response) {
  //       const result = await response.json();
  //       console.log(result);
  //       setChats(result.userChats);
  //     }
  //   } catch (error) {
  //     console.log("error :>> ", error);
  //   }
  // };

  useEffect(() => {
    getChats();
  }, []);

  return (
    <ListGroup>
      {chats && chats.length < 1 ? (
        <ListGroupItem>No chats found.</ListGroupItem>
      ) : (
        chats &&
        chats.map((chat) => (
          <NavLink key={chat._id} to={chat._id}>
            <ListGroupItem action>
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
