import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config";

const NavBar = ({ isloggedIn, setIsloggedIn }) => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, [isloggedIn]); // Update role whenever login status changes

  const handleLogout = async () => {
    try {
      const res = await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
      if (res.status === 200) {
        setIsloggedIn(false);
        localStorage.removeItem("isloggedIn");
        localStorage.removeItem("role");
        setRole(""); // Reset role in state
        navigate("/");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Skillora</Link>
        <div className="flex gap-4">

          {isloggedIn ? (
            <>
              {role === "admin" ? (
                <>
                  <Link to="/enrolledStudents" className="hover:underline">Enrolled Students</Link>
                  <Link to="/uploadPDF" className="hover:underline">Upload PDF</Link>
                  <Link to="/uploadVideo" className="hover:underline">Upload New Courses</Link>
                  <Link to="/removeCourses" className="hover:underline">Remove Courses</Link>
                  <Link to="/removepdf" className="hover:underline">Remove PDF</Link>
                </>
              ) : role === "user" ? (
                <>
                  <Link to="/courses" className="hover:underline">Courses</Link>
                  <Link to="/viewpdf" className="hover:underline">PDF</Link>
                  <Link to="/profile" className="hover:underline">Profile</Link>
                </>
              ) : null}

              <button onClick={handleLogout} className="hover:underline">Logout</button>
            </>
          ) : (
            <>
              <Link to="/" className="hover:underline">Home</Link>
              <Link to="/about" className="hover:underline">About Us</Link>
              <Link to="/signup" className="hover:underline">Sign Up</Link>
              <Link to="/login" className="hover:underline">Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
