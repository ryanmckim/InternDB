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
import { postRequest } from "../../utils/apiClient";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPwd) {
      alert("Passwords do not match");
      return;
    }

    const headers = {
      "Content-Type": "application/json",
    };

    try {
      await postRequest("/auth/register", { email, password }, headers);
      navigate("/email-sent");
    } catch (err) {
      console.error("Registration failed", err);
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
          <Heading>Sign Up</Heading>
          <Box padding="10" shadow="0px 10px 13px -7px #000000" width="529px">
            <form onSubmit={handleRegister}>
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
                  <InputGroup>
                    <Input
                      id="confirm-pwd"
                      type={showConfirmPwd ? "text" : "password"}
                      placeholder="confirm password"
                      value={confirmPwd}
                      onChange={(e) => setConfirmPwd(e.currentTarget.value)}
                    />
                    <InputRightElement width="4.5rem">
                      <Button
                        h="1.75rem"
                        size="sm"
                        onClick={() => setShowConfirmPwd(!showConfirmPwd)}
                      >
                        {showConfirmPwd ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <Button type="submit" width="full" colorScheme="telegram">
                    Verify Email
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
