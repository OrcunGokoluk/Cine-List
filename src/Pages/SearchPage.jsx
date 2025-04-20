import React, { useEffect, useState } from 'react'

import { useSearchParams } from 'react-router-dom'

function SearchPage() {
    const [movieData,setMovieData] = useState([]);
    const [searchParams]= useSearchParams();
    const query = searchParams.get("query");
    const apiKey = import.meta.env.VITE_TMDB_KEY;

    useEffect(()=>{
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=1&include_adult=false`
        fetch(url)
        .then(res=>res.json())
        .then(data=>setMovieData(data.results))
    },[])
  return (
    <>
      {movieData ? movieData.map(movie=> <p>{movie.title}</p> ):""}
    </>
  )
}

export default SearchPage
