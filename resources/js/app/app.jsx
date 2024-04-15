import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DashboardProvider } from '../Components/DashboardContext';
import Navbar from '../Components/Navbar.jsx';
import LandingPage from '../Components/LandingPage';
import SummaryPage from '../Components/SummaryPage';
import DonatePage from '../Components/DonatePage';
import OrderBooks from '../Components/OrderBooks';
import ContactUs from '../Components/ContactUs';
import StatementPage from '../Components/StatementPage';
import StandingOrder from '../Components/standingOrder';
import TransactionsIn from '../Components/transactionsIn'; // Import TransactionsIn component
import TransactionsOut from '../Components/transactionsOut'; // Import TransactionsOut component
import OrderCard from '../Components/OrderCard';
const App = () => {
  return (
    <Router>
      <DashboardProvider>
        <div className="flex">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/*" element={
              <div id="navBar" className="layout-container mobile-hide navbar-hidden" style={{ display: 'flex' }}>
                <nav className="navbar">
                  <Navbar />
                </nav>
                <div className="main-content flex-1">
                  <Routes>
                    <Route path="summary" element={<SummaryPage />} />
                    <Route path="donate" element={<DonatePage />} />
                    <Route path="orderBooks" element={<OrderBooks />} />
                    <Route path="contactUs" element={<ContactUs />} />
                    <Route path="statements" element={<StatementPage />} />
                    <Route path="standingOrder" element={<StandingOrder />} />
                    <Route path="transactionsIn" element={<TransactionsIn />} /> {/* Add TransactionsIn route */}
                    <Route path="transactionsOut" element={<TransactionsOut />} /> {/* Add TransactionsOut route */}
                    <Route path="donationsIn" element={<TransactionsIn />} /> {/* Add TransactionsOut route */}
                    <Route path="orderCard" element={<OrderCard/>} />
                    {/* Add other routes here */}
                  </Routes>
                </div>
              </div>
            } />
          </Routes>
        </div>
      </DashboardProvider>
    </Router>
  );
};

createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);