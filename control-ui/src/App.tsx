import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

import "./App.css";

type Controls = Record<string, number | boolean>;

function App() {
  const [socketUrl, setSocketUrl] = useState("rov.local:3001");
  const socket = useRef(io(socketUrl, { autoConnect: false }));
  const [isConnected, setIsConnected] = useState(socket.current.connected);
  const [serverControls, setServerControls] = useState({} as Controls);
  const [gamepadConnected, setGamepadConnected] = useState(false);

  const onConnect = () => {
    setIsConnected(true);
  };

  const onDisconnect = () => {
    setIsConnected(false);
  };

  const onControlTimeout = () => {
    setServerControls({ timeout: true });
  };

  const init = (s: Socket) => {
    s.on("connect", onConnect);
    s.on("disconnect", onDisconnect);
    s.on("timeout", onControlTimeout);
  };

  const teardown = (s: Socket) => {
    s.off("connect", onConnect);
    s.off("disconnect", onDisconnect);
  };

  useEffect(() => {
    const s = socket.current;
    init(s);

    window.addEventListener("gamepadconnected", (e) => {
      setGamepadConnected(true);
    });

    window.addEventListener("gamepaddisconnected", (e) => {
      setGamepadConnected(false);
    });

    return () => {
      teardown(s);
    };
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    const s = socket.current;
    const emitGamepadData = () => {
      const gamepad = navigator.getGamepads()[0];
      if (gamepad) {
        const buttons = gamepad.buttons.map((button) => button.pressed);
        const axes = gamepad.axes;
        console.log("Button states: ", gamepad);
        s.emit("control", { buttons, axes }, (res: Controls) => {
          setServerControls(res);
        });
      }
    };

    if (isConnected === true) {
      intervalId = setInterval(emitGamepadData, 100);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isConnected]);

  return (
    <div className="App">
      <div className="Control">
        <h2>Control</h2>
        <p>Gamepad connected: {"" + gamepadConnected}</p>
        <p>Server connected: {"" + isConnected}</p>
        <p>
          Server URL:{" "}
          <input
            value={socketUrl}
            disabled={isConnected}
            onChange={(e) => {
              setSocketUrl(e.target.value);
              socket.current = io(e.target.value, { autoConnect: false });
              init(socket.current);
            }}
          />{" "}
          <button
            onClick={(e) =>
              isConnected
                ? socket.current.disconnect()
                : socket.current.connect()
            }
          >
            {isConnected ? "Disconnect" : "Connect"}
          </button>
        </p>
        <h3>Server controls</h3>
        <ul>
          {Object.keys(serverControls).map((key) => (
            <li key={key}>{`${key} : ${serverControls[key]}`}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
