import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
                },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.message);
      } else {
        navigate('/'); // Redirect to login page after successful registration
      }
    } catch (err) {
      setError('Failed to connect to the server. Please try again.');
      console.error('Registration error:', err);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      if (response.ok) {
        // toast.success("Password reset link sent to your email!");
        setIsForgotPassword(false);
      } else {
        // toast.error(data.message || "Something went wrong!");
      }
    } catch (error) {
      // toast.error("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-purple-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <div className="flex flex-col items-center mb-6">
          <img 
            src="/tablesprintlogo.svg"
            alt="TableSprint Logo" 
            className="h-12 w-12 mb-2"
          />
          <h1 className="text-xl font-semibold text-gray-800 mb-2">Create an Account</h1>
          <p className="text-sm text-gray-500 text-center">
            Sign up to get started with TableSprint
          </p>
        </div>

        {error && (
          <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {!isForgotPassword ? (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="sr-only">Email Address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                Create Account
              </button>

              <div className="text-center">
                <a href="/" className="text-sm text-purple-600 hover:text-purple-500">
                  Already have an account? Log in
                </a>
              </div>

            
            </div>
          </form>
        ) : (
          <form onSubmit={handleForgotPassword}>
            <h2>Forgot Password</h2>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Send Reset Link</button>
            <span 
              onClick={() => setIsForgotPassword(false)}
              style={{ cursor: "pointer" }}
            >
              Back to Register
            </span>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;
