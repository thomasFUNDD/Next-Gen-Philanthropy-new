import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logoColor from "../../assets/images/logo/logo-color.svg";
import dashboardImage from "../../assets/images/logo/dashboard.png";
import purpleMasterCard from "../../assets/images/logo/purpleMasterCard.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faCreditCard, faLandmark, faHandHoldingUsd, faRocket, faCogs } from '@fortawesome/free-solid-svg-icons';
import Typed from 'typed.js';
import './animations.css';
import SignIn from '../signin';

const LandingPage = () => {
  const headingRef = useRef(null);
  const whiteSectionRef = useRef(null);
  const cardSectionRef = useRef(null);
  const footerSectionRef = useRef(null);

  useEffect(() => {
    const typedHeading = new Typed(headingRef.current, {
      strings: ['Banking for ambitious companies'],
      typeSpeed: 40,
      showCursor: false,
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    const observeSections = () => {
      if (whiteSectionRef.current) observer.observe(whiteSectionRef.current);
      if (cardSectionRef.current) observer.observe(cardSectionRef.current);
      if (footerSectionRef.current) observer.observe(footerSectionRef.current);
    };

    observeSections();

    // Add animation class to footer elements
    const footerElements = document.querySelectorAll('footer .container > div');
    footerElements.forEach(el => el.classList.add('footer-animate'));

    return () => {
      typedHeading.destroy();
      observer.disconnect();
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow bg-lightPurple min-h-screen relative">
        {/* Sticky Menu */}
        <nav className="sticky top-0 bg-lightPurple shadow-md z-10">
          <div className="container mx-auto px-4 py-6 flex justify-between items-center">
            <img src={logoColor} alt="Logo" className="h-8" />
            <ul className="flex space-x-8">
              <li><a href="#" className="text-gray-800 text-lg hover:text-darkPurple">Product</a></li>
              <li><a href="#" className="text-gray-800 text-lg hover:text-darkPurple">Solutions</a></li>
              <li><a href="#" className="text-gray-800 text-lg hover:text-darkPurple">Community</a></li>
              <li><a href="#" className="text-gray-800 text-lg hover:text-darkPurple">About</a></li>
            </ul>
            <div>
              <Link to={"/SignIn"}>
                <button className="px-6 py-2 bg-darkPurple text-white text-base rounded-lg hover:bg-purple-700">Log In</button>
              </Link>
              <button className="px-6 py-2 ml-4 bg-white text-darkPurple text-base border border-darkPurple rounded-lg hover:bg-purple-100">Open Account</button>
            </div>
          </div>
        </nav>

        <main className="container mx-auto px-4 py-12 flex flex-col justify-center items-center">
          <div className="text-center">
            <h1 ref={headingRef} className="text-4xl font-bold mb-4 text-gray-800"></h1>
            <p className="text-xl mb-6 text-gray-600">Apply in 10 minutes for business banking that transforms how you operate.</p>
            <div className="flex justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-64 px-4 py-2 text-base border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-6 py-2 bg-darkPurple text-white text-base rounded-r-lg hover:bg-purple-700">Open Account</button>
            </div>
          </div>
        </main>

        <div className="absolute bottom-0 left-0 right-0 flex justify-center mt-5">
          <img src={dashboardImage} alt="Dashboard" className="w-3/5 h-auto" />
        </div>
      </div>

      <div ref={whiteSectionRef} className="bg-white py-16 min-h-screen flex items-center">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-4xl font-bold mb-12 fade-up">Let banking power your financial operations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="text-center fade-up">
              <div className="mb-4"><FontAwesomeIcon icon={faBuilding} size="3x" /></div>
              <h3 className="text-lg font-semibold">Banking</h3>
              <p>FDIC-insured accounts</p>
            </div>
            <div className="text-center fade-up">
              <div className="mb-4"><FontAwesomeIcon icon={faCreditCard} size="3x" /></div>
              <h3 className="text-lg font-semibold">Corporate Credit Cards</h3>
              <p>Access credit faster</p>
            </div>
            <div className="text-center fade-up">
              <div className="mb-4"><FontAwesomeIcon icon={faLandmark} size="3x" /></div>
              <h3 className="text-lg font-semibold">Mercury Treasury</h3>
              <p>Lower-risk, high-liquidity portfolios</p>
            </div>
            <div className="text-center fade-up">
              <div className="mb-4"><FontAwesomeIcon icon={faHandHoldingUsd} size="3x" /></div>
              <h3 className="text-lg font-semibold">Payments</h3>
              <p>Send and receive money easily</p>
            </div>
            <div className="text-center fade-up">
              <div className="mb-4"><FontAwesomeIcon icon={faRocket} size="3x" /></div>
              <h3 className="text-lg font-semibold">Startup-friendly Capital</h3>
              <p>Scale with Venture Debt or SAFEs</p>
            </div>
            <div className="text-center fade-up">
              <div className="mb-4"><FontAwesomeIcon icon={faCogs} size="3x" /></div>
              <h3 className="text-lg font-semibold">Automated Workflows</h3>
              <p>Save time, eliminate errors</p>
            </div>
          </div>
          <div className="mt-12 text-center">
            <button className="px-6 py-2 bg-darkPurple text-white text-base rounded-lg hover:bg-purple-700">Explore Demo</button>
          </div>
        </div>
      </div>

      <div ref={cardSectionRef} className="bg-darkPurple py-16 min-h-screen flex items-center">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center">
            <div className="md:w-1/2 slide-left">
              <img src={purpleMasterCard} alt="Purple Mastercard" className="w-full max-w-xs sm:max-w-sm lg:max-w-md mx-auto" />
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0 md:pl-8 text-white slide-right">
              <h2 className="text-3xl font-bold mb-4">Fast-track your growth with credit cards</h2>
              <ul className="text-lg space-y-2">
                <li>→ Unlimited 1.5% cashback⁴</li>
                <li>→ Low deposit minimums</li>
                <li>→ Virtual cards for instant spending</li>
                <li>→ Spend management tools</li>
                <li>→ No interest or annual fees</li>
              </ul>
              <button className="mt-6 px-6 py-2 bg-white text-darkPurple text-base rounded-lg hover:bg-purple-100">Explore Cards</button>
            </div>
          </div>
        </div>
      </div>

      <footer ref={footerSectionRef} className="bg-black text-white py-12 min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
            <div>
              <h3 className="text-xl font-bold mb-4">Account</h3>
              <ul className="space-y-2">
                <li>Open Account</li>
                <li>Log In</li>
                <li>iOS App</li>
                <li>Android App</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Getting Started</h3>
              <ul className="space-y-2">
                <li>Product Demo</li>
                <li>How Mercury Works</li>
                <li>Vault</li>
                <li>Pricing</li>
                <li>Security</li>
                <li>Help Center</li>
                <li>API Access</li>
                <li>Personal Banking</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Scaling</h3>
              <ul className="space-y-2">
                <li>Checking &amp; Savings</li>
                <li>Credit Card</li>
                <li>Venture Debt</li>
                <li>Treasury</li>
                <li>SAFEs</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;