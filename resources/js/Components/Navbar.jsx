import React, { useState, useEffect } from 'react';
import utaLogo from '../../images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faMoneyBillWave, faBook, faPowerOff, faUser, faPhone, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ content }) => {
  return (
    <header className="mb-3">
      <div className="burger-menu-container" style={{ textAlign: 'center' }}>
        <a className="burger-btn d-block d-xl-none">
          <i className="bi bi-justify fs-3" style={{ marginTop: '0px' }}></i>
          <div style={{ textAlign: 'right', color: '#a98e63' }}>Menu</div>
        </a>
      </div>
      <div dangerouslySetInnerHTML={{ __html: content?.content || '' }} />
    </header>
  );
};

const Footer = ({ content }) => {
  return (
    <footer>
      <div className="footer clearfix mb-0 text-muted">
        <div className="float-start">
          <p>2023 &copy; UTA</p>
          <br />
          {(content?.active_link === 'Card Management' || content?.active_link === 'Card Order') && (
            <p>
              The UTA Prepaid Mastercard® Card is issued by PayrNet Limited and licensed by Mastercard International
              Incorporation. PayrNet Limited is authorised by the Financial Conduct Authority (FCA) to conduct electronic
              money service activities under the Electronic Money Regulations 2011 (Firm Reference Number 900594).
              Mastercard is a registered trademark, and the circles design is a trademark of Mastercard International
              Incorporated.
            </p>
          )}
        </div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: content?.content || '' }} />
    </footer>
  );
};

