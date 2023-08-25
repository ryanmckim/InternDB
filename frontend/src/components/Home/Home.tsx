import React from 'react'
import { Card, Input, Heading, Center, SimpleGrid, Text, Box, Select, HStack, VStack} from '@chakra-ui/react'
import './home.scss'

export default function Home() {
    const cardData = [
        {title: "SAP", reviews: 21},
        {title: "SAP", reviews: 21},
        {title: "SAP", reviews: 21},
        {title: "SAP", reviews: 21},
        {title: "SAP", reviews: 21},
        {title: "SAP", reviews: 21},
        {title: "SAP", reviews: 21},
        {title: "SAP", reviews: 21},
        {title: "SAP", reviews: 21},
        {title: "SAP", reviews: 21},
    ]

    return(
        <React.Fragment>
            <Box>
                <VStack>
                    <Heading alignItems='center' marginTop={10}>InternDB</Heading>
                    <Input size='md' placeholder='Company Name' width='450px' margin={10}></Input>
                </VStack>
            </Box>
            <SimpleGrid columns={3} minChildWidth='300px' spacing='40px' marginLeft={50} marginRight={50}>
                {cardData.map((card, index) => (
                    <Card boxShadow="0 3px 10px rgb(0 0 0 / 0.2)"
                    bg="white"
                    borderRadius="5px"
                    maxWidth={300}
                    padding="3rem"
                    margin="1rem">
                    <SimpleGrid columns={1}>
                        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                            <Heading size='lg' textAlign="center">{card.title}</Heading>
                            <Text>{card.reviews} Reviews</Text>
                        </Box>
                    </SimpleGrid>
                </Card>
                ))}
            </SimpleGrid>
        </React.Fragment>
    )
}