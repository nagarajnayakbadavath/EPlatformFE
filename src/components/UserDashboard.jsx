import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config';

const UserDashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const _id = localStorage.getItem("_id");
    axios.get(`${API_URL}/${_id}/getUser`, { withCredentials: true })
      .then(res => {
        setUser(res.data.user);
      })
      .catch(err => console.error(err.message));
  }, []);

  if (!user) {
    return <div className="p-6 text-xl font-semibold">Loading...</div>;
  }

  return (
    <div className="p-6 space-y-8">
      {/* Welcome Section */}
<div className="bg-blue-100 rounded-xl p-6 shadow-md flex items-center gap-4">
  <img
    src={user.imageUrl || "https://avatars.githubusercontent.com/u/1?v=4"} // fallback image
    alt="Profile"
    className="w-16 h-16 rounded-full border-2 border-blue-400 shadow"
  />

  <div>
    <h1 className="text-3xl font-bold text-blue-700">Welcome, {user.fullName}!</h1>
    <p className="text-gray-600 mt-1">Here's your learning overview.</p>
  </div>
</div>


      {/* User Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-white">
        <div className="bg-indigo-500 p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Email</h2>
          <p>{user.emailId}</p>
        </div>
        <div className="bg-green-500 p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Joined</h2>
          <p>{new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
        <div className="bg-purple-500 p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Courses Enrolled</h2>
          <p>{0}</p>
        </div>
      </div>

    </div>
  );
};

export default UserDashboard;
