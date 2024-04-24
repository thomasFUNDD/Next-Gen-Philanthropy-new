import TotalWidget from "../../Components/BATComponents/widget/TotalWidget";
import RevenueFlow from "../../Components/BATComponents/revenueFlow";
import ListTab from "../../Components/BATComponents/listTab";
import Wallet from "../../Components/BATComponents/wallet";
import "../../Components/assets/css/style.css";
import "../../assets/css/font-awesome-all.min.css";
import "../../app/index.css";
import moment from 'moment';
import { useDashboardState, useDashboardDispatch } from '../../Components/DashboardContext';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeFilter from "../../Components/BATComponents/forms/HomeFilter";
import StatementList from "../../Components/BATComponents/statements";

function Home() {
  const dashboardState = useDashboardState();
  const dashboardDispatch = useDashboardDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 20;
  const [filters, setFilters] = useState({
    description: '',
    dateRange: '',
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/getDashboardData', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (data['api/client/accounts/general'].error && data['api/client/accounts/general'].error.includes('401')) {
          navigate('/signin');
          return;
        }

        if (data['api/client/accounts/balances'].error && data['api/client/accounts/balances'].error.includes('401')) {
          navigate('/signin');
          return;
        }

        if (data['api/client/accounts/transactions/filtered'].error && data['api/client/accounts/transactions/filtered'].error.includes('401')) {
          navigate('/signin');
          return;
        }

        const transactions = data['api/client/accounts/transactions/filtered']['transactions per client'];
        const charityDetails = data['api/client/distributions/charities']['charity details'];
        const balance = data['api/client/accounts/balances']['balances'][0]['currentbalance'];
        const statementData = data['api/client/statements'];
        const standingOrders = data['api/webdata/standingorders/unprocessed']['standing orders'];
        const generalAccountData = data['api/client/accounts/general'];

        let runningBalance = balance;
        const formattedTransactions = transactions.map(txn => {
          const amount = parseFloat(txn.debit) || parseFloat(txn.credit) * -1;
          runningBalance += amount;
          return {
            date: txn.date,
            recipientDonor: txn.payment_reference || txn.dc_description,
            amount: `£${Math.abs(amount).toFixed(2)}`,
            balance: `£${runningBalance.toFixed(2)}`,
            category: txn.txncategory || txn.dc_description,
          };
        });

        const charityDataFormatted = charityDetails.filter(txn => txn.regchar !== 'private');

        dashboardDispatch({ type: 'SET_DASHBOARD_DATA', payload: formattedTransactions });
        dashboardDispatch({ type: 'SET_BALANCE', payload: balance });
        dashboardDispatch({ type: 'SET_CHARITY_DATA', payload: charityDataFormatted });
        dashboardDispatch({ type: 'SET_STATEMENT_DATA', payload: statementData });
        dashboardDispatch({ type: 'SET_STANDING_ORDERS', payload: standingOrders });
        dashboardDispatch({ type: 'SET_GENERAL_ACCOUNT_DATA', payload: generalAccountData });
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, [navigate, dashboardDispatch]);

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

  const descriptionOptions = [...new Set(dashboardState.dashboardData.map((txn) => txn.dc_description))];
  const dateRangeOptions = ["Last 7 Days", "Last 30 Days", "Last 90 Days"];

  const filteredTransactions = dashboardState.dashboardData.filter((txn) => {
    const descriptionMatch = !filters.description || txn.dc_description === filters.description;
    const dateRangeMatch = !filters.dateRange || (
      filters.dateRange === "Last 7 Days" && moment(txn.date).isBetween(moment().subtract(7, 'days'), moment(), null, '[]') ||
      filters.dateRange === "Last 30 Days" && moment(txn.date).isBetween(moment().subtract(30, 'days'), moment(), null, '[]') ||
      filters.dateRange === "Last 90 Days" && moment(txn.date).isBetween(moment().subtract(90, 'days'), moment(), null, '[]')
    );
    const searchMatch = !searchTerm || (
      (txn.recipientDonor && txn.recipientDonor.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (txn.dc_description && txn.dc_description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    return descriptionMatch && dateRangeMatch && searchMatch;
  });

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <main className="w-full px-6 pb-6 pt-[100px] sm:pt-[156px] xl:px-12 xl:pb-12">
      <div className="flex flex-col space-y-6 lg:flex-row lg:space-x-6 lg:space-y-0">
        <section className="mb-6 lg:mb-0 lg:w-2/3">
          <TotalWidget balance={dashboardState.balance} standingOrders={dashboardState.standingOrders} />
          <div className="mb-[24px] w-full">
            <RevenueFlow />
          </div>
          <div className="mb-4">
            <HomeFilter
              options={{
                descriptions: descriptionOptions,
                dateRanges: dateRangeOptions,
              }}
              onFilterChange={handleFilterChange}
              onSearch={handleSearch}
            />
          </div>
          <ListTab
            transactions={filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction).map(txn => ({
              ...txn,
              recipientDonor: txn.recipientDonor || txn.dc_description,
            }))}
            transactionsPerPage={transactionsPerPage}
            totalTransactions={filteredTransactions.length}
            paginate={paginate}
            currentPage={currentPage}
            filters={filters}
          />
        </section>
        <section className="w-full lg:w-1/3">
          <Wallet charityData={dashboardState.charityData} />
          <div className="mt-6">
            <StatementList statementData={dashboardState.statementData} />
          </div>
        </section>
      </div>
    </main>
  );
}

export default Home;