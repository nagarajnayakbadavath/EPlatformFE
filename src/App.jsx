import { useState } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import NavBar from './components/NavBar'
import Body from './components/Body'
import Footer from './components/Footer'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Home from '../pages/Home'
import UserDashboard from './components/UserDashboard'
import AdminDashboard from './components/AdminDashboard'
import Courses from './components/Courses'
import Certificates from './components/Certificates'
import Profile from './components/Profile'
import AboutUs from '../pages/AboutUs'
import EnrolledStudents from './components/EnrolledStudents'
import UploadPDF from './components/UploadPDF'
import UploadNewCourses from './components/UploadNewCourses'
import RemoveCourses from './components/RemoveCourses'
import ViewPdfs from './ViewPdfs'
import RemovePDF from './components/RemovePDF'

function App() {
  const [isloggedIn, setIsloggedIn] = useState(() => {
  return localStorage.getItem("isloggedIn") === "true";
});
  
  return (
    <div>
      <BrowserRouter basename="/"> 
        <NavBar isloggedIn={isloggedIn} setIsloggedIn={setIsloggedIn} />
      <Routes>
        <Route path="/" element={<Body/>}>
        <Route index element={<Home/>}/>
        <Route path="/about" element={<AboutUs/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login setIsloggedIn={setIsloggedIn}/>}/>
        <Route path="/userDashboard" element={<UserDashboard/>}/>
        <Route path="/adminDashboard" element={<AdminDashboard/>}/>
        <Route path="/uploadPDF" element={<UploadPDF/>}/>
        <Route path="/uploadVideo" element={<UploadNewCourses/>}/>
        <Route path="/removeCourses" element={<RemoveCourses/>}/>
        <Route path="/enrolledStudents" element={<EnrolledStudents/>}/>
        <Route path="/courses" element={<Courses/>}/>
        <Route path="/certificates" element={<Certificates/>}/>
        <Route path="/viewpdf" element={<ViewPdfs/>}/>
        <Route path="/removepdf" element={<RemovePDF/>}/>
        <Route path="/profile" element={<Profile/>}/>
        </Route>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App
