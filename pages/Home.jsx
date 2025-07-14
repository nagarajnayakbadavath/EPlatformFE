import React from 'react'
import { useNavigate } from 'react-router-dom';
const Home = () => {

  const navigate=useNavigate();
  const handleGetStarted=()=>{
    navigate("/signup");
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
  <div className="flex flex-col md:flex-row items-center bg-white p-8 rounded-2xl shadow-lg max-w-4xl">
    <img
      src="https://www.esicm.org/wp-content/uploads/2017/06/elearning.png"
      alt="E-Learning"
      className="w-full md:w-1/2 rounded-lg"
    />
    <div className="text-center md:text-left md:ml-8 mt-6 md:mt-0">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">Hello there</h1>
      <p className="text-gray-600 mb-6">
        Skillora is an online learning platform designed for students and lifelong learners to grow practical skills in technology, business, academics, and personal development.
It focuses on providing structured courses, flexible learning paths, and a community-driven experience.
      </p>
      <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
      onClick={handleGetStarted}>
        Get Started
      </button>
    </div>
  </div>
</div>

  )
}

export default Home;
