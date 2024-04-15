import React, { useMemo } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const SummaryTable = ({ data, columns, searchInput, onSearchChange, onCardSelect, balance, dummyAccountNo, selectedCard }) => {
  const filteredData = useMemo(() => {
    if (!searchInput) {
      return data[selectedCard];
    }
    const lowercasedSearchInput = searchInput.toLowerCase();
    return data[selectedCard].filter(row =>
      Object.values(row).some(value =>
        String(value).toLowerCase().includes(lowercasedSearchInput)
      )
    );
  }, [data, searchInput, selectedCard]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: filteredData,
      initialState: { pageIndex: 0, pageSize: 20 },
      sortTypes: {
        alphanumeric: (rowA, rowB, columnId, desc) => {
          let a = rowA.values[columnId];
          let b = rowB.values[columnId];
          if (a > 0 && b < 0) return 1;
          if (a < 0 && b > 0) return -1;
          if (a > b) return 1;
          if (a < b) return -1;
          return 0;
        },
      },
    },
    useSortBy,
    usePagination
  );

  const SortIndicator = ({ isSorted, isSortedDesc }) => {
    if (!isSorted) {
      return <span style={{ color: '#a98e63' }}></span>;
    }
    return isSortedDesc ? (
      <i className="fas fa-sort-down" style={{ color: '#a98e63' }}></i>
    ) : (
      <i className="fas fa-sort-up" style={{ color: '#a98e63' }}></i>
    );
  };

  return (
    <div className="table-responsive">


      <div className="table-padding" style={{ padding: '15px' }}>
        <div className="controls-container">
          <input
            type="text"
            placeholder="Search..."
            value={searchInput}
            onChange={onSearchChange}
            className="search-bar"
          />
          <select className="category-select">
            <option value="">All</option>
            {/* Add other category options */}
          </select>
        </div>

        <div className="balance-info">
          <span>Account Balance: {balance}</span>
          <span>Account No: {dummyAccountNo}</span>
        </div>

        <table {...getTableProps()} className="display dataTable">
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())} className="custom-th">
                    {column.render('Header')}
                    <SortIndicator isSorted={column.isSorted} isSortedDesc={column.isSortedDesc} />
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()} className="custom-td">
                      {cell.render('Cell')}
                    </td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="pagination">
          <div className="pagination-info">
            Showing {pageIndex * pageSize + 1} to {Math.min((pageIndex + 1) * pageSize, filteredData.length)} of {filteredData.length} entries
          </div>
          <div className="pagination-nav">
            <button className="page-link" onClick={() => previousPage()} disabled={!canPreviousPage}>
              Previous
            </button>
            {pageOptions.map((pageNumber) => (
              <button
                key={pageNumber}
                className={`page-link${pageIndex === pageNumber ? ' active' : ''}`}
                onClick={() => gotoPage(pageNumber)}
              >
                {pageNumber + 1}
              </button>
            ))}
            <button className="page-link" onClick={() => nextPage()} disabled={!canNextPage}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryTable;