import React from 'react'
import Header from '../components/common/Navbar/Header'
import { Outlet } from 'react-router-dom';
import Footer from '../components/common/Navbar/Footer'

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout
