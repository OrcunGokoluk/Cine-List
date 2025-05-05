import React, { useState } from 'react';
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdPerson } from "react-icons/io";
import '../CSS/main-layout.css'
import { Outlet, Link } from 'react-router-dom';
import { IoArrowBackSharp } from "react-icons/io5";
import {NavLink} from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
function MainLayout() {

 const [toggleMenu, setToggleMenu] = useState(false);

 const [toggleMovieMenu, setToggleMovieMenu] = useState(true);
 const [toggleTVeMenu, setToggleTVMenu] = useState(true);

  return (
    <>
    {/* --------------------------------------------------------------------- */}
      <header>
        <div className='hamburger-menu-logo'>
          <div onClick={()=>{setToggleMenu(prev=>!prev)}}><RxHamburgerMenu/></div>
        </div>
        <nav className="desktop-navigation">
        <h1><span className='spn-logo'>Cine</span>List</h1> 
         <section className='main-menu-categories'>
              <div className='nav-movie-container' onMouseEnter={()=>setToggleMovieMenu(false)} onMouseLeave={()=>setToggleMovieMenu(true)}>Movies <MdKeyboardArrowDown className='cinelist-orange'/>
                <ul className={`navigation-list ${toggleMovieMenu?"hide-movie-categories":""}`}>
                  <li>
                    <NavLink to="movie">Popular</NavLink>
                  </li>
                  <li>
                    <NavLink to="movie/top-rated">Top Rated</NavLink>
                  </li>
                  <li>
                    <NavLink to="movie/upcoming">Upcoming</NavLink>
                  </li>
                  <li>
                    <NavLink to="movie/new-playing">New Playing</NavLink>
                  </li>
              </ul>
              </div>
              <div className='nav-tv-container' onMouseEnter={()=>setToggleTVMenu(false)} onMouseLeave={()=>setToggleTVMenu(true)}>TV Shows <MdKeyboardArrowDown className='cinelist-orange'/>
              <ul className={`navigation-list ${toggleTVeMenu ? " hide-tv-categories":""}`}>
                  <li>
                    <NavLink to="tv">Popular</NavLink>
                  </li>
                  <li>
                    <NavLink to="tv/top-rated">Top Rated</NavLink>
                  </li>
                  <li>
                    <NavLink to="tv/upcoming">Upcoming</NavLink>
                  </li>
                  <li>
                    <NavLink to="tv/airing-today">Airing Today</NavLink>
                  </li>
              </ul>
              </div>
         </section>
        </nav>
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
              <NavLink to="movie">Popular</NavLink>
            </li>
            <li>
              <NavLink to="movie/top-rated">Top Rated</NavLink>
            </li>
            <li>
              <NavLink to="movie/upcoming">Upcoming</NavLink>
            </li>
            <li>
              <NavLink to="movie/new-playing">New Playing</NavLink>
            </li>
         </ul>
         <h2>TV Shows</h2>
         <ul className='navigation-list'>
            <li>
              <NavLink to="tv">Popular</NavLink>
            </li>
            <li>
              <NavLink to="tv/top-rated">Top Rated</NavLink>
            </li>
            <li>
              <NavLink to="tv/upcoming">Upcoming</NavLink>
            </li>
            <li>
              <NavLink to="tv/airing-today">Airing Today</NavLink>
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
