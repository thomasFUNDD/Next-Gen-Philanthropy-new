import React, { useState, useEffect } from 'react';
import { useDashboardDispatch, useDashboardState } from './DashboardContext';
import axios from 'axios';
import moment from 'moment';

const TransactionsIn = () => {
  const { transactionsData } = useDashboardState();
  const dispatch = useDashboardDispatch();
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    processedValue: 'all',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  
  const createReceipt = async (id, amount, bnk_accountno, bnk_sortcode, charity, created) => {
    console.log('Transaction ID:', id);
    const response = await fetch('/create-receipt', {
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
            processed: filters.processedValue,
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
  }, [dispatch, filters]);

  const formatDate = (value) => {
    return new Date(value).toLocaleDateString('en-GB', { hour: '2-digit', minute: '2-digit' });
  };

  const formatAmount = (value) => {
    if (typeof value === 'number') {
      return `£${value.toFixed(2)}`;
    }
    return value;
  };

  const handleFilterChange = (e) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [e.target.name]: e.target.value,
    }));
  };

  const filterAndRedraw = () => {
    // Filter the transactions based on the selected date range
    const filteredTransactions = transactionsData.transactions.filter((transaction) => {
      const createdDate = moment(transaction.created);
      const startDate = moment(filters.startDate);
      const endDate = moment(filters.endDate).endOf('day');
      return createdDate.isBetween(startDate, endDate, null, '[]');
    });

    // Update the transactions data with the filtered transactions
    dispatch({
      type: 'SET_TRANSACTIONS_DATA',
      payload: {
        ...transactionsData,
        transactions: filteredTransactions,
      },
    });
  };
  const cancelTransaction = async (transactionId) => {
    try {
      alert("this");

      // Get CSRF token from meta tag
      const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

      // Prepare the headers and body for the fetch call
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken, // Include CSRF token in the request headers
        },
        body: JSON.stringify({ transactionId })
      };

      // Make an API call to cancel the transaction using fetch
      const response = await fetch('/make-email', requestOptions);
      const data = await response.json(); // Assuming the response is JSON

      console.log(data.message); // Log the response message

      // Remove the cancelled transaction from the transactions data
      const updatedTransactions = transactionsData.transactions.filter(
        (transaction) => transaction.id !== transactionId
      );

      dispatch({
        type: 'SET_TRANSACTIONS_DATA',
        payload: {
          ...transactionsData,
          transactions: updatedTransactions,
        },
      });
    } catch (error) {
      console.error('Error cancelling transaction:', error);
      // Handle the error, show an error message, etc.
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="page-heading">
        <h3>Transactions In</h3>
      </div>
      <div className="page-content">
        <div className="card">
          <div className="card-body">
            <div className="container">
              <div className="row mb-2">
                <div className="col-12">
                  <h5>Choose date range</h5>
                </div>
              </div>
              <div className="row align-items-center justify-content-between">
                <div className="col-5 col-md-5 pr-md-2">
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    className="form-control date-input"
                    placeholder="dd/mm/yyyy"
                    value={filters.startDate}
                    onChange={handleFilterChange}
                  />
                </div>
                <div className="col-auto text-center px-md-0">
                  <span>to</span>
                </div>
                <div className="col-5 col-md-5 pl-md-2">
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    className="form-control date-input"
                    placeholder="dd/mm/yyyy"
                    value={filters.endDate}
                    onChange={handleFilterChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12 mt-4 mb-4">
                  <button
                    type="button"
                    className="btn btn-primary w-100 w-md-auto"
                    onClick={filterAndRedraw}
                  >
                    Filter
                  </button>
                </div>
              </div>
            </div>

            <h4>Transactions</h4>
            <table className="table">
              <thead>
                <tr>
                  <th>Charity</th>
                  <th>Amount</th>
                  <th>Bank Account Number</th>
                  <th>Bank Sort Code</th>
                  <th>Created</th>
                  <th>Method</th>
                  <th>Payment Mode</th>
                  <th>Payment Date</th>
                  <th>Processed</th>
                  <th>Cancel Transaction</th>
                </tr>
              </thead>
              <tbody>
                {transactionsData.transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.charity}</td>
                    <td>{formatAmount(transaction.amount)}</td>
                    <td>{transaction.bnk_accountno}</td>
                    <td>{transaction.bnk_sortcode}</td>
                    <td>{formatDate(transaction.created)}</td>
                    <td>{transaction.method.toUpperCase()}</td>
                    <td>{transaction.paymentmode === 'pay' ? 'Paid' : transaction.paymentmode}</td>
                    <td>{formatDate(transaction.payon)}</td>
                    <td>{transaction.processed.toUpperCase()}</td>
                    <td>
    {['P', 'N', 'Y'].includes(transaction.processed.toUpperCase()) ? (
        <button onClick={() => createReceipt(
            transaction.id,
            formatAmount(transaction.amount),
            transaction.bnk_accountno,
            transaction.bnk_sortcode,
            transaction.charity,
            formatDate(transaction.created)
        )}>
            Create Receipt
        </button>
    ) : null}
</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsIn; 