const LeftSideMenu = ({ content }) => {
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const toggleSubmenu = (submenu) => {
    setActiveSubmenu(activeSubmenu === submenu ? null : submenu);
  };

  return (
    <div id="sidebar" className={`sidebar ${content?.active_link ? 'active' : ''}`}>
      <div className="sidebar-wrapper active" style={{ background: 'var(--companyColour)' }}>
        <div className="sidebar-header bg-white">
          <div className="d-flex justify-content-center">
            <div className="logo">
              <Link to="/summary">
                <img src={utaLogo} alt="Logo" style={{ width: '75%', height: 'auto' }} />
              </Link>
            </div>
          </div>
        </div>
        <div className="sidebar-menu" style={{ paddingTop: '10px', height: '100%' }}>
          <ul className="menu">
            <li className={`sidebar-item ${content?.active_link === 'Summary' ? 'active' : ''}`}>
              <Link to="/summary" className="sidebar-link">
                <i className="bi bi-house-door-fill me-2"></i>
                <span>Summary</span>
              </Link>
            </li>
            <li className={`sidebar-item ${content?.active_link === 'Donate' ? 'active' : ''}`}>
              <Link to="/donate" className="sidebar-link">
                <i className="bi bi-house-door-fill me-2"></i>
                <span>Donate</span>
              </Link>
            </li>
            <li
            className={`sidebar-item has-sub ${
              content?.active_link === 'Transactions' || activeSubmenu === 'Transactions' ? 'active' : ''
            }`}
          >
            <a className="sidebar-link" onClick={() => toggleSubmenu('Transactions')}>
              <i className="bi bi-arrow-left-right me-2"></i>
              <span>Transactions</span>
              <i className="bi bi-chevron-right submenu-icon"></i>
            </a>
            <ul className={`submenu ${activeSubmenu === 'Transactions' ? 'active' : ''}`}>
              <li className="submenu-item">
                <Link to="/transactionsOut">Transactions Out</Link>
              </li>
              <li className="submenu-item">
                <Link to="/donationsIn">Transactions In</Link>
              </li>
              <li className="submenu-item">
                <Link to="/transactionProof">Transaction Receipts</Link>
              </li>
            </ul>
          </li>
            <li className={`sidebar-item ${content?.active_link === 'Standing Orders' ? 'active' : ''}`}>
              <Link to="/standingOrder" className="sidebar-link">
                <i className="bi bi-calendar-check-fill me-2"></i>
                <span>Standing Orders</span>
              </Link>
            </li>
            <li className={`sidebar-item ${content?.active_link === 'Order Card' ? 'active' : ''}`}>
              <Link to="/OrderCard" className="sidebar-link">
                <i className="bi bi-credit-card-2-front-fill me-2"></i>
                <span>Order Card</span>
              </Link>
            </li>
            <li
              className={`sidebar-item has-sub ${
                content?.active_link === 'Card Management' || activeSubmenu === 'Card Management' ? 'active' : ''
              }`}
            >
              <a className="sidebar-link" onClick={() => toggleSubmenu('Card Management')}>
                <i className="bi bi-credit-card-fill me-2"></i>
                <span>Card Management</span>
                <i className="bi bi-chevron-right submenu-icon"></i>
              </a>
              <ul className={`submenu ${activeSubmenu === 'Card Management' ? 'active' : ''}`}>
                <li className="submenu-item">
                  <Link to="/cardDashboard">Card Dashboard</Link>
                </li>
                <li className="submenu-item">
                  <Link to="/LostAndStolen">Lost/Stolen/Freeze</Link>
                </li>
                <li className="submenu-item">
                  <Link to="/PinReveal">Get PIN</Link>
                </li>
                <li className="submenu-item">
                  <Link to="/PinReveal">Timed PIN reveal</Link>
                </li>
                <li className="submenu-item">
                  <Link to="/LostAndStolen">Block Card</Link>
                </li>
                <li className="submenu-item">
                  <Link to="/activateCard">Activate Card</Link>
                </li>
                <li className="submenu-item">
                  <Link to="/unblock">Unblock Card</Link>
                </li>
              </ul>
            </li>
            <li
              className={`sidebar-item has-sub ${
                content?.active_link === 'Statements' || activeSubmenu === 'Statements' ? 'active' : ''
              }`}
            >
              <a className="sidebar-link" onClick={() => toggleSubmenu('Statements')}>
                <i className="bi bi-file-earmark-medical-fill me-2"></i>
                <span>Statements</span>
                <i className="bi bi-chevron-right submenu-icon"></i>
              </a>
              <ul className={`submenu ${activeSubmenu === 'Statements' ? 'active' : ''}`}>
                <li className="submenu-item">
                  <Link to="/statements">Statements</Link>
                </li>
                <li className="submenu-item">
                  <Link to="/giftAidReceipts">Gift Aid Statements</Link>
                </li>
              </ul>
            </li>
            <li
              className={`sidebar-item has-sub ${
                content?.active_link === 'Vouchers' || activeSubmenu === 'Vouchers' ? 'active' : ''
              }`}
            >
              <a className="sidebar-link" onClick={() => toggleSubmenu('Vouchers')}>
                <i className="bi bi-book-fill me-2"></i>
                <span>Vouchers</span>
                <i className="bi bi-chevron-right submenu-icon"></i>
              </a>
              <ul className={`submenu ${activeSubmenu === 'Vouchers' ? 'active' : ''}`}>
                <li className="submenu-item">
                  <Link to="/orderBooks">Order Books</Link>
                </li>
                <li className="submenu-item">
                  <Link to="/viewBooks">View Books</Link>
                </li>
                <li className="submenu-item">
                  <Link to="/viewVouchers">View Vouchers</Link>
                </li>
                <li className="submenu-item">
                  <Link to="/unusedVouchers">Unused Vouchers</Link>
                </li>
                <li className="submenu-item">
                  <Link to="/voucherBooksOrders">Voucher Books Orders</Link>
                </li>
              </ul>
            </li>
            <li className={`sidebar-item ${content?.active_link === 'View Vouchers' ? 'active' : ''}`}>
              <Link to="/viewVouchers" className="sidebar-link">
                <i className="bi bi-calendar3 me-2"></i>
                <span>View Vouchers</span>
              </Link>
            </li>
            <li className={`sidebar-item ${content?.active_link === 'My Profile' ? 'active' : ''}`}>
              <Link to="/profile" className="sidebar-link">
                <i className="bi bi-person-square me-2"></i>
                <span>My Profile</span>
              </Link>
            </li>
            <li className={`sidebar-item ${content?.active_link === 'Contact Us' ? 'active' : ''}`}>
              <Link to="/contactUs" className="sidebar-link">
                <i className="bi bi-envelope-fill me-2"></i>
                <span>Contact Us</span>
              </Link>
            </li>
            <li className="sidebar-item" id="js_logout">
              <a className="sidebar-link">
                <i className="bi bi-power me-2"></i>
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const RibbonMenu = ({ content }) => {
  return (
    <div id="ribbon-menu" className="ribbon-menu mobile-only">
      <ul className="menu-list">
        {['dashboard', 'donate', 'Profile'].includes(content?.active_link) && (
          <>
            <li className="active">
              <Link to="/summary">
                <FontAwesomeIcon icon={faHouse} />Dashboard
              </Link>
            </li>
            <li>
              <Link to="/donate">
                <FontAwesomeIcon icon={faMoneyBillWave} />Donate
              </Link>
            </li>
            <li>
              <Link to="/transactionsOut">
                <FontAwesomeIcon icon={faMoneyBillWave} />Transactions
              </Link>
            </li>
          </>
        )}
        {['donationsIn', 'transactionList', 'transactionProof'].includes(content?.active_link) && (
          <>
            <li>
              <Link to="/transactionsOut">
                <FontAwesomeIcon icon={faMoneyBillWave} />Transactions Out
              </Link>
            </li>
            <li>
              <Link to="/donationsIn">
                <FontAwesomeIcon icon={faMoneyBillWave} />Transactions In
              </Link>
            </li>
            <li>
              <Link to="/transactionProof">
                <FontAwesomeIcon icon={faMoneyBillWave} />Create Receipt
              </Link>
            </li>
          </>
        )}
        {['orderBooks', 'viewBooks', 'viewVouchers', 'unusedVouchers', 'voucherBookOrders'].includes(content?.active_link) && (
          <>
            <li>
              <Link to="/viewBooks">
                <FontAwesomeIcon icon={faBook} />View Books
              </Link>
            </li>
            <li>
              <Link to="/orderBooks">
                <FontAwesomeIcon icon={faBook} />Order Books
              </Link>
            </li>
            <li>
              <Link to="/viewVouchers">
                <FontAwesomeIcon icon={faBook} />View Vouchers
              </Link>
            </li>
            <li>
              <Link to="/unusedVouchers">
                <FontAwesomeIcon icon={faBook} />Unused Vouchers
              </Link>
            </li>
            <li>
              <Link to="/voucherBooksOrders">
                <FontAwesomeIcon icon={faBook} />Voucher Book Orders
              </Link>
            </li>
          </>
        )}
        {['Card Order', 'activateCard'].includes(content?.active_link) && (
          <>
            <li className="active">
              <Link to="/summary">
                <FontAwesomeIcon icon={faHouse} />Dashboard
              </Link>
            </li>
            <li>
              <Link to="/orderCard">
                <FontAwesomeIcon icon={faMoneyBillWave} />Card Order
              </Link>
            </li>
            <li>
              <Link to="/activateCard">
                <FontAwesomeIcon icon={faPowerOff} />Activate Card
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

const Navbar = ({ htmlContent }) => {
  const [content, setContent] = useState(htmlContent || {});
  const [isMobile, setIsMobile] = useState(false);
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setContent(htmlContent || {});
  }, [htmlContent]);

  useEffect(() => {
    const handleResize = () => {
      const isLandingPage = location.pathname === '/';
      const shouldHideNavbar = window.innerHeight <= 768;

      setIsMobile(isLandingPage || window.innerWidth <= 768);
      setIsNavbarHidden(shouldHideNavbar);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check on component mount

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [location.pathname]);

  if (location.pathname === '/') {
    return null; // Don't render the Navbar on the LandingPage
  }

  return (
    <div
      id="navBar"
      className={`layout-container mobile-hide ${isNavbarHidden ? 'navbar-hidden' : ''}`}
      style={{ display: isMobile ? 'none' : 'flex' }}
    >
      <nav className="navbar">
        <LeftSideMenu content={content.leftmenu || {}} />
      </nav>
      <div className="main-content flex-1">
        <div id="main">
          {/* Placeholder for rendering main content */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;