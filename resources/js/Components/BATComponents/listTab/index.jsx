import PropTypes from "prop-types";
import Pagination from "../Pagination";

function ListTab({
  transactions = [],
  transactionsPerPage,
  totalTransactions,
  paginate,
  currentPage,
  filters,
}) {
  return (
    <div className="w-full rounded-lg bg-white px-[24px] py-[20px] dark:bg-darkblack-600">
      <div className="flex flex-col space-y-5">
        <div className="table-content w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                <th className="px-6 py-5 text-left">Date</th>
                <th className="px-6 py-5 text-left">Recipient/Donor</th>
                <th className="px-6 py-5 text-right">Amount</th>
                <th className="px-6 py-5 text-right">Balance</th>
                <th className="px-6 py-5 text-right">Category</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-5 text-center text-gray-500">
                    No transactions to display
                  </td>
                </tr>
              ) : (
                transactions.map((txn, index) => (
                  <tr
                    key={index}
                    className="border-b border-bgray-300 dark:border-darkblack-400"
                  >
                    <td className="px-6 py-5">{txn.date}</td>
                    <td className="px-6 py-5">{txn.recipientDonor}</td>
                    <td className="px-6 py-5 text-right">{txn.amount}</td>
                    <td className="px-6 py-5 text-right">{txn.balance}</td>
                    <td className="px-6 py-5 text-right">{txn.category}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {transactionsPerPage && totalTransactions && paginate && (
          <Pagination
            transactionsPerPage={transactionsPerPage}
            totalTransactions={totalTransactions}
            paginate={paginate}
            currentPage={currentPage}
          />
        )}
      </div>
    </div>
  );
}

ListTab.propTypes = {
  transactions: PropTypes.array,
  transactionsPerPage: PropTypes.number,
  totalTransactions: PropTypes.number,
  paginate: PropTypes.func,
  currentPage: PropTypes.number,
  filters: PropTypes.object,
};

export default ListTab;