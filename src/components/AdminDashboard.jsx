import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config';


const AdminDashboard = () => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/getAdmins`, { withCredentials: true })
      .then(res => {
        if (res.data.admins && res.data.admins.length > 0) {
          setAdmin(res.data.admins[0]);
        } else {
          console.error("No admin found");
        }
      })
      .catch(err => console.error("Fetch Error:", err));
  }, []);

  if (!admin) {
    return <div className="text-center mt-10 text-gray-600">Loading...</div>;
  }

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md text-center">
      <img
        className="w-32 h-32 rounded-full mx-auto object-cover border"
        src={admin.imageUrl}
        alt={admin.fullName}
      />
      <h2 className="text-xl font-bold mt-4">{admin.fullName}</h2>
      <p className="text-gray-600">{admin.emailId}</p>
      <span className="inline-block mt-2 text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-800 uppercase font-semibold">
        {admin.role}
      </span>
      <p className="text-sm text-gray-400 mt-2">
        Joined on {new Date(admin.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default AdminDashboard;
