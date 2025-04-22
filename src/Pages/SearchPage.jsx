import React, { useEffect, useState } from 'react'
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useNavigate, useSearchParams } from 'react-router-dom'
import MovieCard from '../components/MovieCards/MovieCard';


function SearchPage() {
    const [movieData,setMovieData] = useState([]);
    const [searchParams]= useSearchParams();
    const navigate= useNavigate();
    const query = searchParams.get("query");
    const apiKey = import.meta.env.VITE_TMDB_KEY;
    

    async function getData(formData){
      const data = formData.get("searchbar");
      navigate(`?query=${data}`)
    }

    useEffect(()=>{
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=1&include_adult=false`

        fetch(url)
        .then(res=>{
          if(!res.ok){
            throw new Error("Error: ", res.status);
          }
           return res.json()}
        )

        .then(data=>{setMovieData(data.results)
          console.log(data.results)
        })
        .catch(error=>
          console.error(error))
    },[query])
    
  return (
    <>
      <form action={getData} className='input-wrapper'>
          <button  className='search-icon'><FaMagnifyingGlass  /></button>
          <input className='searchbar' type="text" name="searchbar" placeholder='Search'/>
      </form>
      <h2 className='search-results-text'>Search Results</h2>
       {movieData.length<1 ? <h2 className='notFound'>Oops! No movies found. Try checking the spelling or searching for something else.</h2>:""}
      {movieData ? movieData.map((movie)=> <MovieCard key={movie.id} title={movie.title} image_path={movie.poster_path} date={movie.release_date} overview={movie.overview}/> ):""}
    </>
  )
}

export default SearchPage
