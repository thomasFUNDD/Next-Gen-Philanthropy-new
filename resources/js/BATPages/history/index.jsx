// History.jsx
import React from 'react';

function History() {
  return (
    <main className="w-full min-h-screen bg-white flex items-center justify-center">
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Two-Factor Authentication</h2>
          <div className="mb-6">
            <p className="text-gray-600">
              We have sent a 7-digit verification code to your mobile phone.
            </p>
            <p className="text-gray-600">
              Please enter the code below to proceed.
            </p>
          </div>
          <div className="mb-6">
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter the 7-digit code"
              maxLength={7}
            />
          </div>
          <button className="bg-darkPurple text-white px-6 py-2 rounded-md hover:bg-darkPurple-600">
  Verify
</button>
        </div>
      </div>
    </main>
  );
}

export default History;