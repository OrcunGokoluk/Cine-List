import React from 'react'
import './CSS/App.css'
import MainLayout from './Layouts/MainLayout'
import {Routes, Route} from "react-router-dom"
import HomePage from './Pages/HomePage'

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<MainLayout/>}>
        <Route index element={<HomePage/>}/>
      </Route>
    </Routes>
    </>
  )
}

export default App
