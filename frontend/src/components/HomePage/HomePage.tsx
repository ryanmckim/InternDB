import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Company from "../Company/Company";
import {
  Center,
  Heading,
  Box,
  Select,
  SimpleGrid,
  Flex,
  Input,
  VStack,
} from "@chakra-ui/react";
import CompanyPagination from "../Pagination/CompanyPagination";
import { getRequest } from "../../utils/apiClient";

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [currentCompany, setCurrentCompany] = useState(1);
  const [companyData, setCompanyData] = useState([]);
  const companiesPerPage = 24;
  const indexOfLastCompany = currentCompany * companiesPerPage;
  const indexOfFirstReview = indexOfLastCompany - companiesPerPage;
  const { pageNumber } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getRequest("/company")
      .then((data) => setCompanyData(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const page = pageNumber ? parseInt(pageNumber) : 1;
    setCurrentCompany(page);
  }, [pageNumber]);

  const paginate = (pageNumber: number) => {
    setCurrentCompany(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!pageNumber) {
    navigate("/page/1");
  }

  const currentCompanies = companyData.slice(
    indexOfFirstReview,
    indexOfLastCompany
  );

  return (
    <Flex direction="column" align="center" w="100%" px="4">
      <Center my="4">
        <Heading size="3xl">InternDB</Heading>
      </Center>

      <Center my="4">
        <VStack>
          <Box w="200px">
            <Select>
              <option>Alphabetical</option>
              <option>Highest Salary</option>
              <option>Most Reviews</option>
            </Select>
          </Box>
          <Input placeholder="Search for a company" />
        </VStack>
      </Center>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing="8" my="4">
        {currentCompanies.map((company, index) => (
          <Company key={index} company={company} />
        ))}
      </SimpleGrid>

      <Center my="4">
        <CompanyPagination
          companiesPerPage={companiesPerPage}
          totalCompanies={companyData.length}
          paginate={paginate}
          currentPage={currentCompany}
        />
      </Center>
    </Flex>
  );
}
