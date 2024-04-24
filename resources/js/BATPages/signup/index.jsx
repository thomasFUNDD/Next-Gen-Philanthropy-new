import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import React from 'react';
import '../../assets/css/slick.css';
import logoColor from '../../assets/images/logo/logo-color.svg';
import logoWhite from '../../assets/images/logo/logo-white.svg';

const SignUpForm = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    postCode: '',
    nis: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    slider.current.slickNext();
  };

  const handlePrev = () => {
    slider.current.slickPrev();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    const { firstName, lastName, address1, postCode, phone, email, password, confirmPassword } = formData;
    const missingFields = [];

    if (!firstName) missingFields.push('First Name');
    if (!lastName) missingFields.push('Last Name');
    if (!address1) missingFields.push('Address Line 1');
    if (!postCode) {
      missingFields.push('Post Code');
    } else if (!/^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i.test(postCode)) {
      setErrorMessage('Please enter a valid UK post code.');
      setShowErrorModal(true);
      return;
    }
    if (!phone) missingFields.push('Phone');
    if (!email) {
      missingFields.push('Email');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      setShowErrorModal(true);
      return;
    }
    if (!password) {
      missingFields.push('Password');
    } else if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      setShowErrorModal(true);
      return;
    }
    if (!confirmPassword) {
      missingFields.push('Confirm Password');
    } else if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      setShowErrorModal(true);
      return;
    }

    if (missingFields.length > 0) {
      setErrorMessage(`Please fill in the following fields: ${missingFields.join(', ')}`);
      setShowErrorModal(true);
    } else {
      // Show success modal
      setShowSuccessModal(true);
    }
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: false,
    arrows: false,
    draggable: false,
    beforeChange: (oldIndex, newIndex) => {
      setStep(newIndex);
    },
  };

  const slider = React.useRef(null);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-lightPurple py-12">
      <div className="max-w-lg w-full">
        <Slider ref={slider} {...settings}>
          <div className="bg-darkPurple rounded-lg shadow-md p-8">
            <h3 className="text-xl font-bold text-white mb-4">Personal Information</h3>
            <div className="mb-4">
              <label htmlFor="firstName" className="block mb-2 font-bold text-white">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-3 py-2 text-white bg-midPurple border border-purple-400 rounded-lg focus:outline-none placeholder-white"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="block mb-2 font-bold text-white">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 text-white bg-midPurple border border-purple-400 rounded-lg focus:outline-none placeholder-white"
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleNext}
                className="px-4 py-2 font-bold text-white bg-lightPurple rounded-lg hover:bg-purple-600 focus:outline-none"
              >
                Next
              </button>
            </div>
          </div>
          <div className="bg-darkPurple rounded-lg shadow-md p-8">
            <h3 className="text-xl font-bold text-white mb-4">Address Details</h3>
            <div className="mb-4">
              <label htmlFor="address1" className="block mb-2 font-bold text-white">Address Line 1</label>
              <input
                type="text"
                id="address1"
                name="address1"
                placeholder="Enter your address"
                value={formData.address1}
                onChange={handleChange}
                className="w-full px-3 py-2 text-white bg-midPurple border border-purple-400 rounded-lg focus:outline-none placeholder-white"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="address2" className="block mb-2 font-bold text-white">Address Line 2 (Optional)</label>
              <input
                type="text"
                id="address2"
                name="address2"
                placeholder="Additional address information"
                value={formData.address2}
                onChange={handleChange}
                className="w-full px-3 py-2 text-white bg-midPurple border border-purple-400 rounded-lg focus:outline-none placeholder-white"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="postCode" className="block mb-2 font-bold text-white">Post Code</label>
              <input
                type="text"
                id="postCode"
                name="postCode"
                placeholder="Enter your post code"
                value={formData.postCode}
                onChange={handleChange}
                className="w-full px-3 py-2 text-white bg-midPurple border border-purple-400 rounded-lg focus:outline-none placeholder-white"
                required
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={handlePrev}
                className="px-4 py-2 font-bold text-white bg-lightPurple rounded-lg hover:bg-purple-600 focus:outline-none"
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                className="px-4 py-2 font-bold text-white bg-lightPurple rounded-lg hover:bg-purple-600 focus:outline-none"
              >
                Next
              </button>
            </div>
          </div>
          <div className="bg-darkPurple rounded-lg shadow-md p-8">
            <h3 className="text-xl font-bold text-white mb-4">Additional Information</h3>
            <div className="mb-4">
              <label htmlFor="nis" className="block mb-2 font-bold text-white">NIS (Optional)</label>
              <input
                type="text"
                id="nis"
                name="nis"
                placeholder="Enter your NIS"
                value={formData.nis}
                onChange={handleChange}
                className="w-full px-3 py-2 text-white bg-midPurple border border-purple-400 rounded-lg focus:outline-none placeholder-white"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block mb-2 font-bold text-white">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 text-white bg-midPurple border border-purple-400 rounded-lg focus:outline-none placeholder-white"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 font-bold text-white">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 text-white bg-midPurple border border-purple-400 rounded-lg focus:outline-none placeholder-white"
                required
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={handlePrev}
                className="px-4 py-2 font-bold text-white bg-lightPurple rounded-lg hover:bg-purple-600 focus:outline-none"
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                className="px-4 py-2 font-bold text-white bg-lightPurple rounded-lg hover:bg-purple-600 focus:outline-none"
              >
                Next
              </button>
            </div>
          </div>
          <div className="bg-darkPurple rounded-lg shadow-md p-8">
            <h3 className="text-xl font-bold text-white mb-4">Create Password</h3>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-2 font-bold text-white">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter a strong password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 text-white bg-midPurple border border-purple-400 rounded-lg focus:outline-none placeholder-white"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block mb-2 font-bold text-white">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 text-white bg-midPurple border border-purple-400 rounded-lg focus:outline-none placeholder-white"
                required
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={handlePrev}
                className="px-4 py-2 font-bold text-white bg-lightPurple rounded-lg hover:bg-purple-600 focus:outline-none"
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                className="px-4 py-2 font-bold text-white bg-lightPurple rounded-lg hover:bg-purple-600 focus:outline-none"
              >
                Next
              </button>
            </div>
          </div>
          <div className="bg-darkPurple rounded-lg shadow-md p-8">
            <h3 className="text-xl font-bold text-white mb-4">Summary</h3>
            <div className="mb-4">
              <p className="text-white"><strong>First Name:</strong> {formData.firstName}</p>
              <p className="text-white"><strong>Last Name:</strong> {formData.lastName}</p>
              <p className="text-white"><strong>Address Line 1:</strong> {formData.address1}</p>
              <p className="text-white"><strong>Address Line 2:</strong> {formData.address2}</p>
              <p className="text-white"><strong>Post Code:</strong> {formData.postCode}</p>
              <p className="text-white"><strong>NIS:</strong> {formData.nis}</p>
              <p className="text-white"><strong>Phone:</strong> {formData.phone}</p>
              <p className="text-white"><strong>Email:</strong> {formData.email}</p>
            </div>
            <div className="flex justify-between">
              <button
                onClick={handlePrev}
                className="px-4 py-2 font-bold text-white bg-lightPurple rounded-lg hover:bg-purple-600 focus:outline-none"
              >
                Previous
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 font-bold text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none"
              >
                Submit
              </button>
            </div>
          </div>
        </Slider>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Account Sign Up Successful</h2>
            <p className="mb-4">
              Thank you for signing up! We will contact you regarding your onboarding process at a later date.
            </p>
            <button
              onClick={() => {
                setShowSuccessModal(false);
                navigate('/landing-page');
              }}
              className="px-4 py-2 font-bold text-white bg-purple-500 rounded-lg hover:bg-purple-600 focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Missing Details</h2>
            <p className="mb-4">{errorMessage}</p>
            <button
              onClick={() => setShowErrorModal(false)}
              className="px-4 py-2 font-bold text-white bg-purple-500 rounded-lg hover:bg-purple-600 focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const SignUp = () => {
  return (
    <div className="min-h-screen bg-lightPurple">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <Link to="/" className="textxl font-bold text-purple-500">Logo</Link>
<nav>
<ul className="flex space-x-4">
<li><Link to="/signin" className="text-purple-500 hover:text-purple-700">Sign In</Link></li>
</ul>
</nav>
</div>
</header>
<main>
<SignUpForm />
</main>
<footer className="bg-white shadow-md mt-8">
<div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
<p className="text-purple-500">© 2023 Company. All rights reserved.</p>
<nav>
<ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
<li><Link to="#" className="text-purple-500 hover:text-purple-700">Terms & Condition</Link></li>
<li><Link to="#" className="text-purple-500 hover:text-purple-700">Privacy Policy</Link></li>
<li><Link to="#" className="text-purple-500 hover:text-purple-700">Help</Link></li>
</ul>
</nav>
</div>
</footer>
</div>
);
};

export default SignUp;