import React, { useEffect, useState } from 'react'
import "../CSS/home_page/popular_movies.css"
import PopularMovieCard from "../components/MovieCards/PopularMovieCard"
function PopularMovies() {
    const [popularMovies ,setPopular] = useState([])

    const API_KEY = import.meta.env.VITE_TMDB_KEY;

    useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
        .then(res=>res.json())
        .then(data=>{
            setPopular(data.results);
            console.log(data.results)})
            .catch(console.error("Something Went Wrong!"))
    },[])

  return (
    <>
    <section className='popular'>
    <h2>What's Popular</h2>
      <div class="scrolling-wrapper">
        {popularMovies.map((movie, index)=><PopularMovieCard  key={index} id={movie.id} image_path={movie.poster_path} title={movie.title}/>)}
    </div>
    </section>

    </>
  )
}

export default PopularMovies
