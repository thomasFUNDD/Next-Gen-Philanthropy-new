import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboardState, useDashboardDispatch } from '../../Components/DashboardContext';

function Users() {
  const dashboardState = useDashboardState();
  const { generalAccountData } = dashboardState;
  const [oldEmail, setOldEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [confirmNewEmail, setConfirmNewEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [flashMessage, setFlashMessage] = useState(null);
  const [enableDonationsViaSMS, setEnableDonationsViaSMS] = useState(false);
  const [enableVoucherOrdersViaSMS, setEnableVoucherOrdersViaSMS] = useState(false);
  const [enableAccountManagementViaSMS, setEnableAccountManagementViaSMS] = useState(false);
  const navigate = useNavigate();

  const changeEmail = async () => {
    if (newEmail !== confirmNewEmail) {
      setFlashMessage({ type: 'danger', message: 'New emails do not match' });
      return;
    }

    try {
      const response = await fetch('/api/change-email', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          old_email: oldEmail,
          new_email: newEmail,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setFlashMessage({ type: 'success', message: data.message });
      } else {
        const errorData = await response.json();
        setFlashMessage({ type: 'danger', message: errorData.error });
      }
    } catch (error) {
      console.error('Error:', error);
      setFlashMessage({ type: 'danger', message: 'An error occurred while changing the email' });
    }
  };

  const changePassword = async () => {
    if (newPassword !== confirmPassword) {
      setFlashMessage({ type: 'danger', message: 'Failure to change Password. Confirm password does not match new password' });
      return;
    }

    const vaccountno = generalAccountData?.general?.[0]?.vaccountno;

    try {
      const response = await fetch('/api/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          old_password: oldPassword,
          new_password: newPassword,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setFlashMessage({ type: 'success', message: data.message });
        writeActivityLog(vaccountno, 'Password successfully changed');
      } else {
        const errorData = await response.json();
        setFlashMessage({ type: 'danger', message: errorData.error });
        writeActivityLog(vaccountno, `Failure to change Password. Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setFlashMessage({ type: 'danger', message: 'An error occurred while changing the password' });
    }
  };

  const writeActivityLog = async (vaccountno, message) => {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp},Account: ${vaccountno},"${message}"`;

    try {
      await fetch('/api/write-activity-log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ logMessage }),
      });
    } catch (error) {
      console.error('Error writing activity log:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', {
        method: 'POST',
      });
      navigate('/signin');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <main className="w-full xl:px-[48px] px-6 pb-6 xl:pb-[48px] sm:pt-[156px] pt-[100px] dark:bg-darkblack-700">
      <div className="flex 2xl:flex-row 2xl:space-x-11 flex-col space-y-20">
        <div className="2xl:flex-1 w-full">
          <div id="pageHeading" className="mb-8">
            <h3 className="text-2xl font-bold">Profile</h3>
            {flashMessage && (
              <div id="flashMessage" className={`mt-4 p-4 rounded ${flashMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {flashMessage.message}
              </div>
            )}
          </div>
          <div className="space-y-8">
            <section>
              <div className="bg-white shadow rounded-lg p-6">
                <h4 className="text-lg font-semibold mb-4">My Details</h4>
                <div className="space-y-4">
                  <input
                    type="text"
                    id="firstName"
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="First Name"
                    value={generalAccountData?.general?.[0]?.firstname || ''}
                    readOnly
                  />
                  <input
                    type="text"
                    id="lastName"
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Last Name"
                    value={generalAccountData?.general?.[0]?.lastname || ''}
                    readOnly
                  />
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Email"
                    value={generalAccountData?.general?.[0]?.em_address || ''}
                    readOnly
                  />
                </div>
              </div>
            </section>
            <section>
              <div className="bg-white shadow rounded-lg p-6">
                <h4 className="text-lg font-semibold mb-4">Manage Secret Code for Access Website by SMS</h4>
                <div className="space-y-4">
                  <input
                    type="text"
                    id="secretCode"
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="******"
                    disabled
                  />
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="enableDonationsViaSMS"
                      className="form-checkbox h-5 w-5 text-midPurple"
                      checked={enableDonationsViaSMS}
                      onChange={(e) => setEnableDonationsViaSMS(e.target.checked)}
                    />
                    <label htmlFor="enableDonationsViaSMS" className="ml-2 block text-sm text-gray-900">
                      Enable Donations via SMS
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="enableVoucherOrdersViaSMS"
                      className="form-checkbox h-5 w-5 text-midPurple"
                      checked={enableVoucherOrdersViaSMS}
                      onChange={(e) => setEnableVoucherOrdersViaSMS(e.target.checked)}
                    />
                    <label htmlFor="enableVoucherOrdersViaSMS" className="ml-2 block text-sm text-gray-900">
                      Enable Voucher Orders via SMS
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="enableAccountManagementViaSMS"
                      className="form-checkbox h-5 w-5 text-midPurple"
                      checked={enableAccountManagementViaSMS}
                      onChange={(e) => setEnableAccountManagementViaSMS(e.target.checked)}
                    />
                    <label htmlFor="enableAccountManagementViaSMS" className="ml-2 block text-sm text-gray-900">
                      Enable Account Management via SMS
                    </label>
                  </div>
                </div>
              </div>
            </section>
            <section>
              <div className="bg-white shadow rounded-lg p-6">
                <h4 className="text-lg font-semibold mb-4">Change My Password</h4>
                <div className="space-y-4">
                  <input
                    type="password"
                    id="oldPassword"
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Old Password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                  <input
                    type="password"
                    id="newPassword"
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <input
                    type="password"
                    id="confirmPassword"
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className="mt-6 text-center">
                  <button
                    id="changePasswordBtn"
                    className="bg-midPurple hover:bg-darkPurple text-white font-bold py-2 px-4 rounded"
                    onClick={changePassword}
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </section>
            <section>
              <div className="bg-white shadow rounded-lg p-6">
                <h4 className="text-lg font-semibold mb-4">Change My Email</h4>
                <div className="space-y-4">
                  <input
                    type="email"
                    id="oldEmail"
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Old Email"
                    value={oldEmail}
                    onChange={(e) => setOldEmail(e.target.value)}
                  />
                  <input
                    type="email"
                    id="newEmail"
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="New Email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                  />
                  <input
                    type="email"
                    id="confirmNewEmail"
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Confirm New Email"
                    value={confirmNewEmail}
                    onChange={(e) => setConfirmNewEmail(e.target.value)}
                  />
                </div>
                <div className="mt-6 text-center">
                  <button
                    id="changeEmailBtn"
                    className="bg-midPurple hover:bg-darkPurple text-white font-bold py-2 px-4 rounded"
                    onClick={changeEmail}
                  >
                    Change Email
                  </button>
                </div>
              </div>
            </section>
          </div>
          <div className="mt-8 text-center">
            <button
              id="changePasswordViaForgotPasswordBtn"
              className="bg-midPurple hover:bg-darkPurple text-white font-bold py-2 px-4 rounded"
              onClick={handleLogout}
            >
              Change Password via Forgot Password
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Users;