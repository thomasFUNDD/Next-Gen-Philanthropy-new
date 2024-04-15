import React, { createContext, useContext, useReducer } from 'react';

const DashboardStateContext = createContext();
const DashboardDispatchContext = createContext();

const dashboardReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DASHBOARD_DATA':
      return { ...state, dashboardData: action.payload };
    case 'SET_CHARITY_DATA':
      return { ...state, charityData: action.payload };
    case 'SET_BALANCE':
      return { ...state, balance: action.payload };

      case 'SET_STATEMENT_DATA':
        return { ...state, statementData: action.payload };
    default:
      return state;
  }
};

const DashboardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dashboardReducer, {
    dashboardData: [],
    charityData: [],
    statementData: [],
    balance: 0,
  });

  console.log('DashboardProvider state:', state);

  return (
    <DashboardStateContext.Provider value={state}>
      <DashboardDispatchContext.Provider value={dispatch}>
        {children}
      </DashboardDispatchContext.Provider>
    </DashboardStateContext.Provider>
  );
};

const useDashboardState = () => {
  const context = useContext(DashboardStateContext);
  if (context === undefined) {
    throw new Error('useDashboardState must be used within a DashboardProvider');
  }
  return context;
};

const useDashboardDispatch = () => {
  const context = useContext(DashboardDispatchContext);
  if (context === undefined) {
    throw new Error('useDashboardDispatch must be used within a DashboardProvider');
  }
  return context;
};

export { DashboardProvider, useDashboardState, useDashboardDispatch };