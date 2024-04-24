import { useState } from "react";
import PropTypes from "prop-types";

function HomeFilter({ options, onFilterChange, onSearch }) {
  const [selectedDescription, setSelectedDescription] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleDescriptionChange = (e) => {
    const description = e.target.value;
    setSelectedDescription(description);
    onFilterChange("description", description);
  };

  const handleDateRangeChange = (e) => {
    const dateRange = e.target.value;
    setSelectedDateRange(dateRange);
    onFilterChange("dateRange", dateRange);
  };

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
    onSearch(searchValue);
  };

  return (
    <div className="flex space-x-4 items-center">
      <div className="flex-1">
        <label htmlFor="searchInput" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <input
            id="searchInput"
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Search by description or reference"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div>
        <label htmlFor="descriptionFilter" className="sr-only">
          Description
        </label>
        <select
          id="descriptionFilter"
          value={selectedDescription}
          onChange={handleDescriptionChange}
          className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">All Descriptions</option>
          {options.descriptions.map((description) => (
            <option key={description} value={description}>
              {description}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="dateRangeFilter" className="sr-only">
          Date Range
        </label>
        <select
          id="dateRangeFilter"
          value={selectedDateRange}
          onChange={handleDateRangeChange}
          className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">All Date Ranges</option>
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

HomeFilter.propTypes = {
  options: PropTypes.shape({
    descriptions: PropTypes.arrayOf(PropTypes.string),
    dateRanges: PropTypes.arrayOf(PropTypes.string),
  }),
  onFilterChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default HomeFilter;