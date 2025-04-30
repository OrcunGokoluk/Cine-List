import React, { useEffect, useState } from 'react'
import { NavLink, useParams, Outlet } from 'react-router-dom'
import "../CSS/movie_detail_page/movie_detail.css"

function MovieDetailPage() {

    const [movie, setMovie]=useState("")

    const params = useParams();
    const API_KEY = import.meta.env.VITE_TMDB_KEY;
    const background_image_url = `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`

    const imgStyle = {
        backgroundImage: `url(${background_image_url})`
    }

    useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/movie/${params.id}?api_key=${API_KEY}`)
        .then(res=>res.json())
        .then(data=>{console.log(data)
          setMovie(data)
        })
    },[])

  return (
    <>
    <section className='movie-background-poster' style={imgStyle}>
      <div className='movie-background-poster-filter'>
          <img src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}/>
        <section className="detail">
          <h2>{movie.title}</h2>
          <article className='detail-body'>
            <nav>
              <NavLink to="" end className={({ isActive })=>(isActive?"active-detail-link":"inactive-detail-link")} >Overview</NavLink>
              <NavLink to="detail" className={({ isActive })=>(isActive?"active-detail-link":"inactive-detail-link")}>Details</NavLink>
            </nav>

            <div className='content-container'>
              <Outlet context={{overview:movie.overview, tagline:movie.tagline}}/>
            </div>
          </article>

        </section>
      </div>
      
    </section>


    </>
  )
}

export default MovieDetailPage
