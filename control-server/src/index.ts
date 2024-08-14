import { Server } from "socket.io";
import { Gpio } from "pigpio";

export interface Controls {
  buttons: Array<boolean>;
  axes: Array<number>;
}

const panServo = new Gpio(18, { mode: Gpio.OUTPUT });
const tiltServo = new Gpio(23, { mode: Gpio.OUTPUT });

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

      console.log(controls);

      const pan = Math.round(((controls.axes[2] * -1 + 1) / 2) * 1000 + 1000);
      const tilt = Math.round(((controls.axes[5] * -1 + 1) / 2) * 1000 + 1000);
      console.log(pan, tilt);
      panServo.servoWrite(pan);
      tiltServo.servoWrite(tilt);
    }
  );
});

console.log(`Server started on port ${port}.`);
