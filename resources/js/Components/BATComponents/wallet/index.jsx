import React, { useState, useMemo, useCallback } from "react";
import Downshift from "downshift";
import { FixedSizeList as List } from "react-window";
import debounce from "lodash/debounce";
import purpleMasterCard from "../../../assets/images/logo/purpleMasterCard.png";
import PaymentFilter from "../forms/PaymentFilter";
import PaymentSelect from "../forms/PaymentSelect";
import GreenBtn from "../button/AddMony";

function Wallet({ charityData }) {
  const [selectedCharity, setSelectedCharity] = useState("");
  const [selectedBankAccount, setSelectedBankAccount] = useState("");
  const [amount, setAmount] = useState("");
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

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      console.log("Form submitted:", {
        selectedCharity,
        selectedBankAccount,
        amount,
      });
    },
    [selectedCharity, selectedBankAccount, amount]
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
          <div className="card-slider relative w-full max-w-[340px]">
            <img src={purpleMasterCard} alt="Purple MasterCard" />
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
            >
              {({
                getInputProps,
                getMenuProps,
                isOpen,
                highlightedIndex,
                openMenu,
              }) => (
                <div className="relative">
                  <input
                    {...getInputProps({
                      placeholder: selectedCharity || "Select a charity",
                      className:
                        "w-full rounded-lg border border-bgray-200 p-4 focus:outline-none focus:ring-2 focus:ring-success-300 dark:border-darkblack-400 dark:bg-darkblack-600 dark:text-white",
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
          {selectedCharity && (
            <div className="mb-4">
              <label
                htmlFor="bankAccount"
                className="mb-2 block font-medium text-bgray-900 dark:text-white"
              >
                Bank Account*
              </label>
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
                        bankAccounts.map(
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
                                highlightedIndex === index ? "#f5f5f5" : "white",
                              color:
                                highlightedIndex === index ? "black" : "black",
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
          <div className="mb-4">
            <label
              htmlFor="amount"
              className="mb-2 block font-medium text-bgray-900 dark:text-white"
            >
              Amount*
            </label>
            <div className="flex h-[54px] w-full flex-col justify-between rounded-lg border border-bgray-200 p-4 focus-within:border-success-300 dark:border-darkblack-400">
              <div className="flex h-[35px] w-full items-center justify-between">
                <span className="text-2xl font-bold text-bgray-900 dark:text-white">
                  £
                </span>
                <input
                  type="text"
                  id="amount"
                  value={amount}
                  onChange={handleAmountChange}
                  placeholder="Enter amount"
                  className="w-full border-none p-0 text-2xl font-bold text-bgray-900 focus:outline-none focus:ring-0 dark:border-darkblack-400 dark:bg-darkblack-600 dark:text-white"
                  required
                />
              </div>
            </div>
          </div>
          <GreenBtn text="Donate" type="submit" className="mt-7" />
        </form>
      </div>
    </div>
  );
}

export default Wallet;