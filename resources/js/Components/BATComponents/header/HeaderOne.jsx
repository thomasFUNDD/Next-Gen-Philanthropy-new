import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { faMoon, faSun, faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function HeaderOne({ handleSidebar, isDarkMode, toggleDarkMode }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="header-wrapper fixed z-30 hidden w-full md:block">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '108px',
          width: '100%',
          background: isDarkMode ? '#1D1E24' : 'rgba(221, 214, 254, 0.3)',
          padding: '0 40px',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <motion.button
          aria-label="none"
          onClick={handleSidebar}
          title="Ctrl+b"
          type="button"
          style={{
            position: 'absolute',
            left: 0,
            top: 'auto',
            transform: 'rotate(180deg)',
            outline: 'none',
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
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
        </motion.button>
        <div style={{ textAlign: 'center', flex: 1 }}>
          <h3
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: isDarkMode ? '#FFFFFF' : '#8b5cf6',
              margin: 0,
            }}
          >
            BAT Client Dashboard
          </h3>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <FontAwesomeIcon
              icon={faBell}
              style={{
                color: isDarkMode ? '#FFFFFF' : '#8b5cf6',
                fontSize: '24px',
                cursor: 'pointer',
                marginRight: '20px',
              }}
              onClick={toggleDropdown}
            />
            {isDropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  background: isDarkMode ? '#2D3748' : '#FFFFFF',
                  padding: '10px',
                  borderRadius: '4px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                }}
              >
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li style={{ padding: '5px 0' }}>Notification 1</li>
                  <li style={{ padding: '5px 0' }}>Notification 2</li>
                  <li style={{ padding: '5px 0' }}>Notification 3</li>
                </ul>
              </div>
            )}
          </div>
          <FontAwesomeIcon
            icon={isDarkMode ? faSun : faMoon}
            style={{
              color: isDarkMode ? '#FFFFFF' : '#8b5cf6',
              fontSize: '24px',
              cursor: 'pointer',
            }}
            onClick={toggleDarkMode}
          />
        </div>
      </div>
    </header>
  );
}

HeaderOne.propTypes = {
  handleSidebar: PropTypes.func,
  isDarkMode: PropTypes.bool,
  toggleDarkMode: PropTypes.func,
};

export default HeaderOne;