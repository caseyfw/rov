import useWebSocket from "react-use-websocket";

type GamepadProps = {
  socketUrl: string;
  connect: boolean;
};

function Gamepad({ socketUrl, connect }: GamepadProps) {
  const { sendJsonMessage } = useWebSocket(
    socketUrl,
    {
      share: true,
    },
    connect
  );
  return (
    <div className="Gamepad">
      <h2>Gamepad</h2>
      <p id="start">Press a button on your controller to start...</p>
      <button
        disabled={!connect}
        onClick={() => sendJsonMessage({ a: 1, b: 2 })}
      >
        Test message
      </button>
    </div>
  );
}

export default Gamepad;
