import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
  Center,
  Stack,
  StackDivider,
  Box,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import ReviewModal from "../Modal/ReviewModal";
import DeleteModal from "../Modal/DeleteModal";

interface ReviewProps {
  reviews: any;
  loading: boolean;
  isEdit: boolean;
}

export default function Review(props: ReviewProps) {
  const editModal = useDisclosure();
  const deleteModal = useDisclosure();
  const [loadingDelete, setLoadingDelete] = useState(false);

  if (props.loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <React.Fragment>
      <Center>
        <Box>
          {props.reviews.map((review: any, index: number) => (
            <Card
              key={review.id || index}
              boxShadow="0 3px 10px rgb(0 0 0 / 0.2)"
              bg="white"
              borderRadius="5px"
              width={500}
              margin="1rem"
            >
              <CardHeader>
                <Flex justifyContent="space-between">
                  <Heading size="md">{review.positionTitle}</Heading>
                  {props.isEdit && (
                    <Flex w="4rem" justifyContent="space-between">
                      <EditIcon
                        onClick={editModal.onOpen}
                        _hover={{
                          background: "rgb(225, 225, 225)",
                          cursor: "pointer",
                        }}
                        p="0.5rem"
                        w="2rem"
                        h="2rem"
                      />
                      <DeleteIcon
                        onClick={deleteModal.onOpen}
                        _hover={{
                          background: "rgb(225, 225, 225)",
                          cursor: "pointer",
                        }}
                        p="0.5rem"
                        w="2rem"
                        h="2rem"
                      />
                    </Flex>
                  )}
                </Flex>
              </CardHeader>
              <CardBody>
                <Stack divider={<StackDivider />} spacing="2">
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Location
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      {review.location}
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Salary
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      ${review.salary} {review.currency}/hr
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Date
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      {review.positionStartDate} to {review.positionEndDate}
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Work Option
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      {review.workOption}
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Comments
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      {review.comments}
                    </Text>
                  </Box>
                </Stack>
              </CardBody>
            </Card>
          ))}
        </Box>
      </Center>
      <ReviewModal isOpen={editModal.isOpen} onClose={editModal.onClose} />
      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.onClose}
        header="Delete Review Confirmation"
        body="Are you sure you want to delete this review?"
        deleteData={() => {}}
      />
    </React.Fragment>
  );
}
