import { Card, CardHeader, CardBody, Heading, Center, SimpleGrid, Text, Box} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

export default function Company() {
    const [company, setCompany] = useState([])

    useEffect(() => {
      const fetchCompanies = async () => {
        try {
          const res = await fetch(`http://localhost:8000/api/v1/company/`);
          const jsonRes = await res.json();
          setCompany(jsonRes);
        } catch (error) {
          console.error("Error fetching company data:", error);
        }
      };
      fetchCompanies();
    }, []);

    return (
      <React.Fragment>
        <Center>
          {/* <Card boxShadow="0 3px 10px rgb(0 0 0 / 0.2)"
                bg="white"
                borderRadius="5px"
                maxWidth={600}> */}
          <Card>
            <SimpleGrid columns={3} spacing={4}>
              <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                <Heading fontSize="60px" fontFamily="arial">SAP</Heading>
              </Box>
              <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                <Text textAlign="center" fontFamily="arial" fontWeight="bold">Avg CAD Salary: $20.00/hr</Text>
              </Box>
              <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                <Text fontFamily="arial" fontWeight="bold">21 Reviews</Text>
              </Box>
            </SimpleGrid>
          </Card>
        </Center>
      </React.Fragment>
    )
}