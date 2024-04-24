import React, { useState, useMemo, useCallback } from "react";
import Downshift from "downshift";
import { FixedSizeList as List } from "react-window";
import debounce from "lodash/debounce";
import { useDashboardState } from '../../DashboardContext';

function CreateStandingOrderModal({ isOpen, onClose }) {
  const dashboardState = useDashboardState();
  const { charityData } = dashboardState;

  const [selectedCharity, setSelectedCharity] = useState("");
  const [selectedBankAccount, setSelectedBankAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [frequency, setFrequency] = useState("Weekly");
  const [startDate, setStartDate] = useState("");
  const [numberOfPayments, setNumberOfPayments] = useState("");
  const [inputValue, setInputValue] = useState("");

  const uniqueCharityOptions = useMemo(() => {
    if (!charityData) return []; // Return an empty array if charityData is undefined

    const options = new Map();
    charityData.forEach((item) => {
      const key = item.charity;
      if (!options.has(key)) {
        options.set(
          key,
          key + (item.registrationNumber ? ` (${item.registrationNumber})` : "")
        );
      }
    });
    return Array.from(options.values());
  }, [charityData]);

  const bankAccounts = useMemo(
    () =>
      charityData.filter((item) => item.charity === selectedCharity),
    [charityData, selectedCharity]
  );

  const handleCharityChange = useCallback((selectedItem) => {
    setSelectedCharity(selectedItem);
    setSelectedBankAccount("");
  }, []);

  const handleBankAccountChange = useCallback((selectedItem) => {
    setSelectedBankAccount(selectedItem);
  }, []);

  const handleAmountChange = useCallback((event) => {
    setAmount(event.target.value);
  }, []);

  const handleFrequencyChange = useCallback((event) => {
    setFrequency(event.target.value);
  }, []);

  const handleStartDateChange = useCallback((event) => {
    setStartDate(event.target.value);
  }, []);

  const handleNumberOfPaymentsChange = useCallback((event) => {
    setNumberOfPayments(event.target.value);
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      console.log("Form submitted:", {
        selectedCharity,
        selectedBankAccount,
        amount,
        frequency,
        startDate,
        numberOfPayments,
      });
      onClose();
    },
    [selectedCharity, selectedBankAccount, amount, frequency, startDate, numberOfPayments, onClose]
  );

  const getFilteredItems = useCallback(
    (items, inputValue) =>
      items.filter((item) =>
        item.toLowerCase().includes(inputValue.toLowerCase())
      ),
    []
  );

  const debouncedSetInputValue = useMemo(
    () => debounce((value) => setInputValue(value), 300),
    []
  );

  const handleInputChange = useCallback((event) => {
    debouncedSetInputValue(event.target.value);
  }, [debouncedSetInputValue]);

  const filteredCharityOptions = useMemo(
    () => getFilteredItems(uniqueCharityOptions, inputValue),
    [uniqueCharityOptions, inputValue, getFilteredItems]
  );

  const renderCharityOption = useCallback(
    ({ index, style }) => {
      const item = filteredCharityOptions[index];
      return (
        <li
          style={style}
          key={item}
          onClick={() => handleCharityChange(item)}
          className="cursor-pointer px-4 py-2 hover:bg-lightPurple"
        >
          {item}
        </li>
      );
    },
    [filteredCharityOptions, handleCharityChange]
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-11/12 max-w-lg rounded-lg bg-white p-6">
        <h2 className="mb-4 text-2xl font-bold text-darkPurple">Create Standing Order</h2>
        <form onSubmit={handleSubmit}>
          {/* Charity */}
          <div className="mb-4">
            <label htmlFor="charityName" className="mb-2 block font-medium text-midPurple">
              Charity*
            </label>
            <Downshift
              id="charityName"
              onChange={handleCharityChange}
              itemToString={(item) => (item ? item : "")}
            >
              {/* Render charity dropdown */}
              {({ getInputProps, getMenuProps, isOpen, highlightedIndex, openMenu }) => (
                <div className="relative">
                  <input
                    {...getInputProps({
                      placeholder: selectedCharity || "Select a charity",
                      className:
                        "w-full rounded-lg border border-babyBlue-mid p-2 focus:outline-none focus:ring-2 focus:ring-midPurple",
                      onFocus: openMenu,
                      onChange: handleInputChange,
                    })}
                  />
                  {isOpen && (
                    <List
                      {...getMenuProps()}
                      height={200}
                      itemCount={filteredCharityOptions.length}
                      itemSize={35}
                      className="absolute left-0 z-10 mt-2 w-full rounded-lg bg-white py-2 shadow-lg"
                    >
                      {renderCharityOption}
                    </List>
                  )}
                </div>
              )}
            </Downshift>
          </div>

          {/* Bank Account */}
          {selectedCharity && (
            <div className="mb-4">
              <label htmlFor="bankAccount" className="mb-2 block font-medium text-midPurple">
                Bank Account*
              </label>
              <Downshift
                id="bankAccount"
                onChange={handleBankAccountChange}
                itemToString={(item) => (item ? item : "")}
              >
                {/* Render bank account dropdown */}
                {({ getInputProps, getItemProps, getMenuProps, isOpen, inputValue, highlightedIndex, openMenu }) => (
                  <div className="relative">
                    <input
                      {...getInputProps({
                        placeholder: selectedBankAccount || "Select a bank account",
                        className:
                          "w-full rounded-lg border border-babyBlue-mid p-2 focus:outline-none focus:ring-2 focus:ring-midPurple",
                        onFocus: openMenu,
                      })}
                    />
                    <ul
                      {...getMenuProps()}
                      className="absolute left-0 z-10 mt-2 w-full rounded-lg bg-white py-2 shadow-lg"
                      style={{ display: isOpen ? "block" : "none" }}
                    >
                      {getFilteredItems(
                        bankAccounts.map(
                          (account) => `${account.bnk_sort_code} - ${account.bnk_account_no}`
                        ),
                        inputValue
                      ).map((item, index) => (
                        <li
                          {...getItemProps({
                            key: item,
                            index,
                            item,
                            className: "cursor-pointer px-4 py-2 hover:bg-lightPurple",
                            style: {
                              backgroundColor: highlightedIndex === index ? "#EDE9FE" : "white",
                              color: highlightedIndex === index ? "#6D28D9" : "black",
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

          {/* Amount */}
          <div className="mb-4">
            <label htmlFor="amount" className="mb-2 block font-medium text-midPurple">
              Amount*
            </label>
            <div className="flex items-center rounded-lg border border-babyBlue-mid p-2 focus-within:border-midPurple">
              <span className="mr-2 text-lg font-bold text-midPurple">£</span>
              <input
                type="text"
                id="amount"
                value={amount}
                onChange={handleAmountChange}
                placeholder="Enter amount"
                className="w-full border-none p-0 text-lg font-bold text-darkPurple focus:outline-none focus:ring-0"
                required
              />
            </div>
          </div>

          {/* Frequency */}
          <div className="mb-4">
            <label htmlFor="frequency" className="mb-2 block font-medium text-midPurple">
              Frequency*
            </label>
            <select
              id="frequency"
              value={frequency}
              onChange={handleFrequencyChange}
              className="w-full rounded-lg border border-babyBlue-mid p-2 focus:outline-none focus:ring-2 focus:ring-midPurple"
              required
            >
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Yearly">Yearly</option>
            </select>
          </div>

          {/* Start Date */}
          <div className="mb-4">
            <label htmlFor="startDate" className="mb-2 block font-medium text-midPurple">
              Start Date*
            </label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={handleStartDateChange}
              className="w-full rounded-lg border border-babyBlue-mid p-2 focus:outline-none focus:ring-2 focus:ring-midPurple"
              required
            />
          </div>

          {/* Number of Payments */}
          <div className="mb-6">
            <label htmlFor="numberOfPayments" className="mb-2 block font-medium text-midPurple">
              Number of Payments
            </label>
            <input
              type="number"
              id="numberOfPayments"
              value={numberOfPayments}
              onChange={handleNumberOfPaymentsChange}
              className="w-full rounded-lg border border-babyBlue-mid p-2 focus:outline-none focus:ring-2 focus:ring-midPurple"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-midPurple px-4 py-2 text-midPurple hover:bg-lightPurple"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-midPurple px-4 py-2 text-white hover:bg-darkPurple"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateStandingOrderModal;