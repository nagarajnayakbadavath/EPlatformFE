
import React from 'react'
import NavBar from './NavBar';
import { Outlet } from 'react-router-dom';



const Body = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-1">
        <Outlet />
      </main>
      
    </div>
  )
}

export default Body;
