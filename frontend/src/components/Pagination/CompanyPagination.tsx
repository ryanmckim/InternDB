import { useState } from 'react'
import './pagination.scss'

interface PaginationProps {
    companiesPerPage: number,
    totalCompanies: number,
    paginate: any
}

export default function CompanyPagination (props: PaginationProps) {
  const pageNumbers = [];
  const [activePage, setActivePage] = useState(1);

  for (let i = 1; i <= Math.ceil(props.totalCompanies / props.companiesPerPage); i++) {
    pageNumbers.push(i);
  }

  const listItems = pageNumbers.map(number => (
      <li className={`pagination ${activePage === number ? 'active' : ''}`} key={number}>
        <a style={{
            backgroundColor: activePage === number ? '#4CAF50' : 'transparent',
            color: activePage === number ? 'white' : 'black',
            borderRadius: '5px',
            cursor: 'pointer'
      }} onClick={() => {props.paginate(number); setActivePage(number);}}>
          {number}
        </a>
      </li>
    )
  )

  return (
    <nav>
      <ul>
        {listItems}
      </ul>
    </nav>
  );
};
