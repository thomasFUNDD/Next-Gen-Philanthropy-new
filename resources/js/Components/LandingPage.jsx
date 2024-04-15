import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ForgotPasswordModal from './ForgotPasswordModal';
import OnlineAccessModal from './OnlineAccessModal';
import utaLogo from '../../images/logo.png';

const LandingPage = () => {
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [showOnlineAccessModal, setShowOnlineAccessModal] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  const effectRan = useRef(false);
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current += 1;
    console.log(`Component rendered ${renderCount.current} times`);

    const navBar = document.getElementById('navBar');
    if (navBar) {
      navBar.style.display = 'none';
    }

    const checkLoginStatus = async () => {
      console.log('Checking login status...');
      try {
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

        const response = await fetch('/checkIsLogin', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'X-CSRF-TOKEN': csrfToken,
          },
        });

        const data = await response.json();

        if (response.ok) {
          // User is logged in, do nothing
          console.log('User is logged in');
        } else {
          // Session expired or user is not logged in, clear session data and redirect to login page
          console.log('Session expired or user is not logged in');
          sessionStorage.removeItem('token');
          console.log('Navigating to login page');
          navigate('/');
        }
      } catch (error) {
        console.error('Failed to check login status:', error);
      }
    };

    if (!effectRan.current) {
      console.log('useEffect called for the first time');
      // Check login status initially
      checkLoginStatus();
      effectRan.current = true;
    } else {
      console.log('useEffect called subsequent times');
    }

    // Set up a timer to check login status every 5 minutes
    const timer = setInterval(() => {
      console.log('Timer triggered');
      checkLoginStatus();
    }, 5 * 60 * 1000);

    // Clean up the timer when the component unmounts
    return () => {
      console.log('Component unmounting');
      clearInterval(timer);
    };
  }, [navigate]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setUsernameError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setUsernameError('');
    setPasswordError('');

    if (!username.trim()) {
      setUsernameError('Username is required');
      return;
    }

    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    const loginData = {
      jwtusername: username,
      jwtpassword: password,
    };

    try {
      const response = await fetch(`/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRF-TOKEN': csrfToken,
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        const { token } = data;
        localStorage.setItem('token', token);
        // or
        sessionStorage.setItem('token', token);
        console.log('Navigating to summary page');
        navigate('/summary');
      } else {
        setUsernameError(data.message || 'Login failed');
        setPasswordError(data.message || 'Login failed');
        console.log('Login failed, navigating to login page');
        navigate('/');
      }
    } catch (error) {
      console.error('Login request failed:', error);
      setUsernameError('An unexpected error occurred. Please try again.');
    }

   
  };




  return (

    
    <div className="landing-page-container">


      <div className="landing-page-login-container">
        <div className="landing-page-form-container">
          <h1 className="landing-page-login-title">Login</h1>
          <p className="landing-page-login-subtitle">Log in with your data that you entered during registration.</p>
          <div className="landing-page-login-form">
            <form onSubmit={handleSubmit}>
              <input
                className="landing-page-form-control"
                placeholder="Username"
                value={username}
                onChange={handleUsernameChange}
                required
              />
              <input
                type="password"
                className="landing-page-form-control"
                placeholder="••••••••"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              {usernameError && <div className="landing-page-error">{usernameError}</div>}
              {passwordError && <div className="landing-page-error">{passwordError}</div>}
              <button type="submit" className="landing-page-login-button">
                Log in
              </button>
            </form>
          </div>
          <div className="landing-page-additional-links">
            <p><span>Existing Account, not registered for Online Access?</span> <a href="#" onClick={() => setShowOnlineAccessModal(true)}>Get Access</a></p>
            <p><span>Forgotten your password?</span> <a href="#" onClick={() => setShowForgotPasswordModal(true)}>Forgot Password</a></p>
            <p><span>Open a new BAT account?</span> <a href="/signup">Sign up.</a></p>
          </div>
        </div>
        <div className="landing-page-logo-container">
          <img src={utaLogo} alt="UTA Logo" className="landing-page-uta-logo" />
        </div>
      </div>
      {/* Modals */}
      <ForgotPasswordModal
        showModal={showForgotPasswordModal}
        closeModal={() => setShowForgotPasswordModal(false)}
      />
      <OnlineAccessModal
        showModal={showOnlineAccessModal}
        closeModal={() => setShowOnlineAccessModal(false)}
      />
    </div>
  );
};

export default LandingPage;