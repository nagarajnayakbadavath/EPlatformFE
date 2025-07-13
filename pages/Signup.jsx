import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../src/config';

const Signup = () => {
    const [fullName,setFullName]=useState("");
    const [emailId,setEmailId]=useState("");
    const [password,setPassword]=useState("");

    const [showotpfield,setShowotpfield]=useState(false);
    const [showVerifyField,setShowVerifyField]=useState(false);
    const [showVerifybtn,setShowVerifybtn]=useState(false);
    const [error,setError]=useState("");
    const [otp,setOTP]=useState("");
    const [isotpverified,setIsotpverified]=useState(false);

    const navigate=useNavigate();

    const HandleShowOTPbtn=async(e)=>{
      setEmailId(e.target.value);
        setShowotpfield(true);
    }

    const handleGetOTP=async()=>{
      try{
        const res=await axios.post(`${API_URL}/send-otp`,{emailId});
        if(res.status===200){
            setShowVerifyField(true);
            alert(`an otp is send to your ${emailId}`);
        }else{
            setShowVerifyField(false);
            alert("otp is not send to your mail");
        }
      }catch(err){
        console.error(err.message);
        alert("Error occured while sending an otp");
      }
    }

    const verifyOTP=async()=>{
      try{
          const res=await axios.post(`${API_URL}/verify-otp`,{
            emailId,otp
          });
          if(res.status===200){
            alert("otp is verified Thank you!");
            setIsotpverified(true);
            //HandleRegistration();
          }else{
            alert("you entered a wrong otp.I guess");
          }
          //after verifyting the otp disable the verify field and working or get otp button and also verify button
          setShowVerifyField(false);
          setShowVerifybtn(false);
          setShowotpfield(false);
      }catch(err){
        console.error(err.message);
        alert("verification of otp is failed");
      }
    }

    const handleOTP=(e)=>{
        setShowVerifybtn(true);
    }

    const HandleRegistration=async(e)=>{
      e.preventDefault();
      if(!isotpverified){
        alert("verify the otp first");
        return;
      }
        try{
            const res=await axios.post(`${API_URL}/user/register`,{
                fullName,
                emailId,
                password
            });
            if(res.status===200){
              navigate("/login");
            }else{
              setError("Registration failed");
            }
        }catch(err){
            console.error(err.message);
        }
    }
    
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl w-full">
        
        <div className="flex-1 p-8 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">Signup Now!</h1>
          <p className="text-gray-600">
            Join our platform to access high-quality courses, study materials, and interactive learning experiences.
            Whether you're looking to upgrade your skills or explore new topics, LearnSphere helps you learn at your own pace with expert guidance.
            Register today and start your learning journey with us
          </p>
        </div>

        <div className="flex-1 p-8 bg-gray-50">
          <form className="space-y-4">
            <div>
                <label className="block text-sm font-medium mb-1">fullName</label>
              <input
                type="text"
                value={fullName}
                placeholder="fullName"
                onChange={(e)=>setFullName(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="text"
                value={emailId}
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={HandleShowOTPbtn}
              />
              {showotpfield && (
                <button type="button"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition" onClick={handleGetOTP}>
                  GET OTP
                </button>
              )}
            </div>
            {showVerifyField && (
                <input type="text" value={otp} placeholder="enter the otp to verify" className="w-full px-4 py-2 border rounded-md"
                onChange={(e) => {
            if (e.target.value.trim().length > 0) {
                setOTP()
                setShowVerifybtn(true);
            } else {
                setShowVerifybtn(false);
            }}}
            />
            )}
            {showVerifybtn && (
                <button type="button" onClick={verifyOTP} className="">
                    Verify OTP
                </button>
            )}
            <div>
              <label className="block text-sm font-medium mb-1">Create Password</label>
              <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e)=>setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition" onClick={HandleRegistration}>
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;