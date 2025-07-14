import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../src/config';
import axios from 'axios';


const Login = ({ setIsloggedIn }) => {
  const [emailId,setEmailId]=useState("");
  const [isAdmin,setIsAdmin]=useState(false);
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
  const navigate=useNavigate();

  const handleLogin=async(e)=>{
    e.preventDefault();
    setError('');
    try{
      let res;
      if(isAdmin){
          res=await axios.post(`${API_URL}/admin/login`,{
          emailId,
          password,
          isAdmin
          },{ withCredentials: true });
      }else{
            res=await axios.post(`${API_URL}/user/login`,{
            emailId,
            password
          },{ withCredentials: true });
      }
      if(res.data.success){
        setIsloggedIn(true);
        localStorage.setItem("isloggedIn", "true");
        localStorage.setItem("role", res.data.role); // optional if you need role later
      navigate(res.data.role === 'admin' ? '/adminDashboard' : '/userDashboard');
      }else{
        setError("Invalid Mail or Password!");
        console.error("user or admin login is not successfull");
      }
    }catch(err){
      console.error(err.message);
      setError(err.message);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl w-full">
        
        
        <div className="flex-1 p-8 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">Login Now!</h1>
          <p className="text-gray-600">
            Welcome Back to Online E Platform
            Unlock your learning journey—access courses, track your progress, and continue building new skills. Please log in using your registered email and password to get started.
          </p>
        </div>

        <div className="flex-1 p-8 bg-gray-50">
          <form className="space-y-4">
            <div>
              {error && (
  <p className="text-red-500 text-sm mt-1">{error}</p>)}
              <label className="block text-sm font-medium mb-1">EmailId</label>
              <input
                type="email"
                value={emailId}
                onChange={(e)=>setEmailId(e.target.value)}
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input type="checkbox" checked={isAdmin} onChange={(e)=>setIsAdmin(e.target.checked)}/><label>Are you Admin?</label>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="text-sm">
              <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              onClick={handleLogin}
            >
              Login
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Login;
