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
  Input,
  NumberInput,
  NumberInputField,
  Select,
  Textarea,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";
import "./reviewModal.scss";

export default function ReviewModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [roleTitle, setRoleTitle] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [currency, setCurrency] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [workOption, setWorkOption] = useState("");
  const [comments, setComments] = useState("");

  const isFormValid = () => {
    return roleTitle && location && salary && startDate && endDate;
  };

  async function submitData() {
    if (!isFormValid()) {
      alert("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate data submission
      await new Promise((resolve) => setTimeout(resolve, 2000));
      onClose();
    } catch (error) {
      alert("Error submitting data");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <button onClick={onOpen} className="add-review-button">
        +
      </button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a Review for SAP</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              <Heading size="xs" textTransform="uppercase">
                Role Title
              </Heading>
              <Input
                placeholder="Ex: Software Engineer Intern"
                value={roleTitle}
                onChange={(e) => setRoleTitle(e.target.value)}
                my={2}
              />

              <Heading size="xs" textTransform="uppercase">
                Location
              </Heading>
              <Input
                placeholder="Ex: Vancouver, BC, Canada"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                my={2}
              />

              <Heading size="xs" textTransform="uppercase">
                Hourly Salary
              </Heading>
              <NumberInput
                value={salary}
                onChange={(valueString) => setSalary(valueString)}
                min={0}
                precision={2}
                my={2}
              >
                <NumberInputField placeholder="Ex: 26.50" />
              </NumberInput>

              <Heading size="xs" textTransform="uppercase">
                Currency
              </Heading>
              <Select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                my={2}
              >
                <option value="CAD">CAD</option>
                <option value="USD">USD</option>
              </Select>

              <Heading size="xs" textTransform="uppercase">
                Start Date
              </Heading>
              <Input
                placeholder="Start Date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                size="md"
                type="date"
                my={2}
              />

              <Heading size="xs" textTransform="uppercase">
                End Date
              </Heading>
              <Input
                placeholder="End Date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                size="md"
                type="date"
                my={2}
              />

              <Heading size="xs" textTransform="uppercase">
                Work Option
              </Heading>
              <Select
                value={workOption}
                onChange={(e) => setWorkOption(e.target.value)}
                my={2}
              >
                <option value="in-person">In-person</option>
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
              </Select>

              <Heading size="xs" textTransform="uppercase">
                Comments
              </Heading>
              <Textarea
                placeholder="Max 500 characters"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                maxLength={300}
                my={2}
              />
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={submitData}
              isLoading={isSubmitting}
              loadingText="Submitting"
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
