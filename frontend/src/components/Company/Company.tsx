import React from 'react';
import { Card, CardHeader, CardBody, Heading, Center, Stack, StackDivider, Box, HStack } from '@chakra-ui/react';

interface CompanyProps {
  company: any
}

export default function Company({ company }: CompanyProps) {  
  if (!company) {
    return null;
  }

  return(
    <React.Fragment>
      <Center>
        <Box>
        <Card
          boxShadow="0 3px 10px rgb(0 0 0 / 0.2)"
          bg="white"
          borderRadius="5px"
          width="100%"
          maxWidth="100%"
          margin="2rem">
            <CardHeader>
              <Heading size='lg' textAlign="center">{company.name}</Heading>
            </CardHeader>
            <CardBody>
              <Stack divider={<StackDivider />} spacing='2'>
                <Box>
                  <Heading size='md' textTransform='uppercase' textAlign="center">{company.numReviews} Reviews</Heading>
                </Box>
              </Stack>
            </CardBody>
          </Card>
        </Box>
      </Center>
    </React.Fragment>
  )
}
