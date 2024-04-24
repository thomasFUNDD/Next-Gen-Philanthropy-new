import ProtoTypes from "prop-types";
import logo from "../../../assets/images/logo/logo-color.svg";
import logoW from "../../../assets/images/logo/logo-white.svg";
import { Link, useLocation } from "react-router-dom";
import TransactionIcon from '../../../assets/images/icons/transaction.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';

function Sidebar({ handleActive }) {
  const { pathname: location } = useLocation();

  return (
    <aside className="sidebar-wrapper fixed top-0 z-30 block h-full w-[308px] bg-white dark:bg-darkblack-600 sm:hidden xl:block">
      <div className="sidebar-header relative z-30 flex h-[108px] w-full items-center border-b border-r border-b-[#F7F7F7] border-r-[#F7F7F7] pl-[50px] dark:border-darkblack-400">
        <Link to="/">
          <img src={logo} className="block dark:hidden max-w-[85%]" alt="logo" />
          <img src={logoW} className="hidden dark:block" alt="logo" />
        </Link>
        <button
          aria-label="none"
          type="button"
          onClick={handleActive}
          className="drawer-btn absolute right-0 top-auto"
          title="Ctrl+b"
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
                fill="#d3d3d3"
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
      </div>
      <div className="sidebar-body overflow-style-none relative z-30 h-screen w-full overflow-y-scroll pb-[200px] pl-[48px] pt-[14px]">
        <div className="nav-wrapper mb-[36px] pr-[50px]">
          <div className="item-wrapper mb-5">
            <h4 className="border-b border-bgray-200 text-sm font-medium leading-7 text-bgray-700 dark:border-darkblack-400 dark:text-bgray-50">
              Menu
            </h4>
            <ul className="mt-2.5">
              <li
                className={`item py-[11px] text-bgray-900 dark:text-white ${
                  location === "/" ? "nav-active" : ""
                }`}
              >
                <Link to="/">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <span className="item-ico">
                        <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path className="path-1" d="M0 8.84719C0 7.99027 0.366443 7.17426 1.00691 6.60496L6.34255 1.86217C7.85809 0.515019 10.1419 0.515019 11.6575 1.86217L16.9931 6.60496C17.6336 7.17426 18 7.99027 18 8.84719V17C18 19.2091 16.2091 21 14 21H4C1.79086 21 0 19.2091 0 17V8.84719Z" fill="#8b5cf6" />
                          <path className="path-2" d="M5 17C5 14.7909 6.79086 13 9 13C11.2091 13 13 14.7909 13 17V21H5V17Z" fill="#d3d3d3" />
                        </svg>
                      </span>
                      <span className="item-text text-lg font-medium leading-none">
                        Dashboard
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
              <li
                className={`item py-[11px] text-bgray-900 dark:text-white ${
                  location === "/transaction" ? "nav-active" : ""
                } `}
              >
                <Link to="/transaction">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <span className="item-ico">
                        <svg
                          width="18"
                          height="20"
                          viewBox="0 0 18 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18 16V6C18 3.79086 16.2091 2 14 2H4C1.79086 2 0 3.79086 0 6V16C0 18.2091 1.79086 20 4 20H14C16.2091 20 18 18.2091 18 16Z"
                            fill="#8b5cf6"
                            className="path-1"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.25 8C4.25 7.58579 4.58579 7.25 5 7.25H13C13.4142 7.25 13.75 7.58579 13.75 8C13.75 8.41421 13.4142 8.75 13 8.75H5C4.58579 8.75 4.25 8.41421 4.25 8Z"
                            fill="#d3d3d3"
                            className="path-2"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.25 12C4.25 11.5858 4.58579 11.25 5 11.25H13C13.4142 11.25 13.75 11.5858 13.75 12C13.75 12.4142 13.4142 12.75 13 12.75H5C4.58579 12.75 4.25 12.4142 4.25 12Z"
                            fill="#d3d3d3"
                            className="path-2"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.25 16C4.25 15.5858 4.58579 15.25 5 15.25H9C9.41421 15.25 9.75 15.5858 9.75 16C9.75 16.4142 9.41421 16.75 9 16.75H5C4.58579 16.75 4.25 16.4142 4.25 16Z"
                            fill="#d3d3d3"
                            className="path-2"
                          />
                          <path
                            d="M11 0H7C5.89543 0 5 0.895431 5 2C5 3.10457 5.89543 4 7 4H11C12.1046 4 13 3.10457 13 2C13 0.895431 12.1046 0 11 0Z"
                            fill="#d3d3d3"
                            className="path-2"
                          />
                        </svg>
                      </span>
                      <span className="item-text text-lg font-medium leading-none">
                        Statements
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
              <li
                className={`item py-[11px] text-bgray-900 dark:text-white ${
                  location === "/statistics" ? "nav-active" : ""
                } `}
              >
                <Link to="/statistics">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <span className="item-ico">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18 11C18 15.9706 13.9706 20 9 20C4.02944 20 0 15.9706 0 11C0 6.02944 4.02944 2 9 2C13.9706 2 18 6.02944 18 11Z"
                            fill="#8b5cf6"
                            className="path-1"
                          />
                          <path
                            d="M19.8025 8.01277C19.0104 4.08419 15.9158 0.989557 11.9872 0.197453C10.9045 -0.0208635 10 0.89543 10 2V8C10 9.10457 10.8954 10 12 10H18C19.1046 10 20.0209 9.09555 19.8025 8.01277Z"
                            fill="#d3d3d3"
                            className="path-2"
                          />
                        </svg>
                      </span>
                      <span className="item-text text-lg font-medium leading-none">
                        Voucher Statistics
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
              <li
                className={`item py-[11px] text-bgray-900 dark:text-white ${
                  location === "/analytics" ? "nav-active" : ""
                } `}
              >
                <Link to="/analytics">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <span className="item-ico">
                        <img src={TransactionIcon} alt="Transaction Icon" />
                      </span>
                      <span className="item-text text-lg font-medium leading-none">
                        Transactions
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
              <li
                className={`item py-[11px] text-bgray-900 dark:text-white ${
                  location === "/my-wallet" ? "nav-active" : ""
                } `}
              >
                <Link to="/my-wallet">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <span className="item-ico">
                        <svg
                          width="20"
                          height="18"
                          viewBox="0 0 20 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20 4C20 1.79086 18.2091 0 16 0H4C1.79086 0 0 1.79086 0 4V14C0 16.2091 1.79086 18 4 18H16C18.2091 18 20 16.2091 20 14V4Z"
                            fill="#8b5cf6"
                            className="path-1"
                          />
                          <path
                            d="M6 9C6 7.34315 4.65685 6 3 6H0V12H3C4.65685 12 6 10.6569 6 9Z"
                            fill="#d3d3d3"
                            className="path-2"
                          />
                        </svg>
                      </span>
                      <span className="item-text text-lg font-medium leading-none">
                        My Wallet
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
              <li
                className={`item py-[11px] text-bgray-900 dark:text-white ${
                  location === "/integrations" ? "nav-active" : ""
                } `}
              >
                <Link to="/integrations">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <span className="item-ico">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.57666 3.61499C1.57666 2.51042 2.47209 1.61499 3.57666 1.61499H8.5C9.60456 1.61499 10.5 2.51042 10.5 3.61499V8.53833C10.5 9.64289 9.60456 10.5383 8.49999 10.5383H3.57666C2.47209 10.5383 1.57666 9.64289 1.57666 8.53832V3.61499Z"
                            fill="#8b5cf6"
                            className="path-1"
                          />
                          <path
                            d="M13.5 15.5383C13.5 14.4338 14.3954 13.5383 15.5 13.5383H20.4233C21.5279 13.5383 22.4233 14.4338 22.4233 15.5383V20.4617C22.4233 21.5662 21.5279 22.4617 20.4233 22.4617H15.5C14.3954 22.4617 13.5 21.5662 13.5 20.4617V15.5383Z"
                            fill="#8b5cf6"
                            className="path-1"
                          />
                          <circle
                            cx="6.03832"
                            cy="18"
                            r="4.46166"
                            fill="#8b5cf6"
                            className="path-1"
                          />
                          <path
                           fillRule="evenodd"
                           clipRule="evenodd"
                           d="M18 2C18.4142 2 18.75 2.33579 18.75 2.75V5.25H21.25C21.6642 5.25 22 5.58579 22 6C22 6.41421 21.6642 6.75 21.25 6.75H18.75V9.25C18.75 9.66421 18.4142 10 18 10C17.5858 10 17.25 9.66421 17.25 9.25V6.75H14.75C14.3358 6.75 14 6.41421 14 6C14 5.58579 14.3358 5.25 14.75 5.25H17.25V2.75C17.25 2.33579 17.5858 2 18 2Z"
                           fill="#d3d3d3"
                           className="path-2"
                         />
                       </svg>
                     </span>
                     <span className="item-text text-lg font-medium leading-none">
                       Integrations PLAID
                     </span>
                   </div>
                 </div>
               </Link>
             </li>
             <li
               className={`item py-[11px] text-bgray-900 dark:text-white ${
                 location === "/users" ? "nav-active" : ""
               } `}
             >
               <Link to="/users">
                 <div className="flex items-center justify-between">
                   <div className="flex items-center space-x-2.5">
                     <span className="item-ico">
                       <svg
                         width="24"
                         height="24"
                         viewBox="0 0 24 24"
                         fill="none"
                         xmlns="http://www.w3.org/2000/svg"
                       >
                         <ellipse
                           cx="11.7778"
                           cy="17.5555"
                           rx="7.77778"
                           ry="4.44444"
                           className="path-1"
                           fill="#8b5cf6"
                         />
                         <circle
                           className="path-2"
                           cx="11.7778"
                           cy="6.44444"
                           r="4.44444"
                           fill="#d3d3d3"
                         />
                       </svg>
                     </span>
                     <span className="item-text text-lg font-medium leading-none">
                       Profile
                     </span>
                   </div>
                 </div>
               </Link>
             </li>
             <li
               className={`item py-[11px] text-bgray-900 dark:text-white ${
                 location === "/calender" ? "nav-active" : ""
               } `}
             >
               <Link to="/calender">
                 <div className="flex items-center justify-between">
                   <div className="flex items-center space-x-2.5">
                     <span className="item-ico">
                       <svg
                         width="18"
                         height="21"
                         viewBox="0 0 18 21"
                         fill="none"
                         xmlns="http://www.w3.org/2000/svg"
                       >
                         <path
                           d="M0 6.5C0 4.29086 1.79086 2.5 4 2.5H14C16.2091 2.5 18 4.29086 18 6.5V8V17C18 19.2091 16.2091 21 14 21H4C1.79086 21 0 19.2091 0 17V8V6.5Z"
                           fill="#8b5cf6"
                           className="path-1"
                         />
                         <path
                           d="M14 2.5H4C1.79086 2.5 0 4.29086 0 6.5V8H18V6.5C18 4.29086 16.2091 2.5 14 2.5Z"
                           fill="#d3d3d3"
                           className="path-2"
                         />
                         <path
                           fillRule="evenodd"
                           clipRule="evenodd"
                           d="M5 0.25C5.41421 0.25 5.75 0.585786 5.75 1V4C5.75 4.41421 5.41421 4.75 5 4.75C4.58579 4.75 4.25 4.41421 4.25 4V1C4.25 0.585786 4.58579 0.25 5 0.25ZM13 0.25C13.4142 0.25 13.75 0.585786 13.75 1V4C13.75 4.41421 13.4142 4.75 13 4.75C12.5858 4.75 12.25 4.41421 12.25 4V1C12.25 0.585786 12.5858 0.25 13 0.25Z"
                           fill="#8b5cf6"
                           className="path-2"
                         />
                         <circle cx="9" cy="14" r="1" fill="#d3d3d3" />
                         <circle
                           cx="13"
                           cy="14"
                           r="1"
                           fill="#d3d3d3"
                           className="path-2"
                         />
                         <circle
                           cx="5"
                           cy="14"
                           r="1"
                           fill="#d3d3d3"
                           className="path-2"
                         />
                       </svg>
                     </span>
                     <span className="item-text text-lg font-medium leading-none">
                       Standing Order
                     </span>
                   </div>
                 </div>
               </Link>
             </li>
             <li
               className={`item py-[11px] text-bgray-900 dark:text-white ${
                 location === "/history" ? "nav-active" : ""
               } `}
             >
               <Link to="/history">
                 <div className="flex items-center justify-between">
                   <div className="flex items-center space-x-2.5">
                     <span className="item-ico">
                       <FontAwesomeIcon icon={faCreditCard} style={{ color: '#8b5cf6' }} className="text-purple-500" />
                     </span>
                     <span className="item-text text-lg font-medium leading-none">
                       Card Management
                     </span>
                   </div>
                 </div>
               </Link>
             </li>
           </ul>
         </div>
         <div className="item-wrapper mb-5">
           <h4 className="border-b border-bgray-200 text-sm font-medium leading-7 text-bgray-700 dark:border-darkblack-400 dark:text-bgray-50">
             Others
           </h4>
           <ul className="mt-2.5">
             <li
               className={`item py-[11px] text-bgray-900 dark:text-white ${
                 location === "/signin" ? "nav-active" : ""
               } `}
             >
               <Link to="/signin">
                 <div className="flex items-center justify-between">
                   <div className="flex items-center space-x-2.5">
                     <span className="item-ico">
                       <svg
                         width="24"
                         height="24"
                         viewBox="0 0 24 24"
                         fill="none"
                         xmlns="http://www.w3.org/2000/svg"
                       >
                         <ellipse
                           cx="11.7778"
                           cy="17.5555"
                           rx="7.77778"
                           ry="4.44444"
                           fill="#8b5cf6"
                           className="path-1"
                         />
                         <circle
                           cx="11.7778"
                           cy="6.44444"
                           r="4.44444"
                           fill="#d3d3d3"
                           className="path-2"
                         />
                       </svg>
                     </span>
                     <span className="item-text text-lg font-medium leading-none">
                       Signin
                     </span>
                   </div>
                 </div>
               </Link>
             </li>
             <li
               className={`item py-[11px] text-bgray-900 dark:text-white ${
                 location === "/signup" ? "nav-active" : ""
               } `}
             >
               <Link to="/signup">
                 <div className="flex items-center justify-between">
                   <div className="flex items-center space-x-2.5">
                     <span className="item-ico">
                       <svg
                         width="24"
                         height="24"
                         viewBox="0 0 24 24"
                         fill="none"
                         xmlns="http://www.w3.org/2000/svg"
                       >
                         <ellipse
                           cx="11.7778"
                           cy="17.5555"
                           rx="7.77778"
                           ry="4.44444"
                           fill="#8b5cf6"
                           className="path-1"
                         />
                         <circle
                           cx="11.7778"
                           cy="6.44444"
                           r="4.44444"
                           fill="#d3d3d3"
                           className="path-2"
                         />
                       </svg>
                     </span>
                     <span className="item-text text-lg font-medium leading-none">
                       Signup
                     </span>
                   </div>
                 </div>
               </Link>
             </li>
             <li
               className={`item py-[11px] text-bgray-900 dark:text-white ${
                 location === "/coming-soon" ? "nav-active" : ""
               } `}
             >
               <Link to="/coming-soon">
                 <div className="flex items-center space-x-2.5">
                   <span className="item-ico">
                     <svg
                       width="24"
                       height="24"
                       viewBox="0 0 24 24"
                       fill="none"
                       xmlns="http://www.w3.org/2000/svg"
                     >
                       <path
                         d="M18.4 17.2C19.8833 19.1777 18.4721 22 16 22L8 22C5.52786 22 4.11672 19.1777 5.6 17.2L8.15 13.8C8.95 12.7333 8.95 11.2667 8.15 10.2L5.6 6.8C4.11672 4.82229 5.52787 2 8 2L16 2C18.4721 2 19.8833 4.82229 18.4 6.8L15.85 10.2C15.05 11.2667 15.05 12.7333 15.85 13.8L18.4 17.2Z"
                         fill="#8b5cf6"
                         className="path-1"
                       />
                       <path
                         d="M12.7809 9.02391C12.3805 9.52432 11.6195 9.52432 11.2191 9.02391L9.29976 6.6247C8.77595 5.96993 9.24212 5 10.0806 5L13.9194 5C14.7579 5 15.2241 5.96993 14.7002 6.6247L12.7809 9.02391Z"
                         fill="#d3d3d3"
                         className="path-2"
                       />
                     </svg>
                   </span>
                   <span className="item-text text-lg font-medium leading-none">
                     Coming Soon
                   </span>
                 </div>
               </Link>
             </li>
             <li
               className={`item py-[11px] text-bgray-900 dark:text-white ${
                 location === "/404" ? "nav-active" : ""
               } `}
             >
               <Link to="/404">
                 <div className="flex items-center space-x-2.5">
                   <span className="item-ico">
                     <svg
                       width="20"
                       height="20"
                       viewBox="0 0 20 20"
                       fill="none"
                       xmlns="http://www.w3.org/2000/svg"
                     >
                       <circle
                         cx="10"
                         cy="10"
                         r="10"
                         fill="#8b5cf6"
                         className="path-1"
                       />
                       <path
                         d="M9 15C9 14.4477 9.44772 14 10 14C10.5523 14 11 14.4477 11 15C11 15.5523 10.5523 16 10 16C9.44772 16 9 15.5523 9 15Z"
                         fill="#d3d3d3"
                         className="path-2"
                       />
                       <path
                         fillRule="evenodd"
                         clipRule="evenodd"
                         d="M10 12.75C9.58579 12.75 9.25 12.4142 9.25 12L9.25 5C9.25 4.58579 9.58579 4.25 10 4.25C10.4142 4.25 10.75 4.58579 10.75 5L10.75 12C10.75 12.4142 10.4142 12.75 10 12.75Z"
                         fill="#d3d3d3"
                         className="path-2"
                       />
                     </svg>
                   </span>
                   <span className="item-text text-lg font-medium leading-none">
                     404
                   </span>
                 </div>
               </Link>
             </li>
             <li className={`item py-[11px] text-bgray-900 dark:text-white`}>
               <Link to="#">
                 <div className="flex items-center justify-between">
                   <div className="flex items-center space-x-2.5">
                     <span className="item-ico">
                       <svg
                         width="21"
                         height="18"
                         viewBox="0 0 21 18"
                         fill="none"
                         xmlns="http://www.w3.org/2000/svg"
                       >
                         <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M17.1464 10.4394C16.8536 10.7323 16.8536 11.2072 17.1464 11.5001C17.4393 11.7929 17.9142 11.7929 18.2071 11.5001L19.5 10.2072C20.1834 9.52375 20.1834 8.41571 19.5 7.73229L18.2071 6.4394C17.9142 6.1465 17.4393 6.1465 17.1464 6.4394C16.8536 6.73229 16.8536 7.20716 17.1464 7.50006L17.8661 8.21973H11.75C11.3358 8.21973 11 8.55551 11 8.96973C11 9.38394 11.3358 9.71973 11.75 9.71973H17.8661L17.1464 10.4394Z"
                          fill="#d3d3d3"
                          className="path-2"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M4.75 17.75H12C14.6234 17.75 16.75 15.6234 16.75 13C16.75 12.5858 16.4142 12.25 16 12.25C15.5858 12.25 15.25 12.5858 15.25 13C15.25 14.7949 13.7949 16.25 12 16.25H8.21412C7.34758 17.1733 6.11614 17.75 4.75 17.75ZM8.21412 1.75H12C13.7949 1.75 15.25 3.20507 15.25 5C15.25 5.41421 15.5858 5.75 16 5.75C16.4142 5.75 16.75 5.41421 16.75 5C16.75 2.37665 14.6234 0.25 12 0.25H4.75C6.11614 0.25 7.34758 0.82673 8.21412 1.75Z"
                          fill="#8b5cf6"
                          className="path-1"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0 5C0 2.37665 2.12665 0.25 4.75 0.25C7.37335 0.25 9.5 2.37665 9.5 5V13C9.5 15.6234 7.37335 17.75 4.75 17.75C2.12665 17.75 0 15.6234 0 13V5Z"
                          fill="#8b5cf6"
                          className="path-1"
                        />
                      </svg>
                    </span>
                    <span className="item-text text-lg font-medium leading-none">
                      Logout
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </aside>
);
}

Sidebar.propTypes = {
handleActive: ProtoTypes.func,
};

export default Sidebar;