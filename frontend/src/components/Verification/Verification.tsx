import { Button, Heading, VStack, Flex } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { getRequest } from "../../utils/apiClient";

export default function Verification() {
  const { token } = useParams();
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await getRequest(`/auth/verify/${token}`);
      navigate("/");
    } catch (err) {
      console.error("Verification failed: ", err);
      alert(err);
    }
  };

  return (
    <Flex
      width="100wh"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <VStack>
        <Heading>Click the button below to verify your email</Heading>
        <Button onClick={() => handleClick()} colorScheme="telegram">
          Verify and Login
        </Button>
      </VStack>
    </Flex>
  );
}
