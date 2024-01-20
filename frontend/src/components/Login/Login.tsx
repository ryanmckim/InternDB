import {
  Button,
  FormControl,
  VStack,
  Flex,
  Input,
  Box,
  Heading,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useState } from "react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <React.Fragment>
      <Flex
        width="100wh"
        height="100vh"
        justifyContent="center"
        alignItems="center"
      >
        <VStack>
          <Heading>Log in</Heading>
          <Box padding="10" shadow="0px 10px 13px -7px #000000" width="529px">
            <form>
              <FormControl>
                <VStack spacing={4}>
                  <Input type="email" placeholder="UBC email" />
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="password"
                    />
                    <InputRightElement width="4.5rem">
                      <Button
                        h="1.75rem"
                        size="sm"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <Button width="full" colorScheme="telegram">
                    Log in
                  </Button>
                </VStack>
              </FormControl>
            </form>
          </Box>
        </VStack>
      </Flex>
    </React.Fragment>
  );
}
