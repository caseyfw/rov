import { Server } from "socket.io";

export type Controls = Record<string, number | boolean>;

const duration = 1000;
let timeoutId: NodeJS.Timeout;
const port = 3001;
const io = new Server(port, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.handshake.address} / ${socket.id}`);
  socket.on(
    "control",
    (controls: Controls, callback: (c: Controls) => void): void => {
      callback(controls);
      timeoutId && clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        // @todo Emit halt control to local hardware.
        console.log("Timeout waiting for next command.");
        socket.emit("timeout");
      }, duration);
      Object.keys(controls).forEach((key) => {
        // @todo Emit control to local hardware.
        console.log(`${key}: ${controls[key]}`);
      });
    }
  );
});

console.log(`Server started on port ${port}.`);
