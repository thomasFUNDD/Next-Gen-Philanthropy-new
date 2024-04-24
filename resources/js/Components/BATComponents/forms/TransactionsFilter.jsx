import { useState } from "react";
import PropTypes from "prop-types";

function TransactionsFilter({ options, onFilterChange }) {
  const [selectedCharity, setSelectedCharity] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState("");

  const handleCharityChange = (e) => {
    const charity = e.target.value;
    setSelectedCharity(charity);
    onFilterChange("charity", charity);
  };

  const handleDateRangeChange = (e) => {
    const dateRange = e.target.value;
    setSelectedDateRange(dateRange);
    onFilterChange("dateRange", dateRange);
  };

  return (
    <div className="flex space-x-4">
      <div>
        <label htmlFor="charityFilter">Charity:</label>
        <select
          id="charityFilter"
          value={selectedCharity}
          onChange={handleCharityChange}
        >
          <option value="">All</option>
          {options.charities.map((charity) => (
            <option key={charity} value={charity}>
              {charity}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="dateRangeFilter">Date Range:</label>
        <select
          id="dateRangeFilter"
          value={selectedDateRange}
          onChange={handleDateRangeChange}
        >
          <option value="">All</option>
          {options.dateRanges.map((dateRange) => (
            <option key={dateRange} value={dateRange}>
              {dateRange}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

TransactionsFilter.propTypes = {
  options: PropTypes.shape({
    charities: PropTypes.arrayOf(PropTypes.string),
    dateRanges: PropTypes.arrayOf(PropTypes.string),
  }),
  onFilterChange: PropTypes.func.isRequired,
};

export default TransactionsFilter;