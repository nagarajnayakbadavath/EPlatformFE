import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../src/config';

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOTP] = useState('');
  const [error, setError] = useState('');

  const [showOTPButton, setShowOTPButton] = useState(false);
  const [showOTPField, setShowOTPField] = useState(false);
  const [showVerifyButton, setShowVerifyButton] = useState(false);
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  
  const [fullNameError,setFullNameError]=useState('');
  const [emailError,setEmailError]=useState('');
  const [passwordError,setPaswordError]=useState('');
  
  const navigate = useNavigate();

  const handleGetOTP = async () => {
    try {
      const res = await axios.post(`${API_URL}/send-otp`, { emailId });
      if (res.status === 200) {
        setShowOTPField(true);
        alert(`An OTP has been sent to ${emailId}`);
      } else {
        alert("Failed to send OTP. Please try again.");
      }
    } catch (err) {
      console.error(err.message);
      alert("Error occurred while sending OTP.");
    }
  };

  const verifyOTP = async () => {
    try {
      const res = await axios.post(`${API_URL}/verify-otp`, { emailId, otp });
      if (res.status === 200) {
        alert("OTP verified successfully!");
        setIsOTPVerified(true);
        setShowOTPField(false);
        setShowVerifyButton(false);
        setShowOTPButton(false);
      } else {
        alert("Invalid OTP. Please try again.");
      }
    } catch (err) {
      console.error(err.message);
      alert("OTP verification failed.");
    }
  };

  const validateForm = (fullName, email, password) => {
  let fullNameError = '';
  let emailError = '';
  let passwordError = '';

  // Full Name Validation
  if (fullName.length <= 6) {
    fullNameError = 'Full name must be longer than 6 characters.';
  }

  // Email Validation
  const emailPattern = /^[a-z]+@gmail\.com$/;
  if (!emailPattern.test(email)) {
    emailError = 'Email must be in the format: lowercaseletters@gmail.com';
  }

  // Password Validation
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  if (!passwordPattern.test(password)) {
    passwordError = 'Password must contain uppercase, lowercase, number, symbol, and be at least 8 characters long.';
  }

  setFullNameError(fullNameError);
  setEmailError(emailError);
  setPaswordError(passwordError);

  return !fullNameError && !emailError && !passwordError;
};


  const handleRegistration = async (e) => {
    e.preventDefault();
    if (!isOTPVerified) {
      alert("Please verify the OTP before registering.");
      return;
    }
    const isValid = validateForm(fullName, emailId, password);
    if(!isValid) return;
    try {
      const res = await axios.post(`${API_URL}/user/register`, {
        fullName,
        emailId,
        password,
      });
      if (res.status===200) {
        navigate('/login');
      }else{
        setError("Registration failed. Please try again.");
      }
    } catch (err) {
      if (err.response?.status === 409) {
        setError(err.response.data.message);
      }else{
        console.error(err.message);
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl w-full">
        <div className="flex-1 p-8 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">Signup Now!</h1>
          <p className="text-gray-600">
            Join our platform to access high-quality courses, study materials, and interactive learning experiences.
            Whether you're looking to upgrade your skills or explore new topics, LearnSphere helps you learn at your own pace with expert guidance.
            Register today and start your learning journey with us.
          </p>
        </div>

        <div className="flex-1 p-8 bg-gray-50">
          <form className="space-y-4" onSubmit={handleRegistration}>
            <div>
              {fullNameError}<label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                value={fullName}
                placeholder="Full Name"
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {fullNameError && (
  <p className="text-red-500 text-sm mt-1">{fullNameError}</p>)}
              <label className="block text-sm font-medium mb-1 mt-4">Email</label>
              <input
                type="email"
                value={emailId}
                placeholder="Email"
                onChange={(e) => {
                  setEmailId(e.target.value);
                  setShowOTPButton(true);
                }}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {emailError && (
  <p className="text-red-500 text-sm mt-1">{emailError}</p>)}
              {showOTPButton && !isOTPVerified && (
                <button
                  type="button"
                  className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                  onClick={handleGetOTP}
                >
                  Get OTP
                </button>
              )}
            </div>

            {showOTPField && !isOTPVerified && (
              <div>
                <label className="block text-sm font-medium mb-1 mt-4">Enter OTP</label>
                <input
                  type="text"
                  value={otp}
                  placeholder="Enter OTP"
                  onChange={(e) => {
                    setOTP(e.target.value);
                    setShowVerifyButton(e.target.value.trim().length > 0);
                  }}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            {showVerifyButton && !isOTPVerified && (
              <button
                type="button"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                onClick={verifyOTP}
              >
                Verify OTP
              </button>
            )}

            <div>
              <label className="block text-sm font-medium mb-1 mt-4">Create Password</label>
              <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {passwordError && (
  <p className="text-red-500 text-sm mt-1">{passwordError}</p>)}
            </div>

            {error && <p className="text-red-600">{error}</p>}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition mt-4"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
