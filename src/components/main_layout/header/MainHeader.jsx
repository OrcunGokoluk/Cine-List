import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import { NavLink, Link } from "react-router-dom";
import HamburgerMenu from "../hamburger_menu/HamburgerMenu";

function MainHeader() {
  const [toggleMovieMenu, setToggleMovieMenu] = useState(true);
  const [toggleTVeMenu, setToggleTVMenu] = useState(true);

  return (
    <>
      <header>
        <HamburgerMenu />

        <nav className="desktop-navigation">
          <h1>
           <NavLink to="/"><span className="spn-logo">Cine</span>List</NavLink> 
          </h1>
          <section className="main-menu-categories">
            <div
              className="nav-movie-container"
              onMouseEnter={() => setToggleMovieMenu(false)}
              onMouseLeave={() => setToggleMovieMenu(true)}
            >
              Movies <MdKeyboardArrowDown className="cinelist-orange" />
              <ul
                className={`navigation-list ${
                  toggleMovieMenu ? "hide-movie-categories" : ""
                }`}
              >
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
            {/* Split */}
            <div
              className="nav-tv-container"
              onMouseEnter={() => setToggleTVMenu(false)}
              onMouseLeave={() => setToggleTVMenu(true)}
            >
              TV Shows <MdKeyboardArrowDown className="cinelist-orange" />
              <ul
                className={`navigation-list ${
                  toggleTVeMenu ? " hide-tv-categories" : ""
                }`}
              >
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

        <div className="account-icon">
          <Link to="login">
            {" "}
            <IoMdPerson />{" "}
          </Link>
        </div>
      </header>
    </>
  );
}

export default MainHeader;
