import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config';


const Profile = () => {
  const [user, setuser] = useState("");

  useEffect(() => {
    const user_id=localStorage.getItem("_id");
    axios.get(`${API_URL}/${user_id}/getUser`, { withCredentials: true })
      .then(res => {
        setuser(res.data.user);
      })
      .catch(err => console.error("Fetch Error:", err));
  }, []);

  if (!user) {
    return <div className="text-center mt-10 text-gray-600">Loading...</div>;
  }

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md text-center">
      <img
        className="w-32 h-32 rounded-full mx-auto object-cover border"
        src={user.imageUrl}
        alt={user.fullName}
      />
      <h2 className="text-xl font-bold mt-4">{user.fullName}</h2>
      <p className="text-gray-600">{user.emailId}</p>
      <span className="inline-block mt-2 text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-800 uppercase font-semibold">
        {user.role}
      </span>
      <span className="inline-block mt-2 text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-800 uppercase font-semibold">
        Edit Profile
      </span>
      
    </div>
  );
};

export default Profile;
