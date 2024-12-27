import React from "react";
import {
  Modal,
  Tab,
  Tabs,
  Input,
  ModalContent,
  ModalHeader,
  ModalBody,
  Select,
  SelectItem,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { openFilePicker } from "@vite-electron-builder/preload";
import { processCsv } from "@vite-electron-builder/preload";

interface DashboardType {
  name: string;
  description: string;
}

const supportedFileTypes: string[] = ["png", "svg", "pdf", "jpeg", "csv"];

const tempDashboards: DashboardType[] = [
  { name: "Customer Sales", description: "sales report from 10/11/2024" },
  { name: "Monthly sales data", description: "sales data from all of 2024" },
  { name: "Customer leads", description: "leads data from 2023-2024" },
];

export default React.memo(function ImportExportDataset() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [fileName, setFileName] = React.useState<string>("");

  const handleFileChoice = () => {
    fileChosen().catch((err) => {
      console.log("error", err);
    });
  };
  const fileChosen = async (): Promise<void> => {
    const name: string | null = await openFilePicker("dialog:openFile");
    if (name) {
      setFileName(name);
    }
  };

  const handleProcessing = () => {
    processFile().catch((err) => {
      console.log("error: ", err);
    });
  };

  const processFile = async (): Promise<void> => {
    await processCsv("process-file");
  };

  const handleOpen = () => {
    onOpen();
  };

  const [selected, setSelected] = React.useState<string | null>("import");
  // const [fileName, setFileName] = React.useState<string | null>(null);

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button
          className="bg-transparent hover:bg-primary/20"
          color="default"
          variant="flat"
          radius="full"
          onPress={() => handleOpen()}
        >
          Dataset I/O
        </Button>
      </div>
      <Modal
        backdrop="transparent"
        isOpen={isOpen}
        onClose={onClose}
        placement="center"
      >
        <ModalContent className="dark text-foreground">
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1" aria-label="Header">
                Import data or export a dashboard
              </ModalHeader>
              <ModalBody>
                <Tabs
                  className="dark"
                  fullWidth
                  aria-label="Tabs form"
                  selectedKey={selected}
                  size="md"
                  onSelectionChange={(key) => setSelected(key as string | null)}
                >
                  <Tab key="import" title="Import Data">
                    {selected === "import" && (
                      <form className="flex flex-col gap-4">
                        <Button
                          color="success"
                          variant="ghost"
                          aria-label="Choose File"
                          onPress={handleFileChoice}
                        >
                          Choose a file
                        </Button>
                        <div className="text-small text-gray-400">
                          {fileName}
                        </div>

                        <Input isRequired label="Description" type="text" />
                        <div className="flex gap-2 justify-end">
                          <Button
                            fullWidth
                            color="primary"
                            variant="ghost"
                            onPress={handleProcessing}
                            aria-label="upload button"
                          >
                            Upload
                          </Button>
                        </div>
                      </form>
                    )}
                  </Tab>
                  <Tab key="export" title="Export Data">
                    {selected === "export" && (
                      <form className="flex flex-col gap-4 h-fit">
                        <Select
                          isRequired
                          className="max-w-full"
                          label="Your Dashboards"
                          placeholder="Select a dashboard for export"
                        >
                          {tempDashboards.map((dataset) => (
                            <SelectItem key={dataset.name}>
                              {dataset.name}
                            </SelectItem>
                          ))}
                        </Select>
                        <Select
                          isRequired
                          className="max-w-full"
                          label="File Types"
                          placeholder="Select your desired export option"
                        >
                          {supportedFileTypes.map((filetype) => (
                            <SelectItem key={filetype}>{filetype}</SelectItem>
                          ))}
                        </Select>
                        <div className="flex gap-2 justify-end">
                          <Button
                            fullWidth
                            color="primary"
                            variant="ghost"
                            aria-label="export button"
                          >
                            Export
                          </Button>
                        </div>
                      </form>
                    )}
                  </Tab>
                </Tabs>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
});
