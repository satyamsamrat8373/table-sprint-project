import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    setShowLogoutPopup(false);
  };

  const handleProfile = () => {
    setShowLogoutPopup(true);
  };

  return (
    <>
      <header className="bg-purple-700 shadow-lg">
        <div className="px-4 mx-auto py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img 
                src="/tablesprintlogo.svg" 
                alt="TableSprint Logo"
                className="h-8 w-8 mr-2"
              />
              <span className="text-white text-xl font-semibold">TableSprint</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button onClick={handleProfile} className="text-white hover:text-gray-200">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Logout Confirmation Popup */}
      {showLogoutPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80">
            <div className="flex flex-col items-center">
              <div className="mb-2">
                <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Log Out</h3>
              <p className="text-gray-500 text-center mb-6">Are you sure you want to log out?</p>
              
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowLogoutPopup(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
