import React from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const donationChoices = ({ data, columns, searchInput, onSearchChange, onCardSelect, dummyBalance, dummyAccountNo }) => {




  return (
    <div className="summary-box">
    <div className="summary-box-content">
      <p className="box-text">Charity</p>
      <form className="charity-form">
        <div className="form-group">
          <label htmlFor="charityName">Charity*</label>
          <input type="text" id="charityName" placeholder="Enter Charity Name or Charity Registration Number" required className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount*</label>
          <input type="text" id="amount" placeholder="e.g. £5.00" required className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="specialInstructions">Special instructions</label>
          <textarea id="specialInstructions" className="form-control"></textarea>
        </div>
        <div className="form-check">
          <input type="checkbox" id="terms" required className="form-check-input" />
          <label htmlFor="terms" className="form-check-label">I agree to terms & conditions.</label>
        </div>
        <button type="submit" className="donate-button">Donate</button>
      </form>
    </div>
  </div>
  );
};

export default donationChoices;