import React from 'react';
import CharityForm from './CharityForm';
import { useDashboardState, useDashboardDispatch } from './DashboardContext';

const DonatePage = () => {
  const { charityData } = useDashboardState();

  return (
    <div className="page-content donate-page">
      <h1>Donate</h1>
      <div className="donate-content">
        <div className="donate-form" style={{ width: '100%' }}>
          <CharityForm charityData={charityData} longForm={true} />
        </div>
     
      </div>
    </div>
  );
};

export default DonatePage;