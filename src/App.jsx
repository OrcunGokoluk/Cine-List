import React from 'react'
import './CSS/App.css'
import MainLayout from './Layouts/MainLayout'
import {Routes, Route} from "react-router-dom"
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import MovieDetailPage from './pages/MovieDetailPage'
import Overview from './components/movie_detail/Overview'
import Details from './components/movie_detail/Details'

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<MainLayout/>}>
        <Route index element={<HomePage/>}/>
        <Route path='search' element={<SearchPage/>}>
        </Route>
        <Route path="movie/:id" element={<MovieDetailPage/>}>
          <Route index element={<Overview/>}></Route>
          <Route path="detail" element={<Details/>}></Route>
        </Route>
      </Route>
    </Routes>
    </>
  )
}

export default App
