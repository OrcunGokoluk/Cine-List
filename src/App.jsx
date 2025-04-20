import React from 'react'
import './CSS/App.css'
import MainLayout from './Layouts/MainLayout'
import {Routes, Route} from "react-router-dom"

function App() {

  return (
    <>
    <Routes>
      <Route index element={<MainLayout/>}>

      </Route>
    </Routes>s
    </>
  )
}

export default App
