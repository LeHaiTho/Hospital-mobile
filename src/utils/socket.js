import { io } from "socket.io-client";

const baseUrl = process.env.EXPO_PUBLIC_API_URL;
let socket;
const initializeSocket = (token) => {
  socket = io(baseUrl, {
    auth: {
      token: token,
    },
  });
  socket.on("connect", () => {
    console.log("Connected to server");
  });
  socket.on("disconnect", () => {
    console.log("Disconnected from server");
  });
};

export { initializeSocket, socket };
