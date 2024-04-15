import React, { useState, useEffect, useRef } from 'react';
import SummaryTable from './SummaryTable';
import { useNavigate } from 'react-router-dom';
import CharityForm from './CharityForm';
import { useDashboardState, useDashboardDispatch } from './DashboardContext';
import StatementPage from './StatementPage';

const SummaryPage = () => {
  const dashboardState = useDashboardState();
  const { dashboardData, charityData, balance, statementData, standingOrders, generalAccountData } = dashboardState;
  const dispatch = useDashboardDispatch();
  const [searchInput, setSearchInput] = useState('');
  const [selectedCard, setSelectedCard] = useState('transactions');
  const navigate = useNavigate();
  const dummyAccountNo = "146";
  const isLoginChecked = useRef(false);

  const columns = {
    transactions: [
      {
        Header: 'Date',
        accessor: 'date',
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'Debit',
        accessor: 'debit',
      },
    
      {
        Header: 'Running Balance',
        accessor: 'runningBalance',
        Cell: ({ value }) => value.toFixed(2),
      },
    ],
    statements: [
      {
        Header: 'Date',
        accessor: 'date',
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'Debit',
        accessor: 'debit',
      },
     ,
      {
        Header: 'Running Balance',
        accessor: 'runningBalance',
        Cell: ({ value }) => value.toFixed(2),
      },
    ],
  };

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleCardSelect = (cardType) => {
    setSelectedCard(cardType);
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      if (isLoginChecked.current) return;
      try {
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

        const response = await fetch('/checkIsLogin', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'X-CSRF-TOKEN': csrfToken,
          },
        });

        const data = await response.json();
        console.log('Login check response:', data);

        if (!response.ok) {
          // Session expired or user is not logged in, clear session data and redirect to login page
          sessionStorage.removeItem('token');
          navigate('/');
        }
        isLoginChecked.current = true;
      } catch (error) {
        console.error('Failed to check login status:', error);
      }
    };

    checkLoginStatus();
  }, [navigate]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/getDashboardData', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 401) {
          // Unauthorized access, clear session data and redirect to login page
          sessionStorage.removeItem('token');
          navigate('/');
          return;
        }

        const data = await response.json();
        console.log('Dashboard data:', data);

        console.log("response", data);

        const transactions = data['api/client/accounts/transactions/filtered']['transactions per client'];
        const charityDetails = data['api/client/distributions/charities']['charity details'];
        const balance = data['api/client/accounts/balances']['balances'][0]['currentbalance'];
        const statementData = data['api/client/statements'];
        const standingOrders = data['api/webdata/standingorders/unprocessed']['standing orders'];
        const generalAccountData = data['api/client/accounts/general'];

        console.log("test", standingOrders);

        console.log('Transactions:', transactions);
        console.log('Charity Details:', charityDetails);
        console.log('Balance:', balance);
        console.log('Statement Data:', statementData);
        console.log('Standing Orders:', standingOrders);
        console.log('General Account Data:', generalAccountData);

        let runningBalance = balance;

        const formattedTransactions = transactions.map(txn => {
          runningBalance += parseFloat(txn.credit) - parseFloat(txn.debit);
          return {
            date: txn.date,
            description: txn.dc_description,
            debit: txn.debit,
            credit: txn.credit,
            runningBalance: runningBalance,
          };
        });

        console.log('Formatted Transactions:', formattedTransactions);

        const charityDataFormatted = charityDetails.filter(txn => txn.regchar !== 'private');

        console.log('Formatted Charity Data:', charityDataFormatted);

        dispatch({ type: 'SET_DASHBOARD_DATA', payload: formattedTransactions });
        dispatch({ type: 'SET_BALANCE', payload: balance });
        dispatch({ type: 'SET_CHARITY_DATA', payload: charityDataFormatted });
        dispatch({ type: 'SET_STATEMENT_DATA', payload: statementData });
        dispatch({ type: 'SET_STANDING_ORDERS', payload: standingOrders });
        dispatch({ type: 'SET_GENERAL_ACCOUNT_DATA', payload: generalAccountData });

        console.log('Updated Dashboard State:', dashboardState);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, [navigate, dispatch]);

  return (
    <div className="main-content">
      <div className="user-info">
        <h4 className="username">
          <i className="fas fa-user"></i> Hello: Alta M Fogel
        </h4>
        <span className="login-time">
          <i className="fas fa-clock"></i> Last Logged In: 21-03-2024 02:42:27
        </span>
      </div>

      <div className="box-container">
        <div className="box">
          <div className="box-content">
            <i className="fas fa-coins balance-icon fa-sm"></i>
            <p className="box-text">Account Balance</p>
            <h2 className="box-value">£{balance}</h2>
          </div>
        </div>
        <div className="box">
          <div className="box-content">
            <i className="fas fa-donate donation-icon fa-sm"></i>
            <p className="box-text">Donations Today</p>
            <h2 className="box-value">£0.00</h2>
          </div>
        </div>
        <div className="box">
          <div className="box-content">
            <i className="fas fa-donate total-icon fa-sm"></i>
            <p className="box-text">Total Donations</p>
            <h2 className="box-value">£7,108.66</h2>
          </div>
        </div>
        <div className="box">
          <div className="box-content">
            <i className="fas fa-file-invoice-dollar voucher-icon fa-sm"></i>
            <p className="box-text">Vouchers Held</p>
            <h2 className="box-value">48</h2>
          </div>
        </div>
        <div className="box">
          <div className="box-content">
            <i className="fas fa-calendar standing-order-icon fa-sm"></i>
            <p className="box-text">Standing Orders</p>
            <h2 className="box-value">0</h2>
          </div>
        </div>
      </div>

      <div className="table-and-cards-container">
        <div className="table-container">
          <div className="table-responsive">
            <div className="button-row">
              <div
                onClick={() => handleCardSelect('transactions')}
                className={`button-card ${selectedCard === 'transactions' ? 'active' : ''}`}
              >
                <i className="fas fa-exchange-alt"></i> Transactions
              </div>
              <div
                onClick={() => handleCardSelect('statements')}
                className={`button-card ${selectedCard === 'statements' ? 'active' : ''}`}
              >
                <i className="fas fa-file-alt"></i> Statements
              </div>
            </div>
          </div>

          {selectedCard === 'transactions' ? (
            <SummaryTable
              data={{
                transactions: dashboardData,
                statements: [], // Pass an empty array for statements data
              }}
              columns={columns[selectedCard]}
              searchInput={searchInput}
              onSearchChange={handleSearchChange}
              onCardSelect={handleCardSelect}
              balance={balance}
              dummyAccountNo={dummyAccountNo}
              selectedCard={selectedCard}
            />
          ) : (
            <StatementPage statementData={statementData} balance={balance} />
          )}
        </div>

        <div className="three-boxes-container">
          <div className="summary-box">
            <div className="summary-box-content">
              <p className="box-text">Recent Activity</p>
              <ul className="recent-activity-list">
                <li className="activity-item">
                  <i className="fas fa-credit-card activity-icon"></i>
                  <span className="activity-text">Cardholder Account Creation, 11/03/2024, 09:33:22</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="summary-box">
            <div className="summary-box-content">
              <p className="box-text">Search Transactions</p>
              <form className="search-transactions-form">
                <input
                  type="text"
                  placeholder="Search by charity name, registration num, voucher number or keyword"
                  className="search-input"
                />
                <button type="submit" className="search-button">
                  Search
                </button>
              </form>
            </div>
          </div>
          <div className="summary-box">
            <CharityForm charityData={charityData} longForm={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryPage;