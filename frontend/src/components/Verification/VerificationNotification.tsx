import { Heading, Flex, VStack } from "@chakra-ui/react";

export default function VerificationNotification() {
  return (
    <Flex
      width="100wh"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <VStack>
        <Heading>Email has been sent to your inbox</Heading>
        <text>Please click the link in the email to verify your account</text>
      </VStack>
    </Flex>
  );
}
