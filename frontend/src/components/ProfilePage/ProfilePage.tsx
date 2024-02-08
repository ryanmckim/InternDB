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
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import ReviewPagination from "../Pagination/ReviewPagination";
import Review from "../Review/Review";
import { useParams, useNavigate } from "react-router-dom";
import { deleteRequest, getRequest, putRequest } from "../../utils/apiClient";
import { User } from "../../types/User";
import DeleteModal from "../Modal/DeleteModal";

export default function ProfilePage() {
  const [user, setUser] = useState<User>({});
  const [newPassword, setNewPassword] = useState("");

  const [loadingReview, setLoadingReview] = useState(false);
  const [loadingPwd, setLoadingPwd] = useState(false);

  const [currentReview, setCurrentReview] = useState(1);
  const [reviewsPerPage] = useState(7);
  const indexOfLastReview = currentReview * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;

  const { pageNumber } = useParams();
  const navigate = useNavigate();
  const deleteModal = useDisclosure();

  const authToken = localStorage.getItem("authToken");
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + authToken,
  };

  useEffect(() => {
    getRequest("/user", {}, headers)
      .then((user) => setUser(user))
      .catch((err) => {
        alert(err + ", please login again");
        console.error(err);
        navigate("/login");
      });
  }, []);

  useEffect(() => {
    const page = pageNumber ? parseInt(pageNumber) : 1;
    setCurrentReview(page);
  }, [pageNumber]);

  const paginate = (pageNumber: number) => {
    setCurrentReview(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const changePassword = async () => {
    try {
      await putRequest("/user", { newPassword }, headers);
      alert("Password changed successfully");
    } catch (err) {
      alert(err + ", password change failed");
      console.error(err);
    }
    setLoadingPwd(false);
  };

  const deleteUser = async () => {
    try {
      await deleteRequest("/user", headers);
      alert("User deleted successfully");
      localStorage.removeItem("authToken");
      navigate("/");
    } catch (err) {
      alert(err + ", user delete failed");
      console.error(err);
    }
  };

  const userReviews = user.reviews || [];

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
                <Text>{user.email! || ""}</Text>
                <Heading size="sm">Edit Password</Heading>
                <InputGroup>
                  <Input
                    placeholder="Enter your new password"
                    type="password"
                    onChange={(e) => setNewPassword(e.currentTarget.value)}
                  />
                  <InputRightElement width="5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={() => {
                        setLoadingPwd(true);
                        changePassword();
                      }}
                      isLoading={loadingPwd}
                    >
                      Submit
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <Heading size="sm">Delete User</Heading>
                <Button colorScheme="red" onClick={() => deleteModal.onOpen()}>
                  Delete
                </Button>
                <DeleteModal
                  isOpen={deleteModal.isOpen}
                  onClose={deleteModal.onClose}
                  header="Delete User Confirmation"
                  body="Are you sure you want to delete the user?"
                  deleteData={() => {
                    deleteUser();
                  }}
                />
              </VStack>
            </CardBody>
          </Card>
          <Flex justifyContent="flex-start" ml="16px" width="100%">
            <Heading size="lg">Your Reviews</Heading>
          </Flex>
          <Review
            reviews={currentReviews}
            loading={loadingReview}
            isEdit={true}
          />
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
