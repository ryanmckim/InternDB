import { Card, CardHeader, Heading, Text, CardFooter, Center, HStack } from '@chakra-ui/react'
import React, { useState } from 'react'

export default function Review(props: {positionTitle: string, location: string, salary: number, currency: string, positionStartDate: string, positionEndDate: string, workOption: string, comments: string}) {  
    return(
      <React.Fragment>
        <Center>    
            <Card boxShadow="0 3px 10px rgb(0 0 0 / 0.2)"
                  bg="white"
                  borderRadius="5px"
                  width={500}
                  margin="1rem"
                  alignItems='center'>
              <CardHeader>
                <Heading size='md'>
                  {props.positionTitle}
                </Heading>
              </CardHeader>
              <HStack>
                <Text>{props.location}</Text>
                <Text>${props.salary}/hour</Text>
              </HStack>
              <HStack>
                <Text>{props.positionStartDate} to {props.positionEndDate}</Text>
                <Text>{props.workOption}</Text>
              </HStack>
              <CardFooter>{props.comments}</CardFooter>
            </Card>
        </Center>
      </React.Fragment>
    )
}