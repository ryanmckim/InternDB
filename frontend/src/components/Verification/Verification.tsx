import { Button, Heading, VStack, Flex } from "@chakra-ui/react";

export default function Verification() {
  return (
    <Flex
      width="100wh"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <VStack>
        <Heading>Click the button below to verify your email</Heading>
        <Button colorScheme="telegram">Verify and Login</Button>
      </VStack>
    </Flex>
  );
}
