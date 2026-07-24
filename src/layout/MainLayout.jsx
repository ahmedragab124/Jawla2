import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './../shared/components/layout/Navbar';
import Footer from './../shared/components/layout/Footer';

function MainLayout() {
  return (
    <>
    <Navbar />
    <Outlet />
    <Footer />
    
    </>
  )
}

export default MainLayout