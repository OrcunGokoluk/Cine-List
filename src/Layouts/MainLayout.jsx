import React from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdPerson } from "react-icons/io";
import '../CSS/main-layout.css'
import { Outlet, Link } from 'react-router-dom';
function MainLayout() {
  return (
    <>
    {/* --------------------------------------------------------------------- */}
      <header>
        <div className='hamburger-menu-logo'>
          <a href=""><RxHamburgerMenu/></a>
        </div>
        <h1><span>Cine</span>List</h1>
        <div className='account-icon'>
         <Link to="login"> <IoMdPerson/> </Link>
        </div>
      </header>
    {/* ------------------------------------------------------------------------ */}
      <main>
        <Outlet/>
      </main>
    {/* ----------------------------------------------------------------------- */}
    <div className='footer-placeholder'></div>
      <footer>
        <p>&copy; Orcun Gokoluk</p>
      </footer>
    </>
  )
}

export default MainLayout
