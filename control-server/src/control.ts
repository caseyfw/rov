type Command = (args: {
  direction: string;
  weight: number;
  duration: number;
}) => void;

export const command: Command = ({ direction, weight, duration }) => {
  console.log(`Go ${direction} at ${weight} for ${duration}ms.`);
  setTimeout(() => {
    console.log(`  ...done ${direction} at ${weight}.`);
  }, duration);
};
