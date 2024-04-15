import React, { useState, useMemo, useCallback, useEffect } from 'react';
import Downshift from 'downshift';

const CharityForm = React.memo(({ charityData = [], longForm }) => {
  console.log('Charity Data received in CharityForm:', charityData);

  const [selectedCharity, setSelectedCharity] = useState('');
  const [selectedBankAccount, setSelectedBankAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(true);
  const [transferDate, setTransferDate] = useState('');
  const [standingOrder, setStandingOrder] = useState(false);
  const [paymentFrequency, setPaymentFrequency] = useState('');
  const [numberOfPayments, setNumberOfPayments] = useState('');
  const [paymentReference, setPaymentReference] = useState('');
  const [email, setEmail] = useState('');
  const [anonymous, setAnonymous] = useState('no');
  const [donorPaysFee, setDonorPaysFee] = useState(false);

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().slice(0, 10);
    setTransferDate(formattedDate);
  }, []);

  const uniqueCharityOptions = useMemo(() => {
    console.log('Generating unique charity options...');
    const options = new Map();
    charityData.forEach(item => {
      const key = item.charity;
      if (!options.has(key)) {
        options.set(key, key + (item.registrationNumber ? ` (${item.registrationNumber})` : ''));
      }
    });
    return Array.from(options.values());
  }, [charityData]);

  console.log('Unique Charity Options:', uniqueCharityOptions);

  const bankAccounts = useMemo(() => charityData.filter(
    (item) => item.charity === selectedCharity
  ), [charityData, selectedCharity]);

  console.log('Bank Accounts:', bankAccounts);

  const handleCharityChange = useCallback((selectedItem) => {
    console.log('Selected Charity:', selectedItem);
    setSelectedCharity(selectedItem);
    setSelectedBankAccount('');
  }, []);

  const handleBankAccountChange = useCallback((selectedItem) => {
    console.log('Selected Bank Account:', selectedItem);
    setSelectedBankAccount(selectedItem);
  }, []);

  const handleAmountChange = useCallback((event) => {
    setAmount(event.target.value);
  }, []);

  const handleSpecialInstructionsChange = useCallback((event) => {
    setSpecialInstructions(event.target.value);
  }, []);

  const handleAgreeToTermsChange = useCallback((event) => {
    setAgreeToTerms(event.target.checked);
  }, []);

  const handleTransferDateChange = useCallback((event) => {
    setTransferDate(event.target.value);
  }, []);

  const handleStandingOrderChange = useCallback((event) => {
    setStandingOrder(event.target.checked);
  }, []);

  const handlePaymentFrequencyChange = useCallback((event) => {
    setPaymentFrequency(event.target.value);
  }, []);

  const handleNumberOfPaymentsChange = useCallback((event) => {
    setNumberOfPayments(event.target.value);
  }, []);

  const handlePaymentReferenceChange = useCallback((event) => {
    setPaymentReference(event.target.value);
  }, []);

  const handleEmailChange = useCallback((event) => {
    setEmail(event.target.value);
  }, []);

  const handleAnonymousChange = useCallback((event) => {
    setAnonymous(event.target.value);
  }, []);

  const handleDonorPaysFeeChange = useCallback((event) => {
    setDonorPaysFee(event.target.checked);
  }, []);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    console.log('Form submitted:', {
      selectedCharity,
      amount,
      specialInstructions,
      agreeToTerms,
      selectedBankAccount,
      transferDate,
      standingOrder,
      paymentFrequency,
      numberOfPayments,
      paymentReference,
      email,
      anonymous,
      donorPaysFee,
    });
  }, [
    selectedCharity,
    amount,
    specialInstructions,
    agreeToTerms,
    selectedBankAccount,
    transferDate,
    standingOrder,
    paymentFrequency,
    numberOfPayments,
    paymentReference,
    email,
    anonymous,
    donorPaysFee,
  ]);

  const getFilteredItems = useCallback((items, inputValue) =>
    inputValue ? items.filter(item => item.toLowerCase().includes(inputValue.toLowerCase())) : items
  , []);


  return (
    <div className="summary-box-content">
      <form className="charity-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="charityName">Charity*</label>
          <Downshift
            id="charityName"
            onChange={handleCharityChange}
            itemToString={(item) => (item ? item : '')}
          >
            {({
              getInputProps,
              getItemProps,
              getMenuProps,
              isOpen,
              inputValue,
              highlightedIndex,
              openMenu,
            }) => (
              <div className="dropdown-container">
                <input
                  {...getInputProps({
                    placeholder: 'Select a charity',
                    className: 'dropdown-input',
                    onFocus: openMenu,
                  })}
                />
                <ul {...getMenuProps()} className="dropdown-menu" style={{ display: isOpen ? 'block' : 'none' }}>
                  {getFilteredItems(uniqueCharityOptions, inputValue).map((item, index) => (
                    <li
                      {...getItemProps({
                        key: item,
                        index,
                        item,
                        style: {
                          backgroundColor: highlightedIndex === index ? '#a98e63' : 'white',
                          color: highlightedIndex === index ? 'white' : 'black',
                          padding: '8px',
                          cursor: 'pointer',
                        },
                      })}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Downshift>
        </div>
        {selectedCharity && (
          <div className="form-group">
            <label htmlFor="bankAccount">Bank Account*</label>
            <Downshift
              id="bankAccount"
              onChange={handleBankAccountChange}
              itemToString={(item) => (item ? item : '')}
            >
              {({
                getInputProps,
                getItemProps,
                getMenuProps,
                isOpen,
                inputValue,
                highlightedIndex,
                openMenu,
              }) => (
                <div className="dropdown-container">
                  <input
                    {...getInputProps({
                      placeholder: 'Select a bank account',
                      className: 'dropdown-input',
                      onFocus: openMenu,
                    })}
                  />
                  <ul {...getMenuProps()} className="dropdown-menu" style={{ display: isOpen ? 'block' : 'none' }}>
                    {getFilteredItems(bankAccounts.map(account => `${account.bnk_sort_code} - ${account.bnk_account_no}`), inputValue).map((item, index) => (
                      <li
                        {...getItemProps({
                          key: item,
                          index,
                          item,
                          style: {
                            backgroundColor: highlightedIndex === index ? '#a98e63' : 'white',
                            color: highlightedIndex === index ? 'white' : 'black',
                            padding: '8px',
                            cursor: 'pointer',
                          },
                        })}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Downshift>
          </div>
        )}
        <div className="form-group">
          <label htmlFor="amount">Amount*</label>
          <input
            type="text"
            id="amount"
            placeholder="e.g., £5.00"
            value={amount}
            onChange={handleAmountChange}
            required
            className="form-control"
          />
        </div>
        {longForm && (
          <>
            <div className="form-group">
              <label htmlFor="transferDate">Transfer Date*</label>
              <input
                type="date"
                id="transferDate"
                value={transferDate}
                onChange={handleTransferDateChange}
                required
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="standingOrderCheckbox">Create Standing Order?</label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="standingOrderCheckbox"
                  checked={standingOrder}
                  onChange={handleStandingOrderChange}
                />
                <label className="form-check-label" htmlFor="standingOrderCheckbox">
                  Yes
                </label>
              </div>
            </div>
            {standingOrder && (
              <>
                <div className="form-group">
                  <label htmlFor="paymentFrequency">Payment Frequency*</label>
                  <select
                    className="form-control"
                    id="paymentFrequency"
                    value={paymentFrequency}
                    onChange={handlePaymentFrequencyChange}
                    required
                  >
                    <option value="">Select frequency</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="annually">Annually</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="numberOfPayments">Number of Payments*</label>
                  <input
                    type="number"
                    id="numberOfPayments"
                    value={numberOfPayments}
                    onChange={handleNumberOfPaymentsChange}
                    required
                    className="form-control"
                  />
                </div>
              </>
            )}
            <div className="form-group">
              <label htmlFor="paymentReference">Payment Reference</label>
              <input
                type="text"
                id="paymentReference"
                value={paymentReference}
                onChange={handlePaymentReferenceChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="anonymous">Anonymous</label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="anonymous"
                  id="anonymousYes"
                  value="yes"
                  checked={anonymous === 'yes'}
                  onChange={handleAnonymousChange}
                />
                <label className="form-check-label" htmlFor="anonymousYes">
                  Yes
                </label>
                <input
                  className="form-check-input"
                  type="radio"
                  name="anonymous"
                  id="anonymousNo"
                  value="no"
                  checked={anonymous === 'no'}
                  onChange={handleAnonymousChange}
                />
                <label className="form-check-label" htmlFor="anonymousNo">
                  No
                </label>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="feeResponsibility">Who pays the fee?</label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="donorPaysFee"
                  checked={donorPaysFee}
                  onChange={handleDonorPaysFeeChange}
                />
                <label className="form-check-label" htmlFor="donorPaysFee">
                  Donor pays fee
                </label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="recipientPaysFee"
                  checked={!donorPaysFee}
                  onChange={() => setDonorPaysFee(false)}
                />
                <label className="form-check-label" htmlFor="recipientPaysFee">
                  Recipient pays fee
                </label>
              </div>
            </div>
          </>
        )}
        <div className="form-group">
          <label htmlFor="specialInstructions">Special instructions</label>
          <textarea
            id="specialInstructions"
            value={specialInstructions}
            onChange={handleSpecialInstructionsChange}
            className="form-control"
          ></textarea>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            id="terms"
            checked={agreeToTerms}
            onChange={handleAgreeToTermsChange}
            required
            className="form-check-input"
          />
          <label htmlFor="terms" className="form-check-label">
            I agree to terms & conditions.
          </label>
        </div>
        <button
          type="submit"
          className="donate-button"
          style={{ backgroundColor: agreeToTerms ? '' : 'black' }}
          disabled={!agreeToTerms}
        >
          Donate
        </button>
      </form>
    </div>
  );
});

export default CharityForm;