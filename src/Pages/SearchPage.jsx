import React, { useEffect, useState } from 'react'
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useNavigate, useSearchParams, NavLink } from 'react-router-dom'
import MovieCard from '../components/MovieCards/MovieCard';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';


function SearchPage() {

  //States
    const [movieData,setMovieData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages]=useState(0);

  //Params
    const [searchParams]= useSearchParams();


    const navigate= useNavigate();
    const query = searchParams.get("query");
    let page = searchParams.get("page")
    const apiKey = import.meta.env.VITE_TMDB_KEY;
    

    async function getData(formData){
      const data = formData.get("searchbar");
      navigate(`?query=${data}`)
    }

    useEffect(()=>{
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=${page ? page : currentPage}&include_adult=false`

        fetch(url)
        .then(res=>{
          if(!res.ok){
            throw new Error("Error: ", res.status);
          }
           return res.json()}
        ).then(data=>{
          if (page) {
            setCurrentPage(page);
          }
          setMovieData(data.results)
          setTotalPages(data.total_pages)
          console.log(data)
        }).catch(error=>
          console.error(error))
    },[query, page])

    function genNewSearchParamString(key, value) {
      const sp = new URLSearchParams(searchParams)
      if (value === null) {
        sp.delete(key)
      } else {
        sp.set(key, value)
      }
      return `?${sp.toString()}`
    }
    
  return (
    <>
    {/* Form */}

      <form action={getData} className='input-wrapper'>
          <button  className='search-icon'><FaMagnifyingGlass  /></button>
          <input className='searchbar' type="text" name="searchbar" placeholder='Search'/>
      </form>
      <h2 className='search-results-text'>Search Results</h2>

    {/*Not Found */}

       {movieData.length<1 ? <h2 className='notFound'>Oops! No movies found. Try checking the spelling or searching for something else.</h2>:""}

    {/*Movie Cards */}

      {movieData ? movieData.map((movie)=> <MovieCard key={movie.id} id={movie.id} title={movie.title} image_path={movie.poster_path} date={movie.release_date} overview={movie.overview}/> ):""}

    {/*Pagination */}

      <Pagination className='pagination-container'>

        {/* << */}
      <NavLink to={genNewSearchParamString("page", "1")}>
        <PaginationItem>
          <PaginationLink
            first
            href="#"
          />
        </PaginationItem>
      </NavLink>
        {/* < */}
        <NavLink to={genNewSearchParamString("page", Number(currentPage)-1)}>
            <PaginationItem>
              <PaginationLink previous/>
            </PaginationItem>
        </NavLink>
        {/* - */}
        <NavLink to={genNewSearchParamString("page", Number(currentPage)-1)}>
            <PaginationItem>
              <PaginationLink>
              {`${currentPage}`}
              </PaginationLink>
            </PaginationItem>
          </NavLink>
        {/* current */}
          <NavLink  to={genNewSearchParamString("page", currentPage)}>
            <PaginationItem>
              <PaginationLink>
              {`${Number(currentPage)+1}`}
              </PaginationLink>
            </PaginationItem>
          </NavLink>
        {/* + */}
          <NavLink to={genNewSearchParamString("page", Number(currentPage)+2)}>
            <PaginationItem>
              <PaginationLink>
              {`${Number(currentPage)+2}`}
              </PaginationLink>
            </PaginationItem>
          </NavLink>
        {/* > */}
          <NavLink to={genNewSearchParamString("page", Number(currentPage)+1)}>
              <PaginationItem>
                <PaginationLink next/>
              </PaginationItem>
          </NavLink>
        {/* >> */}
          <NavLink to={genNewSearchParamString("page", totalPages)}>
            <PaginationItem>
              <PaginationLink
                href="#"
                last
              />
            </PaginationItem>
          </NavLink>
      </Pagination>
      </>
  )
}

export default SearchPage
