// import { useEffect, useState } from "react";
// import socket from "../config/socket";
// import "../styles/testSockets.css";
// import "../styles/ChatMessages.css";

// type Message = {
//   msg: string;
//   author: string;
// };

// function TestSockets() {
//   // console.log(socket);

//   const [messages, setMessages] = useState<Message[]>([]);

//   const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const form = document.querySelector("form");
//     const formData = new FormData(form!);
//     const message = formData.get("message");
//     console.log("message :>> ", message);
//     // client emits a signal that contains "chat message" label and our server listens to the event coming from client that contains same label
//     socket.timeout(1000).emit("chat message", message, () => {
//       console.log("message sent");
//     });
//     // console.log(messages);
//   };

//   const getMessages = (
//     message: string,
//     serverOffset: string,
//     author: string
//   ) => {
//     console.log("message received :>> ", message);
//     setMessages((prev) => {
//       return [...prev, { msg: message, author: author }];
//     });
//     console.log("socket.auth :>> ", socket.auth);
//     socket.auth.serverOffset = serverOffset;
//   };

//   useEffect(() => {
//     // we listen to incoming messages - whenever the server emits a "chat message" event, the client receives it and executes the callback
//     socket.on("chat message", getMessages);

//     return () => {
//       // clean previous effect - event client is listening to
//       socket.off("chat message", getMessages);
//     };
//   }, []);

//   return (
//     <div className="chat-body">
//       <h1>Live 💬Chat ⚛️</h1>
//       {/* <ConnectionManager /> */}
//       <section id="chat">
//         {/* <Messages messages={messages} messagesEndRef={messagesEndRef} /> */}
//         <ul id="messages">
//           {messages &&
//             messages.map((msg, index) => {
//               return (
//                 <ChatMessage msg={msg.msg} key={index} author={msg.author} />
//               );
//             })}
//         </ul>

//         <form onSubmit={sendMessage} id="form">
//           <input
//             type="text"
//             name="message"
//             id="message-input"
//             placeholder="Type a message"
//             autoCapitalize="on"
//             autoComplete="off"
//             autoCorrect="on"
//           />
//           <button id="button-send" type="submit">
//             Send
//           </button>
//         </form>
//       </section>
//     </div>
//   );
// }

// export default TestSockets;

// function ChatMessage({ msg, author }: Message) {
//   return (
//     <li>
//       {author} -- {msg}
//     </li>
//   );
// }
