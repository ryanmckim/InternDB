import { useDisclosure } from "@chakra-ui/react";
import "./reviewModal.scss";
import ReviewModal from "./ReviewModal";

export default function AddReviewModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <button onClick={onOpen} className="add-review-button">
        +
      </button>

      <ReviewModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
