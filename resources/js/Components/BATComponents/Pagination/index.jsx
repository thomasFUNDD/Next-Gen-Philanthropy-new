import PaginationV1 from "./PaginationV1";
import PaginationV2 from "./PaginationV2";
import ProtoTypes from "prop-types";

function Pagination({ transactionsPerPage, totalTransactions, paginate, currentPage }) {
  return (
    <div className="pagination-content w-full">
      <div className="flex w-full items-center justify-center lg:justify-between">
        <PaginationV1
          transactionsPerPage={transactionsPerPage}
          totalTransactions={totalTransactions}
          paginate={paginate}
          currentPage={currentPage}
        />
        <PaginationV2
          transactionsPerPage={transactionsPerPage}
          totalTransactions={totalTransactions}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

Pagination.propTypes = {
  transactionsPerPage: ProtoTypes.number.isRequired,
  totalTransactions: ProtoTypes.number.isRequired,
  paginate: ProtoTypes.func.isRequired,
  currentPage: ProtoTypes.number.isRequired,
};

export default Pagination;