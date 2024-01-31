import { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";
import "./reviewModal.scss";

interface DeleteModalProp {
  isOpen: boolean;
  onClose: () => void;
}

export default function DeleteModal(props: DeleteModalProp) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function deleteData() {
    setIsDeleting(true);

    try {
      // Simulate data submission
      await new Promise((resolve) => setTimeout(resolve, 2000));
      props.onClose();
    } catch (error) {
      alert("Error Deleting data");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Review Confirmation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to delete this review?</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={deleteData}
              isLoading={isDeleting}
              loadingText="Deleting"
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
