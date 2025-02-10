import React, { useState } from 'react';
import { DataTableProps } from '../types';

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  const formatNumber = (num: number) => num.toFixed(2);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div data-testid="data-table">
      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Volume</th>
            <th>Close</th>
            <th>Open</th>
            <th>High</th>
            <th>Low</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((item, index) => (
            <tr key={index} data-testid="table-row">
              <td>{item.timestamp}</td>
              <td>{item.volume}</td>
              <td>{formatNumber(item.close)}</td>
              <td>{formatNumber(item.open)}</td>
              <td>{formatNumber(item.high)}</td>
              <td>{formatNumber(item.low)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {currentPage > 1 && (
          <button 
            data-testid="prev-button"
            onClick={() => paginate(currentPage - 1)}
          >
            &lt;
          </button>
        )}
        {currentPage < Math.ceil(data.length / rowsPerPage) && (
          <button 
            data-testid="next-button"
            onClick={() => paginate(currentPage + 1)}
          >
            &gt;
          </button>
        )}
      </div>
    </div>
  );
};

export default DataTable;
