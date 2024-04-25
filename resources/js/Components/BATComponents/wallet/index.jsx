import React, { useState, useMemo, useCallback } from "react";
import Downshift from "downshift";
import { FixedSizeList as List } from "react-window";
import debounce from "lodash/debounce";
import purpleMasterCard from "../../../assets/images/logo/purpleMasterCard.png";
import PaymentFilter from "../forms/PaymentFilter";
import PaymentSelect from "../forms/PaymentSelect";
import GreenBtn from "../button/AddMony";
import mcLogo from "../../../assets/images/logo/mcLogo.png";

function Wallet({ charityData }) {
  const [selectedCharity, setSelectedCharity] = useState(null);
  const [selectedBankAccount, setSelectedBankAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isCharityDropdownOpen, setIsCharityDropdownOpen] = useState(false);
  const [isContactSupportModalOpen, setIsContactSupportModalOpen] = useState(false);
  const [isDonationSuccessModalOpen, setIsDonationSuccessModalOpen] = useState(false);
  const [isCloseOnlyModalOpen, setIsCloseOnlyModalOpen] = useState(false);

  console.log("charityData", charityData);

  const uniqueCharityOptions = useMemo(() => {
    if (!charityData) return []; // Return an empty array if charityData is undefined

    const options = new Map();
    charityData.forEach((item) => {
      const key = `${item.charity} (${item.charityno})`;
      if (!options.has(key)) {
        options.set(
          key,
          `${item.charity} (${item.charityno})${item.registrationNumber ? ` - ${item.registrationNumber}` : ""}`
        );
      }
    });
    return Array.from(options.values());
  }, [charityData]);

  const bankAccounts = useMemo(
    () =>
      charityData.filter((item) => item.charity === (selectedCharity ? selectedCharity.charity : "")),
    [charityData, selectedCharity]
  );

  const handleCharityChange = useCallback((selectedItem) => {
    const selectedCharityObj = charityData.find(
      (item) => `${item.charity} (${item.charityno})` === selectedItem
    );
    setSelectedCharity(selectedCharityObj);
    setSelectedBankAccount("");
    setInputValue(""); // Clear the input value
    setIsCharityDropdownOpen(false); // Close the dropdown
  }, [charityData]);

  const handleBankAccountChange = useCallback((selectedItem) => {
    setSelectedBankAccount(selectedItem);
  }, []);

  const handleAmountChange = useCallback((event) => {
    setAmount(event.target.value);
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        const response = await fetch('/api/donate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
          },
          body: JSON.stringify({
            '_token': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            recipientcomment: '',
            donorcomment: '',
            email: '', // Replace with the actual email value
            amount: amount,
            anonymous: false,
            charityno: selectedCharity.charityno,
            payon: new Date().toISOString().slice(0, 10),
            donorid: '146', // Replace with the actual donorid value
            banksortcode: selectedBankAccount.split(' - ')[0],
            bankaccountno: selectedBankAccount.split(' - ')[1],
          }),
        });

        if (response.ok) {
          console.log('Donation successful');
          setIsDonationSuccessModalOpen(true); // Open the donation success modal
        } else {
          console.error('Donation failed');
          // Handle donation failure, e.g., show an error message
        }
      } catch (error) {
        console.error('Error:', error);
        // Handle error, e.g., show an error message
      }
    },
    [amount, selectedCharity, selectedBankAccount]
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
          className="cursor-pointer px-4 py-2 hover:bg-bgray-100"
        >
          {item}
        </li>
      );
    },
    [filteredCharityOptions, handleCharityChange]
  );

  // Auto-select the bank account if there's only one option
  useMemo(() => {
    if (bankAccounts.length === 1) {
      setSelectedBankAccount(
        `${bankAccounts[0].bnk_sort_code} - ${bankAccounts[0].bnk_account_no}`
      );
    }
  }, [bankAccounts]);

  const isBankAccountAvailable = bankAccounts.some(
    (account) => account.bnk_sort_code !== null && account.bnk_account_no !== null
  );

  return (
    <div className="mb-6 w-full rounded-lg bg-white px-[42px] py-5 dark:border dark:border-darkblack-400 dark:bg-darkblack-600">
      <div className="my-wallet mb-8 w-full">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-bold text-bgray-900 dark:text-white">
            My Wallet
          </h3>
          <PaymentSelect />
        </div>
        <div className="flex justify-center">
          <div className="card-slider relative w-full max-w-xs md2:max-w-sm lg2:max-w-md xl2:max-w-[500px]">
            <div className="w-48 h-28 md2:w-56 md2:h-32 lg2:w-64 lg2:h-40 xl2:w-96 xl2:h-56 rounded-lg bg-midPurple p-4 md2:p-5 lg2:p-6 xl2:p-8 text-white relative">
              <img src={mcLogo} alt="MasterCard Logo" className="absolute top-2 right-2 md2:top-3 md2:right-3 lg2:top-4 lg2:right-4 xl2:top-6 xl2:right-6 h-6 md2:h-8 lg2:h-8 xl2:h-12 w-auto" />
              <div className="mb-1 text-sm md2:text-lg lg2:text-xl xl2:text-2xl font-bold">Alta Fogel</div>
              <div className="mb-1 text-sm md2:text-lg lg2:text-xl xl2:text-3xl flex items-center">
                <div className="ml-2 w-7 h-4 md2:w-8 md2:h-5 lg2:w-9 lg2:h-6 xl2:w-10 xl2:h-7 bg-warning-300 rounded-sm mr-2"></div> {/* Adjusted sizes for larger devices */}
                **** **** **** ****
              </div>
              <div className="mt-2 md2:mt-3 lg2:mt-4 xl2:mt-6 flex justify-between">
                <div>
                  <div className="text-xs md2:text-sm lg2:text-sm xl2:text-lg uppercase">Expiry</div>
                  <div className="text-sm md2:text-lg lg2:text-lg xl2:text-2xl">**/**</div>
                </div>
                <div>
                  <div className="text-xs md2:text-sm lg2:text-sm xl2:text-lg uppercase">Valid</div>
                  <div className="text-sm md2:text-lg lg2:text-lg xl2:text-2xl">**/**</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        <h3 className="mb-4 text-lg font-bold text-bgray-900 dark:text-white">
          Donate to Charity
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="charityName"
              className="mb-2 block font-medium text-bgray-900 dark:text-white"
            >
              Charity*
            </label>
            <Downshift
              id="charityName"
              onChange={handleCharityChange}
              itemToString={(item) => (item ? item : "")}
              isOpen={isCharityDropdownOpen}
              onOuterClick={() => setIsCharityDropdownOpen(false)}
            >
              {({
                getInputProps,
                getMenuProps,
                highlightedIndex,
                openMenu,
              }) => (
                <div className="relative">
                  <input
                    {...getInputProps({
                      placeholder: selectedCharity ? `${selectedCharity.charity} (${selectedCharity.charityno})` : "Select a charity",
                      className:
                        "w-full rounded-lg border border-bgray-200 p-4 focus:outline-none focus:ring-2 focus:ring-success-300 dark:border-darkblack-400 dark:bg-darkblack-600 dark:text-white",
                      onFocus: () => setIsCharityDropdownOpen(true),
                      onChange: handleInputChange,
                    })}
                  />
                  {isCharityDropdownOpen && (
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
          {selectedCharity && (
            <>
              {isBankAccountAvailable ? (
                <>
                  <div className="mb-4">
                    <label
                      htmlFor="bankAccount"
                      className="mb-2 block font-medium text-bgray-900 dark:text-white"
                    >
                      Bank Account*
                    </label>
                    {bankAccounts.length === 1 ? (
                      <input
                        id="bankAccount"
                        value={selectedBankAccount}
                        readOnly
                        className="w-full rounded-lg border border-bgray-200 p-4 focus:outline-none focus:ring-2 focus:ring-success-300 dark:border-darkblack-400 dark:bg-darkblack-600 dark:text-white"
                      />
                    ) : (
                      <Downshift
                        id="bankAccount"
                        onChange={handleBankAccountChange}
                        itemToString={(item) => (item ? item : "")}
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
                          <div className="relative">
                            <input
                              {...getInputProps({
                                placeholder: selectedBankAccount || "Select a bank account",
                                className:
                                  "w-full rounded-lg border border-bgray-200 p-4 focus:outline-none focus:ring-2 focus:ring-success-300 dark:border-darkblack-400 dark:bg-darkblack-600 dark:text-white",
                                onFocus: openMenu,
                              })}
                            />
                            <ul
                              {...getMenuProps()}
                              className="absolute left-0 z-10 mt-2 w-full rounded-lg bg-white py-2 shadow-lg"
                              style={{ display: isOpen ? "block" : "none" }}
                            >
                              {getFilteredItems(
                                bankAccounts
                                  .filter(
                                    (account) =>
                                      account.bnk_sort_code !== null &&
                                      account.bnk_account_no !== null
                                  )
                                  .map(
                                    (account) =>
                                      `${account.bnk_sort_code} - ${account.bnk_account_no}`
                                  ),
                                inputValue
                              ).map((item, index) => (
                                <li
                                  {...getItemProps({
                                    key: item,
                                    index,
                                    item,
                                    className: "cursor-pointer px-4 py-2 hover:bg-bgray-100",
                                    style: {
                                      backgroundColor:
                                        highlightedIndex === index
                                          ? "#f5f5f5"
                                          : "white",
                                      color:
                                        highlightedIndex === index
                                          ? "black"
                                          : "black",
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
                    )}
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="amount"
                      className="mb-2 block font-medium text-bgray-900 dark:text-white"
                    >
                      Amount*
                    </label>
                    <div className="flex h-[54px] w-full flex-col justify-between rounded-lg border border-bgray-200 p-4 focus-within:border-success-300 dark:border-darkblack-400">
                      <div className="flex h-[35px] w-full items-center justify-between">
                        <span className="mr-2 text-2xl font-bold text-bgray-900 dark:text-white">
                          £
                        </span>
                        <input
                          type="text"
                          id="amount"
                          value={amount}
                          onChange={handleAmountChange}
                          placeholder="Enter amount"
                          className="w-full border-none pl-2 text-2xl font-bold text-bgray-900 focus:outline-none focus:ring-0 dark:border-darkblack-400 dark:bg-darkblack-600 dark:text-white"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <GreenBtn text="Donate" type="submit" className="mt-7" />
                </>
              ) : (
                <button
                  type="button"
                  className="mt-7 rounded-lg bg-midPurple px-4 py-2 text-white"
                  onClick={() => setIsContactSupportModalOpen(true)}
                >
                  Contact Support
                </button>
              )}
            </>
          )}
        </form>
      </div>
      {isDonationSuccessModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="rounded-lg bg-white p-12 w-full max-w-lg">
            <h2 className="mb-8 text-3xl font-bold text-center">Donation Successful</h2>
            <p className="mb-12 text-xl text-center">Thank you for your donation!</p>
            <div className="flex justify-center space-x-12">
              <button
                type="button"
                className="bg-babyBlue-mid text-white hover:bg-babyBlue-dark text-xl px-8 py-4 rounded-lg"
                onClick={() => window.location.href="/donations"}
              >
                View Donation
              </button>
              <button
                type="button"
                className="rounded-lg bg-midPurple px-8 py-4 text-white text-xl"
                onClick={() => setIsDonationSuccessModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {isCloseOnlyModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="rounded-lg bg-white p-8">
            <h2 className="mb-6 text-2xl font-bold">Modal with Close Option</h2>
            <div className="flex justify-end">
              <button
                type="button"
                className="rounded-lg bg-midPurple px-6 py-3 text-white text-lg"
                onClick={() => setIsCloseOnlyModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Wallet;