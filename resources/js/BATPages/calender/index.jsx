import React, { useState } from 'react';
import { useDashboardState } from '../../Components/DashboardContext';
import CreateStandingOrderModal from "../../Components/BATComponents/standingOrder";

const StandingOrder = () => {
  const dashboardState = useDashboardState();
  const { standingOrders, charityData } = dashboardState;
  const [activeTab, setActiveTab] = useState('active');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  console.log('Standing Orders:', standingOrders);
  console.log('Charity Data:', charityData);
  console.log('Dashboard State in StandingOrder:', dashboardState);

  const handleDelete = (orderId) => {
    console.log('Delete standing order:', orderId);
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
    <div className="w-full xl:px-[48px] px-6 pb-6 xl:pb-[48px] sm:pt-[156px] pt-[100px]">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-darkPurple">Standing Orders</h2>
          <button
            className="bg-midPurple hover:bg-darkPurple text-white font-semibold py-2 px-4 rounded"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <i className="fas fa-plus-circle mr-2"></i> Add New Standing Order
          </button>
        </div>
        <div className="flex justify-center mb-6">
          <button
            className={`mr-4 py-2 px-4 rounded ${
              activeTab === 'inactive' ? 'bg-babyBlue-mid text-white' : 'bg-babyBlue-light text-babyBlue-dark'
            }`}
            onClick={() => setActiveTab('inactive')}
          >
            <i className="fas fa-minus-circle mr-2"></i> Inactive Standing Orders
          </button>
          <button
            className={`py-2 px-4 rounded ${
              activeTab === 'active' ? 'bg-midPurple text-white' : 'bg-lightPurple text-midPurple'
            }`}
            onClick={() => setActiveTab('active')}
          >
            <i className="fas fa-check-circle mr-2"></i> Active Standing Orders
          </button>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-lightPurple">
              <th className="px-4 py-2 text-midPurple">ID</th>
              <th className="px-4 py-2 text-midPurple">Charity</th>
              <th className="px-4 py-2 text-midPurple">Account Number</th>
              <th className="px-4 py-2 text-midPurple">Amount</th>
              <th className="px-4 py-2 text-midPurple">Number of Payments</th>
              <th className="px-4 py-2 text-midPurple">Order Created</th>
              <th className="px-4 py-2 text-midPurple">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStandingOrders && filteredStandingOrders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="px-4 py-2">{order.id}</td>
                <td className="px-4 py-2">{charityData.find((charity) => charity.charityno === order.charityno)?.charity || 'Unknown'}</td>
                <td className="px-4 py-2">{order.bnk_accountno}</td>
                <td className="px-4 py-2">£{order.payments.toFixed(2)}</td>
                <td className="px-4 py-2">{order.n_times}</td>
                <td className="px-4 py-2">{formatDate(order.created)}</td>
                <td className="px-4 py-2">
                  <button
                    className="bg-error-200 hover:bg-error-300 text-white font-semibold py-1 px-2 rounded"
                    onClick={() => handleDelete(order.id)}
                  >
                                        <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <CreateStandingOrderModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};

export default StandingOrder;