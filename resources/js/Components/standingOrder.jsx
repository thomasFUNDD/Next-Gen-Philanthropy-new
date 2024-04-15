import React, { useState } from 'react';
import { useDashboardState } from './DashboardContext';


const StandingOrder = () => {
  const dashboardState = useDashboardState();
  const { standingOrders, charityData } = dashboardState;
  const [activeTab, setActiveTab] = useState('active');

  console.log('Standing Orders:', standingOrders);
  console.log('Charity Data:', charityData);
  console.log('Dashboard State in StandingOrder:', dashboardState);

  const handleEdit = (orderId) => {
    console.log('Edit standing order:', orderId);
  };

  const handleDelete = (orderId) => {
    console.log('Delete standing order:', orderId);
  };

  const toggleStatus = (orderId, isActive) => {
    console.log(`Toggle status for order ${orderId} to ${isActive ? 'active' : 'inactive'}`);
  };

  const filteredStandingOrders = activeTab === 'active'
    ? standingOrders?.filter(order => order.processed === 'N')
    : standingOrders;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };

  return (
    <div className="standing-order-container">
      <div className="standing-order-header">
        <h2>Standing Orders</h2>
        <div>
          <button className="full-width-button active">
            <i className="fas fa-plus-circle"></i> Add New Standing Order
          </button>
        </div>
      </div>
      <div className="button-container">
  <button
    className={`full-width-button ${activeTab === 'inactive' ? 'active' : 'inactive'}`}
    onClick={() => setActiveTab('inactive')}
  >
    <i className="fas fa-minus-circle"></i> Inactive Standing Orders
  </button>
</div>
<div className="button-container">
  <button
    className={`full-width-button ${activeTab === 'active' ? 'active' : 'inactive'}`}
    onClick={() => setActiveTab('active')}
  >
    <i className="fas fa-minus-circle"></i> Active Standing Orders
  </button>
</div>
      <table className="standing-order-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Charity</th>
            <th>Account Number</th>
            <th>Amount</th>
            <th>Number of Payments</th>
            <th>Order Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStandingOrders && filteredStandingOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{charityData.find((charity) => charity.charityno === order.charityno)?.charity || 'Unknown'}</td>
              <td>{order.bnk_accountno}</td>
              <td>£{order.payments.toFixed(2)}</td>
              <td>{order.n_times}</td>
              <td>{formatDate(order.created)}</td>
              <td>
                <div className="action-buttons">
                  <button className="delete-button" style={{ backgroundColor: 'black', color: 'white' }} onClick={() => handleDelete(order.id)}>
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StandingOrder;