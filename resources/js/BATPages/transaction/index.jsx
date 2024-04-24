// History.jsx
import { useDashboardState, useDashboardDispatch } from '../../Components/DashboardContext';
import React from 'react';
import StatementList from "../../Components/BATComponents/statements";

function History() {
  const dashboardState = useDashboardState();
  const { statementData } = dashboardState;

  return (
    <main className="w-full min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <StatementList statementData={statementData} />
      </div>
    </main>
  );
}

export default History;