import React, { createContext, useContext, useReducer, useEffect } from 'react';

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
    case 'SET_STANDING_ORDERS':
      return { ...state, standingOrders: action.payload };
    case 'SET_TRANSACTIONS_DATA':
      return {
        ...state,
        transactionsData: {
          transactions: action.payload.transactions,
          donations: action.payload.donations,
        },
      };
    case 'SET_GENERAL_ACCOUNT_DATA':
      return { ...state, generalAccountData: action.payload };
    default:
      return state;
  }
};

const DashboardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    dashboardReducer,
    {
      dashboardData: [],
      charityData: [],
      statementData: [],
      balance: 0,
      standingOrders: [],
      transactionsData: {
        transactions: [],
        donations: [],
      },
      generalAccountData: {},
    },
    () => {
      // Retrieve initial state from local storage if available
      const storedState = localStorage.getItem('dashboardState');
      return storedState
        ? JSON.parse(storedState)
        : {
            dashboardData: [],
            charityData: [],
            statementData: [],
            balance: 0,
            standingOrders: [],
            transactionsData: {
              transactions: [],
              donations: [],
            },
            generalAccountData: {},
          };
    }
  );

  useEffect(() => {
    // Store the updated state in local storage whenever it changes
    localStorage.setItem('dashboardState', JSON.stringify(state));
  }, [state]);

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