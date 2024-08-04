"use client";

import { useState } from "react";
import { io } from "socket.io-client";

type ControlProps = {};

function Control({}: ControlProps) {
  const [log, setLog] = useState("");

  const socket = io("localhost:3001");

  socket.on("connect", () => {
    console.log(socket.id);
  });

  return (
    <div className="Control">
      <h2>Control</h2>
      <p>
        Server URL: <input value={""} onChange={(e) => null} />{" "}
        <button onClick={(e) => null} disabled={false}>
          {false ? "Disconnect" : "Connect"}
        </button>
      </p>
      <p>Status: </p>
      <textarea
        readOnly={true}
        style={{ width: "500px", height: "200px" }}
        value={log || ""}
      ></textarea>
    </div>
  );
}

export default Control;
