import React from 'react';
import ProtoTypes from 'prop-types';
import ToggleBtn from './ToggleBtn';
import ModeToggler from './ModeToggler';

function HeaderOne({ handleSidebar }) {
  return (
    <header className="header-wrapper fixed z-30 hidden w-full md:block">
      <div className="relative flex h-[108px] w-full items-center justify-between bg-white px-10 dark:bg-darkblack-600 2xl:px-[76px]">
        <button
          aria-label="none"
          onClick={handleSidebar}
          title="Ctrl+b"
          type="button"
          className="drawer-btn absolute left-0 top-auto rotate-180 transform"
        >
          <span>
            <svg
              width="16"
              height="40"
              viewBox="0 0 16 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 10C0 4.47715 4.47715 0 10 0H16V40H10C4.47715 40 0 35.5228 0 30V10Z"
                fill="#936DFF"
              />
              <path
                d="M10 15L6 20.0049L10 25.0098"
                stroke="#ffffff"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
        <div>
          <h3 className="text-xl font-bold text-darkPurple dark:text-white lg:text-3xl lg:leading-[36.4px]">
            BAT Client Dashboard
          </h3>
        </div>
        <div className="quick-access-wrapper relative">
          <div className="flex items-center space-x-[43px]">
            <div className="hidden items-center space-x-5 xl:flex">
              <ModeToggler />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

HeaderOne.propTypes = {
  handleSidebar: ProtoTypes.func,
};

export default HeaderOne;