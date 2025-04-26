import React from 'react'
import './CSS/App.css'
import MainLayout from './Layouts/MainLayout'
import {Routes, Route} from "react-router-dom"
import HomePage from './Pages/HomePage'
import SearchPage from './Pages/SearchPage'
import MovieDetailPage from './Pages/MovieDetailPage'

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<MainLayout/>}>
        <Route index element={<HomePage/>}/>
        <Route path='search' element={<SearchPage/>}>
        </Route>
        <Route path="movie/:id" element={<MovieDetailPage/>}/>
      </Route>
    </Routes>
    </>
  )
}

export default App
