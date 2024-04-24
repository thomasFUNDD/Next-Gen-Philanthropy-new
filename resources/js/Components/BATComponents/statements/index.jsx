// StatementList.jsx
import React, { useState } from 'react';
import axios from 'axios';

const StatementList = ({ statementData }) => {
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const statementsPerPage = 10;
  const [showModal, setShowModal] = useState(false);

  const fetchStatementPage = async (pageNumber) => {
    try {
      const response = await axios.post('/fetchStatements', { pageNumber }, { responseType: 'blob' });
      console.log('fetchStatementPage response:', response.data);
      if (response.status === 200 || response.status === 201) {
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `statement_${pageNumber}.pdf`;
        link.click();
        window.URL.revokeObjectURL(url);
      } else {
        setError('An error occurred while fetching the statement.');
        setShowModal(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while fetching the statement.');
      setShowModal(true);
    }
  };

  const printStatementPage = async (pageNumber) => {
    try {
      const response = await axios.get(`/api/statements/${pageNumber}`, { responseType: 'blob' });
      console.log('printStatementPage response:', response.data);
      if (response.status === 200 || response.status === 201) {
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
      } else {
        setError('An error occurred while fetching the statement for printing.');
        setShowModal(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while fetching the statement for printing.');
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setError(null);
  };

  const indexOfLastStatement = currentPage * statementsPerPage;
  const indexOfFirstStatement = indexOfLastStatement - statementsPerPage;
  const currentStatements = statementData.slice(indexOfFirstStatement, indexOfLastStatement);
  const totalPages = Math.ceil(statementData.length / statementsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="statement-list bg-white p-6 w-full">
      <h2 className="text-2xl font-bold mb-4 text-darkPurple">Statements</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-midPurple text-white">
              <th className="py-2 px-4">Statement No.</th>
              <th className="py-2 px-4">Opening Bal</th>
              <th className="py-2 px-4">Closing Bal</th>
              <th className="py-2 px-4">Start Date</th>
              <th className="py-2 px-4">End Date</th>
              <th className="py-2 px-4">Download</th>
              <th className="py-2 px-4">Print</th>
            </tr>
          </thead>
          <tbody>
            {currentStatements.map((transaction, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                <td className="py-2 px-4">{transaction.stmt_no}</td>
                <td className="py-2 px-4">{transaction.stmt_balance}</td>
                <td className="py-2 px-4">{transaction.stmt_closing_bal}</td>
                <td className="py-2 px-4">{transaction.stmt_from_date}</td>
                <td className="py-2 px-4">{transaction.stmt_to_date}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => fetchStatementPage(transaction.stmt_pageno)}
                    className="bg-darkPurple text-white px-4 py-2 rounded hover:bg-midPurple"
                  >
                    Download
                  </button>
                </td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => printStatementPage(transaction.stmt_pageno)}
                    className="bg-darkPurple text-white px-4 py-2 rounded hover:bg-midPurple"
                  >
                    Print
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-darkPurple text-white px-4 py-2 rounded hover:bg-midPurple disabled:bg-lightPurple"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`${
              currentPage === index + 1
                ? 'bg-midPurple text-white'
                : 'bg-darkPurple text-white hover:bg-midPurple'
            } px-4 py-2 rounded ml-2`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-darkPurple text-white px-4 py-2 rounded hover:bg-midPurple disabled:bg-lightPurple ml-2"
        >
          Next
        </button>
      </div>
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Error</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{error}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatementList;