import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const UnusedVouchers = () => {
  const [vouchers, setVouchers] = useState([]);
  const [summary, setSummary] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/unused-vouchers');

        if (response.ok) {
          const data = await response.json();
          setVouchers(data.book_categories || []);
          setSummary(data.summary || {});
        } else {
          console.error('Error fetching data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Unused Vouchers</h2>
      <table id="unusedVouchersTable" className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Book Type</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Value</th>
            <th className="px-4 py-2">Count</th>
          </tr>
        </thead>
        <tbody>
          {vouchers.map((voucher) => (
            <tr key={voucher.bt_id}>
              <td className="border px-4 py-2">
                <FontAwesomeIcon icon={faBook} className="mr-2" />
                {voucher.bt_id}
              </td>
              <td className="border px-4 py-2">{voucher.bt_description}</td>
              <td className="border px-4 py-2">{voucher.bt_value}</td>
              <td className="border px-4 py-2">{voucher.count}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div id="vouchersUnused" className="mt-6">
        <h3 className="text-lg font-bold mb-2">
          <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
          Summary
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="font-bold">Outstanding:</span> {summary.outstanding}
          </div>
          <div>
            <span className="font-bold">Unused:</span> {summary.unused}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnusedVouchers;