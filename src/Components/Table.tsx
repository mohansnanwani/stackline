import React, { useEffect, useState } from 'react';
import './Table.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store.ts';
import { setSalesData, sortSalesData } from '../salesSlice.ts';

interface SalesData {
  weekEnding: string;
  retailSales: number;
  wholesaleSales: number;
  unitsSold: number;
  retailerMargin: number;
}

const Table: React.FC = () => {
  const dispatch = useDispatch();
  const salesData = useSelector((state: RootState) => state.sales.salesData);
  const sortKey = useSelector((state: RootState) => state.sales.sortKey);
  const sortDirection = useSelector((state: RootState) => state.sales.sortDirection);

  
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5); // rows#

  useEffect(() => {
    // Mockup API call to fetch data. Can use asyncThunks, axios in Slices
    const fetchData = async () => {
      const response = await import('../data_2021.json');
      dispatch(setSalesData(response[0].sales));
    };

    fetchData();
  }, [dispatch]);

  const handleSort = (key: string) => {
    dispatch(sortSalesData(key));
  };

 
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = salesData.slice(indexOfFirstRow, indexOfLastRow);


  const handleNextPage = () => {
    if (currentPage < Math.ceil(salesData.length / rowsPerPage)) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <table className="sales-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('weekEnding')}>Week Ending</th>
            <th onClick={() => handleSort('retailSales')}>Retail Sales</th>
            <th onClick={() => handleSort('wholesaleSales')}>Wholesale Sales</th>
            <th onClick={() => handleSort('unitsSold')}>Units Sold</th>
            <th onClick={() => handleSort('retailerMargin')}>Retailer Margin</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((data, index) => (
            <tr key={index}>
              <td>{data.weekEnding}</td>
              <td>{data.retailSales}</td>
              <td>{data.wholesaleSales}</td>
              <td>{data.unitsSold}</td>
              <td>{data.retailerMargin}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Prev
        </button>
        {Array.from({ length: Math.ceil(salesData.length / rowsPerPage) }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageClick(index + 1)}
            className={index + 1 === currentPage ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(salesData.length / rowsPerPage)}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Table;
