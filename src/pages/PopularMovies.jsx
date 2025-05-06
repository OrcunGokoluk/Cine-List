import React, {useState  ,useEffect} from 'react'
import MovieCard from '../components/MovieCards/MovieCard';
import "../CSS/navigation_pages/filter_pages.css"

function PopularMovies() {

    const [popMovies, setPopMovie] = useState([])
    const [page, setPage]= useState(1)


    const API_KEY=import.meta.env.VITE_TMDB_KEY;

    useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`)
        .then(res=>res.json())
        .then(data=>

        
             setPopMovie(prev=>[...prev,...data.results]))
        .catch(err=>console.log(err))
    },[page])
  return (
    <>
      {popMovies.map(popMovie=><MovieCard key={popMovie.id} id={popMovie.id} title={popMovie.title} image_path={popMovie.poster_path} date={popMovie.release_date} overview={popMovie.overview}/>) }
        <button className='load-more-button' onClick={()=>setPage(prev=>prev+1)}>Load More</button>
    </>
  )
}

export default PopularMovies
