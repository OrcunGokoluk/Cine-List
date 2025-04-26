import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
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
        .then(data=>setMovie(data))
    },[])

  return (
    <>
    <section className='movie-background-poster' style={imgStyle}>
        <div className='movie-background-poster-filter'></div>
    </section>
      <h2 className='movie-detail-title'>{movie.title}</h2>
    </>
  )
}

export default MovieDetailPage
