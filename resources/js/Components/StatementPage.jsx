import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboardState } from './DashboardContext';
import axios from 'axios';

const StatementPage = () => {
  const navigate = useNavigate();
  const dashboardState = useDashboardState();
  const { statementData } = dashboardState;
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const statementsPerPage = 10;

  const fetchStatementPage = async (pageNumber) => {
    try {
      const response = await axios.post('/fetchStatements', { pageNumber }, { responseType: 'blob' });
      console.log('fetchStatementPage response:', response.data);
      if (response.data.error) {
        setError(response.data.error);
      } else {
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `statement_${pageNumber}.pdf`;
        link.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while fetching the statement.');
    }
  };

  const printStatementPage = async (pageNumber) => {
    try {
      const response = await axios.get(`/api/statements/${pageNumber}`, { responseType: 'blob' });
      console.log('printStatementPage response:', response.data);
      if (response.data.error) {
        setError(response.data.error);
      } else {
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const printWindow = window.open(url);
        if (printWindow) {
          printWindow.onload = function () {
            printWindow.print();
          };
        } else {
          const link = document.createElement('a');
          link.href = url;
          link.textContent = 'Open PDF';
          document.body.appendChild(link);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while fetching the statement for printing.');
    }
  };

  const indexOfLastStatement = currentPage * statementsPerPage;
  const indexOfFirstStatement = indexOfLastStatement - statementsPerPage;
  const currentStatements = statementData.slice(indexOfFirstStatement, indexOfLastStatement);
  const totalPages = Math.ceil(statementData.length / statementsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="main-content">
      <h2>Statements</h2>
      <table className="statement-table">
        <thead>
          <tr>
            <th>Statement No.</th>
            <th>Opening Bal</th>
            <th>Closing Bal</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Download</th>
            <th>Print</th>
          </tr>
        </thead>
        <tbody>
          {currentStatements.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.stmt_no}</td>
              <td>{transaction.stmt_balance}</td>
              <td>{transaction.stmt_closing_bal}</td>
              <td>{transaction.stmt_from_date}</td>
              <td>{transaction.stmt_to_date}</td>
              <td>
                <button
                  onClick={() => fetchStatementPage(transaction.stmt_pageno)}
                  className="statement-button"
                >
                  Download
                </button>
              </td>
              <td>
                <button
                  onClick={() => printStatementPage(transaction.stmt_pageno)}
                  className="statement-button"
                >
                  Print
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StatementPage;