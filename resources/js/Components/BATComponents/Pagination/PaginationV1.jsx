import { useState } from "react";
import ProtoTypes from "prop-types";

function PaginationV1({ transactionsPerPage, totalTransactions, paginate, currentPage }) {
  const [active, setActive] = useState(false);

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalTransactions / transactionsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex items-center space-x-4">
      <span className="text-sm font-semibold text-midPurple">
        Show result:
      </span>
      <div className="relative">
        <button
          aria-label="none"
          onClick={() => setActive(!active)}
          type="button"
          className="flex items-center space-x-6 rounded-lg border border-lightPurple px-2.5 py-[14px] dark:border-darkPurple"
        >
          <span className="text-sm font-semibold text-darkPurple">
            {transactionsPerPage}
          </span>
          <span>
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.03516 6.03271L8.03516 10.0327L12.0352 6.03271"
                stroke="#8b5cf6"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>

        <div
          id="result-filter"
          style={{ display: active ? "block" : "none" }}
          className="absolute right-0 top-14 z-10 hidden w-full overflow-hidden rounded-lg bg-white shadow-lg"
        >
          <ul>
            {pageNumbers.map((number) => (
              <li
                key={number}
                onClick={() => {
                  paginate(number);
                  setActive(false);
                }}
                className={`cursor-pointer px-5 py-2 text-sm font-medium hover:bg-lightPurple ${
                  currentPage === number ? "bg-lightPurple text-darkPurple" : "text-midPurple"
                }`}
              >
                {number}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

PaginationV1.propTypes = {
  transactionsPerPage: ProtoTypes.number.isRequired,
  totalTransactions: ProtoTypes.number.isRequired,
  paginate: ProtoTypes.func.isRequired,
  currentPage: ProtoTypes.number.isRequired,
};

export default PaginationV1;