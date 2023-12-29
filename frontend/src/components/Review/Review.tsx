import React from 'react';
import { Card, CardHeader, CardBody, Heading, Text, Center, Stack, StackDivider, Box } from '@chakra-ui/react';

interface ReviewProps {
  reviews: any,
  loading: boolean
}

export default function Review(props: ReviewProps) {  
  if (props.loading) {
    return <h2>Loading...</h2>;
  }

  return(
    <React.Fragment>
      <Center>
        <Box>
          {props.reviews.map((review: any) => (
            <Card boxShadow="0 3px 10px rgb(0 0 0 / 0.2)"
              bg="white"
              borderRadius="5px"
              width={500}
              margin="1rem">
              <CardHeader>
                <Heading size='md'>{review.positionTitle}</Heading>
              </CardHeader>
              <CardBody>
                <Stack divider={<StackDivider />} spacing='2'>
                  <Box>
                    <Heading size='xs' textTransform='uppercase'>Location</Heading>
                    <Text pt='2' fontSize='sm'>{review.location}</Text>
                  </Box>
                  <Box>
                    <Heading size='xs' textTransform='uppercase'>Salary</Heading>
                    <Text pt='2' fontSize='sm'>${review.salary} {review.currency}/hr</Text>
                  </Box>
                  <Box>
                    <Heading size='xs' textTransform='uppercase'>Date</Heading>
                    <Text pt='2' fontSize='sm'>{review.positionStartDate} to {review.positionEndDate}</Text>
                  </Box>
                  <Box>
                    <Heading size='xs' textTransform='uppercase'>Work Option</Heading>
                    <Text pt='2' fontSize='sm'>{review.workOption}</Text>
                  </Box>
                  <Box>
                    <Heading size='xs' textTransform='uppercase'>Comments</Heading>
                    <Text pt='2' fontSize='sm'>{review.comments}</Text>
                  </Box>
                </Stack>
              </CardBody>
            </Card>
          ))}
        </Box>
      </Center>
    </React.Fragment>
  )
}