import React from 'react'
import "../../CSS/search_page/search-page.css"
import { Link } from "react-router-dom"

function MovieCard({id,image_path, title, date ,overview}) {


  return (
    <>
    <Link to={`/movie/${id}`}>
      <div className='movie-search-card'>
           { image_path ? <img src={`https://image.tmdb.org/t/p/w780${image_path}`} alt={title} /> :
            <img className='placeholder-image' src="../../../public/images/movie_poster.png" alt={title}/>}
            <div className='ms-card-detail'>
                <p className='movie-title'>{title.slice(0,30)}{title.length>30 ? "...":""}</p>
                <p className='movie-date'>{date}</p>
                <p className='movie-overview'>{overview.slice(0,50)}{overview.length>50 ? "..." : ""  }</p>
            </div>
      </div>
      </Link>
    </>
  )
}

export default MovieCard
