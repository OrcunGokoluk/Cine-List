import React from 'react'
import "../../CSS/home_page/popular_movies.css"
import { Link } from 'react-router-dom';

function PopularMovieCard({id, image_path=null, title}) {

  return (
    <>
     {image_path ? 
      <Link to={`movie/${id}`}>
        <section className='popular-movie-card'>
          <img className='movie-image' src={`https://image.tmdb.org/t/p/w780${image_path}`}/>
          <p>{title.length>18? title.slice(0,15)+"...":title}</p>
        </section></Link>:""}

    </>
  )
}

export default PopularMovieCard
