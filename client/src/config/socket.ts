// import io from "socket.io-client";

// // "undefined" means the URL will be computed from the `window.location` object
// const URL =
//   process.env.NODE_ENV === "production" ? undefined : "http://localhost:4000";

// const getUsername = () => {
//   const activeUser = localStorage.getItem("username");
//   if (activeUser) {
//     return activeUser;
//   }

//   if (!activeUser) {
//     const randomUsername = `user-${new Date().getSeconds()}`;
//     localStorage.setItem("username", randomUsername);
//     return randomUsername;
//   }
// };

// // when we establish connection for the first time we send this info to the server
// const socket = io(URL, {
//   auth: {
//     token: "a private token",
//     serverOffset: 0,
//     author: getUsername(),
//   },
// });

// export default socket;
