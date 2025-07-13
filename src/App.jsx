import { useState } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import NavBar from './components/NavBar'
import Body from './components/Body'
import Footer from './components/Footer'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Home from '../pages/Home'

function App() {
  
  return (
    <div>
      <BrowserRouter basename="/"> 
      <Routes>
        <Route path="/" element={<Body/>}>
        <Route index element={<Home/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
