import { useState } from "react";
// import useWebSocket from "react-use-websocket";
import Gamepad from "./Gamepad";
import Control from "./Contol";

import "./App.css";

function App() {
  const [socketUrl, setSocketUrl] = useState("ws://localhost:80");
  const [connect, setConnect] = useState(true);

  return (
    <div className="App">
      <Gamepad socketUrl={socketUrl} connect={connect} />
      <Control
        socketUrl={socketUrl}
        setSocketUrl={setSocketUrl}
        connect={connect}
        setConnect={setConnect}
      />
    </div>
  );
}

export default App;
