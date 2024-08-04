import { Server } from "socket.io";
import { command } from "./control";

const port = 3001;
const io = new Server(port, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  socket.on("control", (direction, weight, duration) => {
    command({ direction, weight, duration });
  });
});

console.log(`Server started on port ${port}.`);
