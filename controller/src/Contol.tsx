import { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

type ControlProps = {
  socketUrl: string;
  setSocketUrl: React.Dispatch<React.SetStateAction<string>>;
  connect: boolean;
  setConnect: React.Dispatch<React.SetStateAction<boolean>>;
};

function Control({
  socketUrl,
  setSocketUrl,
  connect,
  setConnect,
}: ControlProps) {
  const [log, setLog] = useState("");
  const { lastMessage, readyState } = useWebSocket(
    socketUrl,
    {
      share: true,
    },
    connect
  );

  const status = {
    [ReadyState.UNINSTANTIATED]: "uninitialised",
    [ReadyState.CONNECTING]: "connecting...",
    [ReadyState.OPEN]: "connected",
    [ReadyState.CLOSING]: "closing...",
    [ReadyState.CLOSED]: "closed",
  };

  useEffect(() => {
    if (lastMessage) {
      setLog((prev) => `>>> ${lastMessage?.data}\n${prev}`);
    }
  }, [lastMessage]);

  return (
    <div className="Control">
      <h2>Control</h2>
      <p>
        Server URL:{" "}
        <input
          value={socketUrl}
          onChange={(e) => setSocketUrl(e.target.value)}
        />{" "}
        <button
          onClick={(e) => setConnect(readyState === ReadyState.CLOSED)}
          disabled={
            readyState === ReadyState.CONNECTING ||
            readyState === ReadyState.CLOSING
          }
        >
          {readyState === ReadyState.OPEN ? "Disconnect" : "Connect"}
        </button>
      </p>
      <p>Status: {status[readyState]}</p>
      <textarea
        readOnly={true}
        style={{ width: "500px", height: "200px" }}
        value={log || ""}
      ></textarea>
    </div>
  );
}

export default Control;
