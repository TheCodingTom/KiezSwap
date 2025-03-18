import { useEffect } from "react";
import { useParams } from "react-router";

function SingleChat() {
  const { chatId } = useParams<string>();
  const getChatById = async () => {
    try {
      const requestOptions = {
        method: "GET",
      };
      const response = await fetch(
        `http://localhost:4000/api/chats/userChats/${chatId}`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Something went wrong fetching the single chat");
      }

      if (response.ok) {
        const result = await response.json();
        console.log(result);
      }
    } catch (error) {
      console.log("error fetching the single chat :>> ", error);
    }
  };

  useEffect(() => {
    getChatById();
  }, []);

  return (
    <div>
      <h1>Single chat page</h1>
    </div>
  );
}

export default SingleChat;
