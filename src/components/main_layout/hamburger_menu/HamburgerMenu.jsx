import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoArrowBackSharp } from "react-icons/io5";

function HamburgerMenu() {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <>
      <div className="hamburger-menu-logo">
        <div
          onClick={() => {
            setToggleMenu((prev) => !prev);
          }}
        >
          <RxHamburgerMenu />
        </div>
      </div>

      {/* HamburgerMenu */}
      <nav className={`mobile-navigation ${toggleMenu ? "" : "close-menu"}`}>
        <div
          className="menu-arrow-icon"
          onClick={() => {
            setToggleMenu((prev) => !prev);
          }}
        >
          <IoArrowBackSharp />
        </div>
        <h2>Movies</h2>
        <ul className="navigation-list">
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
        <ul className="navigation-list">
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
    </>
  );
}

export default HamburgerMenu;
