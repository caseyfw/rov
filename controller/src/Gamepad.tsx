import { useState } from "react";
import useWebSocket from "react-use-websocket";
import { useGamepads } from "react-gamepads";

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
  const [gamepads, setGamepads] = useState<{
    [key: number]: Gamepad;
  }>({});
  useGamepads((gamepads) => setGamepads(gamepads));
  const gamepadDisplay = Object.keys(gamepads).map((gamepadIdString) => {
    const gamepadId = Number.parseInt(gamepadIdString);
    // console.log("displaying gamepad", gamepads[gamepadId]);
    return (
      <div key={gamepadIdString}>
        <h2>{gamepads[gamepadId].id}</h2>
        {gamepads[gamepadId].buttons &&
          gamepads[gamepadId].buttons.map((button, index) => (
            <div key={index}>
              {index}: {button.pressed ? "True" : "False"}
            </div>
          ))}
      </div>
    );
  });

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
      {gamepadDisplay}
    </div>
  );
}

export default Gamepad;
