import React, { useState } from 'react';
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdPerson } from "react-icons/io";
import '../CSS/main-layout.css'
import { Outlet, Link } from 'react-router-dom';
import { IoArrowBackSharp } from "react-icons/io5";
import {NavLink} from "react-router-dom";
function MainLayout() {

 const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <>
    {/* --------------------------------------------------------------------- */}
      <header>
        <div className='hamburger-menu-logo'>
          <div onClick={()=>{setToggleMenu(prev=>!prev)}}><RxHamburgerMenu/></div>
        </div>
        <h1><span className='spn-logo'>Cine</span>List</h1>
        <div className='account-icon'>
         <Link to="login"> <IoMdPerson/> </Link>
        </div>
      </header>
    {/* ------------------------------------------------------------------------ */}
      <main>
        <nav className={`mobile-navigation ${toggleMenu?"":"close-menu"}`}>
         <div className='menu-arrow-icon'  onClick={()=>{setToggleMenu(prev=>!prev)}} ><IoArrowBackSharp/></div>
         <h2>Movies</h2>
         <ul className='navigation-list'>
            <li>
              <NavLink>Popular</NavLink>
            </li>
            <li>
              <NavLink>Top Rated</NavLink>
            </li>
            <li>
              <NavLink>Upcoming</NavLink>
            </li>
            <li>
              <NavLink>New Playing</NavLink>
            </li>
         </ul>
         <h2>TV Shows</h2>
         <ul className='navigation-list'>
            <li>
              <NavLink>Popular</NavLink>
            </li>
            <li>
              <NavLink>Top Rated</NavLink>
            </li>
            <li>
              <NavLink>Upcoming</NavLink>
            </li>
            <li>
              <NavLink>New Playing</NavLink>
            </li>
         </ul>
        </nav>
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
