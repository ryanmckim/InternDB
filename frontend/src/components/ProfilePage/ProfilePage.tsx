import {
  Button,
  FormControl,
  VStack,
  Input,
  Box,
  Heading,
  Center,
  Flex,
  Card,
  CardBody,
  Text,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import ReviewPagination from "../Pagination/ReviewPagination";
import Review from "../Review/Review";
import { useParams, useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const [userReviews, setUserReviews] = useState([
    {
      positionTitle: "Software Engineer Intern",
      location: "Vancouver, BC, Canada",
      salary: 30,
      currency: "USD",
      positionStartDate: "09-08-2023",
      positionEndDate: "10-08-2024",
      workOption: "Hybrid",
      comments: "Hello",
    },
    {
      positionTitle: "Software Engineer Intern",
      location: "Vancouver, BC, Canada",
      salary: 30,
      currency: "USD",
      positionStartDate: "09-08-2023",
      positionEndDate: "10-08-2024",
      workOption: "Hybrid",
      comments: "Hello",
    },
    {
      positionTitle: "Software Engineer Intern",
      location: "Vancouver, BC, Canada",
      salary: 30,
      currency: "USD",
      positionStartDate: "09-08-2023",
      positionEndDate: "10-08-2024",
      workOption: "Hybrid",
      comments: "Hello",
    },
    {
      positionTitle: "Software Engineer Intern",
      location: "Vancouver, BC, Canada",
      salary: 30,
      currency: "USD",
      positionStartDate: "09-08-2023",
      positionEndDate: "10-08-2024",
      workOption: "Hybrid",
      comments: "Hello",
    },
    {
      positionTitle: "Software Engineer Intern",
      location: "Vancouver, BC, Canada",
      salary: 30,
      currency: "USD",
      positionStartDate: "09-08-2023",
      positionEndDate: "10-08-2024",
      workOption: "Hybrid",
      comments: "Hello",
    },
    {
      positionTitle: "Software Engineer Intern",
      location: "Vancouver, BC, Canada",
      salary: 30,
      currency: "USD",
      positionStartDate: "09-08-2023",
      positionEndDate: "10-08-2024",
      workOption: "Hybrid",
      comments: "Hello",
    },
    {
      positionTitle: "Software Engineer Intern",
      location: "Vancouver, BC, Canada",
      salary: 30,
      currency: "USD",
      positionStartDate: "09-08-2023",
      positionEndDate: "10-08-2024",
      workOption: "Hybrid",
      comments: "Hello",
    },
    {
      positionTitle: "Software Engineer Intern",
      location: "Vancouver, BC, Canada",
      salary: 30,
      currency: "USD",
      positionStartDate: "09-08-2023",
      positionEndDate: "10-08-2024",
      workOption: "Hybrid",
      comments: "Hello",
    },
    {
      positionTitle: "Software Engineer Intern",
      location: "Vancouver, BC, Canada",
      salary: 30,
      currency: "USD",
      positionStartDate: "09-08-2023",
      positionEndDate: "10-08-2024",
      workOption: "Hybrid",
      comments: "Hello",
    },
    {
      positionTitle: "Software Engineer Intern",
      location: "Vancouver, BC, Canada",
      salary: 30,
      currency: "USD",
      positionStartDate: "09-08-2023",
      positionEndDate: "10-08-2024",
      workOption: "Hybrid",
      comments: "Hello",
    },
  ]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentReview, setCurrentReview] = useState(1);
  const [reviewsPerPage] = useState(7);
  const indexOfLastReview = currentReview * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const { pageNumber } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const page = pageNumber ? parseInt(pageNumber) : 1;
    setCurrentReview(page);
  }, [pageNumber]);

  const paginate = (pageNumber: number) => {
    setCurrentReview(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentReviews = userReviews.slice(
    indexOfFirstReview,
    indexOfLastReview
  );

  return (
    <React.Fragment>
      <Center>
        <VStack>
          <Flex justifyContent="flex-start" ml="16px" width="100%">
            <Heading size="lg">Profile</Heading>
          </Flex>
          <Card
            boxShadow="0 3px 10px rgb(0 0 0 / 0.2)"
            bg="white"
            borderRadius="5px"
            width={500}
            margin="1rem"
          >
            <CardBody>
              <VStack alignItems="flex-start">
                <Heading size="sm">Email</Heading>
                <Text>email@student.ubc.ca</Text>
                <Heading size="sm">Edit Password</Heading>
                <InputGroup>
                  <Input
                    placeholder="Enter your new password"
                    type="password"
                  />
                  <InputRightElement width="5rem">
                    <Button h="1.75rem" size="sm">
                      Submit
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </VStack>
            </CardBody>
          </Card>
          <Flex justifyContent="flex-start" ml="16px" width="100%">
            <Heading size="lg">Your Reviews</Heading>
          </Flex>
          <Review reviews={currentReviews} loading={loading} isEdit={true} />
          <Center>
            <ReviewPagination
              reviewsPerPage={reviewsPerPage}
              totalReviews={userReviews.length}
              paginate={paginate}
              currentPage={currentReview}
            />
          </Center>
        </VStack>
      </Center>
    </React.Fragment>
  );
}
