import { Card, Heading, Center, SimpleGrid, Text, Box, Select, HStack} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import './company.scss'

export default function Company() {
    const [company, setCompany] = useState([]);
    const [currency, setCurrency] = useState("CAD");

    const changeCurrency = () => {
      setCurrency(currency === "CAD" ? "USD" : "CAD");
    }

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
          <Card boxShadow="0 3px 10px rgb(0 0 0 / 0.2)"
                bg="white"
                borderRadius="5px"
                maxWidth={600}
                padding="3rem"
                margin="1rem">
          {/* <Card> */}
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
        <HStack>
          <Box w='200px'>
            <Select placeholder='Sort by'>
              <option>Most Recent</option>
              <option>Least Recent</option>
              <option>Highest salary</option>
              <option>Lowest salary</option>
            </Select>
          </Box>
          <Box textAlign="center" p={10}>
            <div className='toggle-button-group' onClick={changeCurrency}>
              <div className='toggle-button' style={{backgroundColor: currency === "CAD" ? '#3498db' : '#fff'}}>
                <h1 className='toggle-button-text' style={{color: currency === "CAD" ? '#fff' : '#3498db' }}>CAD</h1>
              </div>
              <div className='toggle-button' style={{backgroundColor: currency === "USD" ? '#3498db' : '#fff'}}>
                <h1 className='toggle-button-text' style={{color: currency === "USD" ? '#fff' : '#3498db' }}>USD</h1>
              </div>
            </div>
          </Box>
        </HStack>
      </React.Fragment>
    )
}