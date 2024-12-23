import { sendData } from "@vite-electron-builder/preload";

const ButtonTest = () => {
  const handleReadCsv = async () => {
    const filePath = "/path/to/csv/";
    await sendData("read-csv", filePath);
  };
  return (
    <div>
      <button onClick={() => void handleReadCsv()}>read-csv</button>
    </div>
  );
};
export default ButtonTest;
