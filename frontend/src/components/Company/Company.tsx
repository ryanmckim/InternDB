import { Card, Heading, Center, SimpleGrid, Text, Box, Select, HStack} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import './company.scss'
import Review from '../Review/Review';

export default function Company() {
    const [company, setCompany] = useState([]);
    const [currency, setCurrency] = useState("CAD");

    const changeCurrency = () => {
      setCurrency(currency === "CAD" ? "USD" : "CAD");
    }

    const reviewData = [
      {positionTitle: "Software Engineer Intern", location: "Vancouver, BC, Canada", salary: 30, currency: "USD", positionStartDate: "09-08-2023", positionEndDate: "10-08-2024", workOption: "Hybrid", comments: "Hello"},
      {positionTitle: "Software Engineer Intern", location: "Vancouver, BC, Canada", salary: 30, currency: "USD", positionStartDate: "09-08-2023", positionEndDate: "10-08-2024", workOption: "Hybrid", comments: "Hello"},
      {positionTitle: "Software Engineer Intern", location: "Vancouver, BC, Canada", salary: 30, currency: "USD", positionStartDate: "09-08-2023", positionEndDate: "10-08-2024", workOption: "Hybrid", comments: "Hello"},
      {positionTitle: "Software Engineer Intern", location: "Vancouver, BC, Canada", salary: 30, currency: "USD", positionStartDate: "09-08-2023", positionEndDate: "10-08-2024", workOption: "Hybrid", comments: "Hello"},
      {positionTitle: "Software Engineer Intern", location: "Vancouver, BC, Canada", salary: 30, currency: "USD", positionStartDate: "09-08-2023", positionEndDate: "10-08-2024", workOption: "Hybrid", comments: "Hello"},
      {positionTitle: "Software Engineer Intern", location: "Vancouver, BC, Canada", salary: 30, currency: "USD", positionStartDate: "09-08-2023", positionEndDate: "10-08-2024", workOption: "Hybrid", comments: "Hello"}
  ]

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
          <div>
            <Card boxShadow="0 3px 10px rgb(0 0 0 / 0.2)"
                  bg="white"
                  borderRadius="5px"
                  maxWidth={600}
                  padding="3rem"
                  margin="1rem">
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
            <HStack spacing="0" justifyContent="flex-end">
              <Box w='200px'>
                <Select>
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
          </div>
        </Center>
        <button className='add-review-button'>+</button>
        {reviewData.map((review, index) => (
          <Review positionTitle={review.positionTitle} location={review.location} salary={review.salary} currency={review.currency} positionStartDate={review.positionStartDate} positionEndDate={review.positionEndDate} workOption={review.workOption} comments={review.comments}/>
        ))}
      </React.Fragment>
    )
}