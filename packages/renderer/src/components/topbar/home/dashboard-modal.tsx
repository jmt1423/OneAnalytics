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
import { useLocation } from "react-router";

export default function CreateDashboardModal() {
  const location = useLocation();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formData, setFormData] = useState({
    firstInput: "",
    secondInput: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(name + " | " + value);
  };

  const onClear = () => {
    setFormData({
      firstInput: "",
      secondInput: "",
    });
  };

  const onSubmit = () => {
    console.log(formData);
    console.log(location.pathname);
  };

  return (
    <>
      <Button
        className="bg-transparent hover:bg-primary/20 rounded-full"
        onPress={onOpen}
      >
        New Dashboard
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
                Creating Dashboard...
              </ModalHeader>
              <ModalBody>
                <div className="font-bold">Lets give it a name</div>
                <Input
                  isClearable
                  label="Name"
                  variant="bordered"
                  className="m-1 pt-1"
                  name="firstInput"
                  value={formData.firstInput}
                  onChange={handleChange}
                  onClear={onClear}
                />
                <div className="font-bold">and a description</div>
                <Input
                  isClearable
                  label="Something nice"
                  variant="bordered"
                  name="secondInput"
                  className="m-1 pt-1"
                  value={formData.secondInput}
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
