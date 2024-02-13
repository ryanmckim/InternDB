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
import { useNavigate } from "react-router-dom";
import { postRequest } from "../../utils/apiClient";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const response = await postRequest(
        "/auth/login",
        { email, password },
        headers
      );
      localStorage.setItem("authToken", response.token);
      navigate("/");
    } catch (err) {
      console.error("Login failed", err);
      alert(err);
    }
  };

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
            <form onSubmit={handleLogin}>
              <FormControl>
                <VStack spacing={4}>
                  <Input
                    id="email"
                    type="email"
                    placeholder="UBC email"
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                  />
                  <InputGroup>
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="password"
                      value={password}
                      onChange={(e) => setPassword(e.currentTarget.value)}
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
                  <Button type="submit" width="full" colorScheme="telegram">
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
