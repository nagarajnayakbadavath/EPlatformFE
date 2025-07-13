import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";

const NavBar = ({ isloggedIn, setIsloggedIn }) => {

  const navigate=useNavigate();
  const handleLogout = async() => {
    try{
        const res=await axios.post(`${API_URL}/logout`,{},{ withCredentials:true });
        if(res.status===200){
          setIsloggedIn(false);
          localStorage.removeItem("isloggedIn");
          localStorage.removeItem("role");
          navigate("/"); //Home
        }else{
            setError("User or admin not loggedOut");
        }
    }catch(err){
        console.error(err.message);
    }
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">MyApp</Link>
        <div className="flex gap-4">
          {isloggedIn ? (
            <>
              <Link to="/courses" className="hover:underline">Courses</Link>
              <Link to="/my-learning" className="hover:underline">My Learning</Link>
              <Link to="/certificates" className="hover:underline">Certificates</Link>
              <Link to="/profile" className="hover:underline">Profile</Link>
              <button onClick={handleLogout} className="hover:underline">Logout</button>
            </>
          ):(
            <>
              <Link to="/" className="hover:underline">Home</Link>
              <Link to="/" className="hover:underline">About Us</Link>
              <Link to="/signup" className="hover:underline">Sign Up</Link>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="" className="hover:underline">Contact</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
