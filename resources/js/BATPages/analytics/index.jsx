import { useDashboardState, useDashboardDispatch } from '../../Components/DashboardContext';
import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import Pagination from "../../Components/BATComponents/Pagination";
import Search from "../../Components/BATComponents/forms/Search";
import TransactionsFilter from "../../Components/BATComponents/forms/TransactionsFilter";

function Transaction() {
  const { transactionsData } = useDashboardState();
  const dispatch = useDashboardDispatch();
  const [filters, setFilters] = useState({
    charity: '',
    dateRange: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 20;
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  const createReceipt = async (id, amount, bnk_accountno, bnk_sortcode, charity, created) => {
    console.log('Transaction ID:', id);
    const response = await fetch('/api/create-receipt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
      },
      body: JSON.stringify({
        transaction: {
          id,
          amount,
          bnk_accountno,
          bnk_sortcode,
          charity,
          created,
        },
      }),
    });

    if (response.ok) {
      const arrayBuffer = await response.arrayBuffer();
      const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      console.error('Failed to create receipt');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/transactions', {
          params: {
            accountno: '146',
            processed: 'all',
          },
        });

        console.log('API response:', response.data);
        console.log('Donations data:', response.data.donations);

        if (
          response.data &&
          response.data.transactions &&
          Array.isArray(response.data.transactions["nvts "]) &&
          response.data.donations &&
          Array.isArray(response.data.donations.donations)
        ) {
          dispatch({
            type: 'SET_TRANSACTIONS_DATA',
            payload: {
              transactions: response.data.transactions["nvts "],
              donations: response.data.donations.donations,
            },
          });
        } else {
          throw new Error('Invalid API response format');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching transactions data:', error);
        setError('Failed to fetch transactions data');
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const formatDate = (value) => {
    return new Date(value).toLocaleDateString('en-GB', { hour: '2-digit', minute: '2-digit' });
  };

  const formatAmount = (value) => {
    if (typeof value === 'number') {
      return `£${value.toFixed(2)}`;
    }
    return value;
  };

  const handleFilterChange = (filterKey, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: value,
    }));
    setCurrentPage(1);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      if (sortOrder === 'asc') {
        setSortOrder('desc');
      } else if (sortOrder === 'desc') {
        setSortColumn(null);
        setSortOrder('asc');
      }
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const charityOptions = [...new Set(transactionsData.transactions.map((txn) => txn.charity))];
  const dateRangeOptions = ["Last 7 Days", "Last 30 Days", "Last 90 Days"];

  const filteredTransactions = transactionsData.transactions
    .filter((transaction) => {
      const charityMatch = !filters.charity || transaction.charity === filters.charity;
      const dateRangeMatch = !filters.dateRange || (
        filters.dateRange === "Last 7 Days" && moment(transaction.created).isBetween(moment().subtract(7, 'days'), moment(), null, '[]') ||
        filters.dateRange === "Last 30 Days" && moment(transaction.created).isBetween(moment().subtract(30, 'days'), moment(), null, '[]') ||
        filters.dateRange === "Last 90 Days" && moment(transaction.created).isBetween(moment().subtract(90, 'days'), moment(), null, '[]')
      );
      const searchMatch = !searchTerm || transaction.charity.toLowerCase().includes(searchTerm.toLowerCase());
      return charityMatch && dateRangeMatch && searchMatch;
    })
    .sort((a, b) => {
      if (sortColumn) {
        const columnA = a[sortColumn];
        const columnB = b[sortColumn];

        if (typeof columnA === 'string' && typeof columnB === 'string') {
          return sortOrder === 'asc'
            ? columnA.localeCompare(columnB)
            : columnB.localeCompare(columnA);
        } else if (typeof columnA === 'number' && typeof columnB === 'number') {
          return sortOrder === 'asc' ? columnA - columnB : columnB - columnA;
        } else {
          return 0;
        }
      }
      return 0;
    });

  // Calculate the index range for the current page
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-full px-6 pb-6 pt-[100px] sm:pt-[156px] xl:px-12 xl:pb-12">
      <div className="flex flex-col space-y-5">
        <div className="flex h-[56px] w-full space-x-4">
          <Search searchTerm={searchTerm} onSearch={handleSearch} />
          <TransactionsFilter
            options={{
              charities: charityOptions,
              dateRanges: dateRangeOptions,
            }}
            onFilterChange={handleFilterChange}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <colgroup>
              <col className="w-1/6" />
              <col className="w-1/12" />
              <col className="w-1/12" />
              <col className="w-1/12" />
              <col className="w-1/6" />
              <col className="w-1/12" />
              <col className="w-1/12" />
              <col className="w-1/6" />
              <col className="w-1/12" />
              <col className="w-1/6" />
            </colgroup>
            <thead className="hidden md:table-header-group">
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                {['charity', 'amount', 'bnk_accountno', 'bnk_sortcode', 'created', 'method', 'paymentmode', 'payon', 'processed'].map((column) => (
                  <th
                    key={column}
                    className="py-3 px-6 text-left cursor-pointer"
                    onClick={() => handleSort(column)}
                  >
                    {column.charAt(0).toUpperCase() + column.slice(1).replace(/_/g, ' ')}
                    {sortColumn === column && (
                      <span className="ml-2 text-lightPurple">
                        {sortOrder === 'asc' ? '▲' : '▼'}
                      </span>
                    )}
                  </th>
                ))}
                <th className="py-3 px-6 text-center">Receipt</th>
              </tr>
            </thead>
            <tbody className="md:table-row-group">
              {currentTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{transaction.charity}</td>
                  <td className="py-3 px-6 text-right">{formatAmount(transaction.amount)}</td>
                  <td className="py-3 px-6 text-left">{transaction.bnk_accountno}</td>
                  <td className="py-3 px-6 text-left">{transaction.bnk_sortcode}</td>
                  <td className="py-3 px-6 text-left">{formatDate(transaction.created)}</td>
                  <td className="py-3 px-6 text-left">{transaction.method.toUpperCase()}</td>
                  <td className="py-3 px-6 text-left">{transaction.paymentmode === 'pay' ? 'Paid' : transaction.paymentmode}</td>
                  <td className="py-3 px-6 text-left">{formatDate(transaction.payon)}</td>
                  <td className="py-3 px-6 text-left">{transaction.processed.toUpperCase()}</td>
                  <td className="py-3 px-6 text-center">
                    {['P', 'N', 'Y'].includes(transaction.processed.toUpperCase()) ? (
                      <button
                        className="bg-midPurple text-white font-bold py-2 px-4 rounded hover:bg-darkPurple"
                        onClick={() => createReceipt(
                          transaction.id,
                          formatAmount(transaction.amount),
                          transaction.bnk_accountno,
                          transaction.bnk_sortcode,
                          transaction.charity,
                          formatDate(transaction.created)
                        )}
                      >
                        Create
                      </button>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          transactionsPerPage={transactionsPerPage}
          totalTransactions={filteredTransactions.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

export default Transaction;