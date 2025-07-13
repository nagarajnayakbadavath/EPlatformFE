import { Link } from "react-router-dom";
import { useState } from "react";

const NavBar = ({ isloggedIn, setIsloggedIn }) => {
  const handleLogout = () => {
    setIsloggedIn(false);
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">MyApp</Link>
        <div className="flex gap-4">
          {isloggedIn ? (
            <>
              <Link to="/courses">Courses</Link>
              <Link to="/my-learning">My Learning</Link>
              <Link to="/certificates">Certificates</Link>
              <Link to="/profile">Profile</Link>
              <button onClick={handleLogout}>Logout</button>
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
