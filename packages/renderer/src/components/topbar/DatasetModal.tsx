import React from "react";
import {
  Modal,
  Tab,
  Tabs,
  Input,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export default function ImportExportDataset() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpen = () => {
    onOpen();
  };
  const [selected, setSelected] = React.useState<React.Key>("import");

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
      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent className="dark text-foreground">
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Lets get some data!
              </ModalHeader>
              <ModalBody>
                <Tabs
                  className="dark"
                  fullWidth
                  aria-label="Tabs form"
                  selectedKey={selected}
                  size="md"
                  onSelectionChange={setSelected}
                >
                  <Tab key="import" title="Import Data">
                    <form className="flex flex-col gap-4">
                      <Input
                        isRequired
                        label="Email"
                        placeholder="Enter your email"
                        type="email"
                      />
                      <Input
                        isRequired
                        label="Password"
                        placeholder="Enter your password"
                        type="password"
                      />

                      <div className="flex gap-2 justify-end">
                        <Button fullWidth color="primary">
                          Login
                        </Button>
                      </div>
                    </form>
                  </Tab>
                  <Tab key="export" title="Export Data">
                    <form className="flex flex-col gap-4 h-[300px]">
                      <Input
                        isRequired
                        label="Name"
                        placeholder="Enter your name"
                        type="password"
                      />
                      <Input
                        isRequired
                        label="Email"
                        placeholder="Enter your email"
                        type="email"
                      />
                      <Input
                        isRequired
                        label="Password"
                        placeholder="Enter your password"
                        type="password"
                      />
                      <div className="flex gap-2 justify-end">
                        <Button fullWidth color="primary">
                          Sign up
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
