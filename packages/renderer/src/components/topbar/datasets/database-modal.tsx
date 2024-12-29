import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function CreateDatabaseModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    console.log("form value change: " + value);
  };

  const onClear = () => {
    setValue("");
  };

  const onSubmit = () => {};

  return (
    <>
      <Button
        className="bg-transparent hover:bg-primary/20 rounded-full"
        onPress={onOpen}
      >
        New Database
      </Button>
      <Modal
        isOpen={isOpen}
        className="dark text-foreground"
        backdrop="blur"
        aria-label="create dashboard modal"
        placement="center"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-center gap-1">
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 0.2,
                    duration: 0.4,
                    scale: {
                      type: "spring",
                      visualDuration: 0.4,
                      bounce: 0.7,
                    },
                  }}
                >
                  <Icon
                    className="text-green-600"
                    fontSize={25}
                    icon="mage:dashboard-circle-chart-fill"
                  />
                </motion.div>
                Creating Database...
              </ModalHeader>
              <ModalBody>
                <div className="font-bold">Lets give it a name</div>
                <Input
                  isClearable
                  label="Name"
                  variant="bordered"
                  className="m-1 pt-1"
                  value={value}
                  onChange={handleChange}
                  onClear={onClear}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={onSubmit}>
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
