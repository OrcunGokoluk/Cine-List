import React from 'react';
import '../CSS/main_layout/main_layout.css'
import { Outlet } from 'react-router-dom';
import MainHeader from '../components/main_layout/header/MainHeader';

function MainLayout() {

  return (
    <>
    {/* --------------------------------------------------------------------- */}
      <MainHeader/>
    {/* ------------------------------------------------------------------------ */}
      <main> 
        <Outlet/>
      </main>
    {/* ----------------------------------------------------------------------- */}
      <footer>
        <p>&copy; Orcun Gokoluk</p>
      </footer>
    </>
  )
}

export default MainLayout
