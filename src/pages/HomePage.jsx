import React from 'react'
import "../CSS/home_page/home-page.css"
import PopularMoviesSlider from '../components/sliders/PopularMoviesSlider'
import Searchbar from '../components/SearchBar'

function HomePage() {
  return (
    <>
    <Searchbar/>
    <section class="welcome-image">
      <div class="image-color-filter">
        <div className='welcome-content-body'>
          <h2>Welcome.</h2>
          <p>Discover your favorite movies and build your archive.
          Your movie experience is now more organized! Explore now.</p>
          <Searchbar className="main-menu-search"/>
        </div>
      </div>
    </section>
    <PopularMoviesSlider/>
    </>
  )
}

export default HomePage
