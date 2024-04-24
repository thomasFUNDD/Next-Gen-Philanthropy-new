import ProtoTypes from "prop-types";

function PaginationV2({ transactionsPerPage, totalTransactions, paginate, currentPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalTransactions / transactionsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex items-center space-x-5" style={{ overflowX: "scroll" }}>
      <button
        aria-label="none"
        type="button"
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className="disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span>
          <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.7217 5.03271L7.72168 10.0327L12.7217 15.0327"
              stroke="#8b5cf6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      <div className="flex items-center">
        {pageNumbers.map((number) => (
          <button
            key={number}
            aria-label="none"
            type="button"
            onClick={() => paginate(number)}
            className={`rounded-lg px-4 py-1.5 text-xs font-bold transition duration-300 ease-in-out lg:px-6 lg:py-2.5 lg:text-sm ${
              currentPage === number
                ? "bg-babyBlue-mid text-babyBlue-dark"
                : "text-midPurple hover:bg-babyBlue-light hover:text-babyBlue-dark"
            }`}
          >
            {number}
          </button>
        ))}
      </div>
      <button
        aria-label="none"
        type="button"
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === pageNumbers.length}
        className="disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span>
          <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.72168 5.03271L12.7217 10.0327L7.72168 15.0327"
              stroke="#8b5cf6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
    </div>
  );
}

PaginationV2.propTypes = {
  transactionsPerPage: ProtoTypes.number.isRequired,
  totalTransactions: ProtoTypes.number.isRequired,
  paginate: ProtoTypes.func.isRequired,
  currentPage: ProtoTypes.number.isRequired,
};

export default PaginationV2;