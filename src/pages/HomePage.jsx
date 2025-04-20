import React from 'react'
import "../CSS/home_page/home-page.css"
import PopularMovies from '../components/PopularMovies'

function HomePage() {
  return (
    <>
    <section class="welcome-image">
      <div class="image-color-filter">
        <h2>Welcome to CineList!</h2>
        <p>Discover your favorite movies and build your archive.
        Your movie experience is now more organized! </p>
      </div>
    </section>
    <PopularMovies/>
    </>
  )
}

export default HomePage
