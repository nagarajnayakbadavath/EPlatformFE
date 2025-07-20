import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { API_URL } from '../config';


const EnrolledStudents = () => {

    const [users,setUsers]=useState([]);

    useEffect(() => {
        axios.get(`${API_URL}/getUsers`,{ withCredentials:true }).then(res=>{
            setUsers(res.data.users);
        }).catch(err=>{console.error(err.message)});
    },[]);
    
    if(users.length===0){
        return <div>Loading....!</div>
    }
    return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {users.map(user => (
        <div key={user._id} className="bg-white p-4 rounded-xl shadow-md text-center">
          <img
            className="w-24 h-24 rounded-full mx-auto object-cover border"
            src={user.imageUrl}
            alt={user.fullName}
          />
          <h3 className="mt-3 font-bold text-lg">{user.fullName}</h3>
          <p className="text-gray-600">{user.emailId}</p>
          <span className="inline-block mt-2 text-xs px-3 py-1 rounded-full bg-green-100 text-green-800 uppercase font-medium">
            {user.role}
          </span>
          <p className="text-xs text-gray-400 mt-1">
            Joined on {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default EnrolledStudents
