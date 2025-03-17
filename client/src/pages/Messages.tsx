import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

function Messages() {
  const { user } = useContext(AuthContext);

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
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  useEffect(() => {
    getChats();
  }, []);

  return (
    <div>
      <h1>this is the messages page</h1>
    </div>
  );
}

export default Messages;
