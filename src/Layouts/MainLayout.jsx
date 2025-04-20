import React from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import '../CSS/main-layout.css'
function MainLayout() {
  return (
    <>
      <header>
        <div className='hamburger-menu-logo'>
             <RxHamburgerMenu/>
        </div>
        <h1><span>Cine</span>List</h1>
        <div></div>
      </header>
    </>
  )
}

export default MainLayout
