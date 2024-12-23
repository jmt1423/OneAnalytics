type ReadCsvResponse = {
  success: boolean;
  error?: string;
  content?: string;
};

const ButtonTest = () => {
  const handleReadCsv = async () => {
    const filePath = "/path/to/csv/";

    try {
      const response = await window.sendData<ReadCsvResponse>(
        "read-csv",
        filePath,
      );
      if (response.success) {
        console.log("success", response);
      } else {
        console.error("error reading file", response.error);
      }
    } catch (error) {
      console.error("unexpected error", error);
    }
  };
  return (
    <div>
      <button onClick={() => void handleReadCsv()}>read-csv</button>
    </div>
  );
};
export default ButtonTest;
