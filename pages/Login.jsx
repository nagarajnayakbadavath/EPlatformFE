import React from 'react';

const Login = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl w-full">
        
        {/* Left Side Content */}
        <div className="flex-1 p-8 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">Login Now!</h1>
          <p className="text-gray-600">
            Welcome Back to Online E Platform
            Unlock your learning journey—access courses, track your progress, and continue building new skills. Please log in using your registered email and password to get started.
          </p>
        </div>

        {/* Login Form */}
        <div className="flex-1 p-8 bg-gray-50">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input type="checkbox"/><label>Are you Admin?</label>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="text-sm">
              <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
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
