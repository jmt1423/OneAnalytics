import log from "electron-log";
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
import { submitDataset } from "@vite-electron-builder/preload";

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

export default function ImportExportDataset() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selected, setSelected] = React.useState<string | null>("import");
  const [file, setFile] = React.useState<string | null>(null);
  const [description, setDescription] = React.useState("");

  const handleOpen = () => {
    onOpen();
  };

  const onFileChoice = () => {
    handleFileOpen().catch((err) => {
      log.error("Error in renderer, cannot open file", err);
    });
  };

  const handleFileOpen = async () => {
    const name: string | null = await openFilePicker("dialog:openFile");
    if (name) {
      setFile(name);
    }
  };

  const handleSubmit = async () => {
    await submitDataset("submit:dataset", description);
  };

  const onDatasetSubmit = () => {
    handleSubmit().catch((err) => {
      log.error("error parsing and submitting dataset", err);
    });
  };

  const ease: number[] = [0.36, 0.66, 0.4, 1];

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
        backdrop="blur"
        isOpen={isOpen}
        onClose={onClose}
        placement="center"
        motionProps={{
          variants: {
            enter: {
              scale: 1,
              y: "var(--slide-enter)",
              opacity: 1,
              transition: {
                scale: {
                  duration: 0.4,
                  ease: ease,
                },
                opacity: {
                  duration: 0.4,
                  ease: ease,
                },
                y: {
                  type: "spring",
                  bounce: 0,
                  duration: 0.6,
                },
              },
            },
            exit: {
              scale: 1.1, // NextUI default 1.03
              y: "var(--slide-exit)",
              opacity: 0,
              transition: {
                duration: 0.3,
                ease: ease,
              },
            },
          },
        }}
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
                    <form className="flex flex-col gap-4">
                      <Button
                        color="success"
                        variant="ghost"
                        aria-label="Choose File"
                        onPress={onFileChoice}
                      >
                        Choose a file
                      </Button>
                      <div className="text-sm text-gray-400">{file}</div>
                      <Input
                        isRequired
                        label="Description"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />

                      <div className="flex gap-2 justify-end">
                        <Button
                          fullWidth
                          color="primary"
                          variant="ghost"
                          aria-label="upload button"
                          onPress={onDatasetSubmit}
                        >
                          Upload
                        </Button>
                      </div>
                    </form>
                  </Tab>
                  <Tab key="export" title="Export Data">
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
                  </Tab>
                </Tabs>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
