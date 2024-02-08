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
  header: string;
  body: string;
  deleteData: () => void;
}

export default function DeleteModal(props: DeleteModalProp) {
  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{props.header}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{props.body}</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => props.deleteData()}
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
