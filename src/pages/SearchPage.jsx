import React, { useEffect, useMemo, useState, useRef } from 'react'
import { FaMagnifyingGlass, FaPagelines } from "react-icons/fa6";
import { useNavigate, useSearchParams, NavLink } from 'react-router-dom'
import MovieCard from '../components/MovieCards/MovieCard';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';


function SearchPage() {

  //States
    const [movieData,setMovieData] = useState([]);
    const [totalPages, setTotalPages]=useState(0);

  //Params
    const [searchParams]= useSearchParams();

    const navigate= useNavigate();
    const query = searchParams.get("query");
    const currentPage = searchParams.get("currentPage")
    const apiKey = import.meta.env.VITE_TMDB_KEY;

    const prevQueryRef = useRef(query);
    
console.log("rendered")

    async function getData(formData){
      const data = formData.get("searchbar");
      navigate(`?query=${data}`)
    }

    useEffect(()=>{
        if (query && Number(currentPage) !== 1 && query !== prevQueryRef.current) {
          navigate(genNewSearchParamString("currentPage","1"), {replace: true})
        }
    },[query])

    useEffect(()=>{
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=${currentPage ? currentPage : "1"}&include_adult=false`

        fetch(url)
        .then(res=>{
          if(!res.ok){
            throw new Error("Error: ", res.status);
          }
           return res.json()}
        ).then(data=>{
          setMovieData(data.results)
          setTotalPages(data.total_pages)
          console.log(data)
        }).catch(error=>
          console.error(error))
    },[query,currentPage])



    const incrementPages = useMemo(()=>{
      const pg = [];
      for(let a = Number(currentPage)+1; a<Number(currentPage)+4; a++){
        pg.push(a)
        if(a===totalPages){
          break;
        }
      }
      return pg;
    },[currentPage,totalPages])

    const decrementPages = useMemo(()=>{
      const pg = [];
      for(let a = Number(currentPage)-1; a>Number(currentPage)-3; a--){
        pg.push(a)
        if(a===1){
          break;
        }
      }
      return pg.reverse();
    },[currentPage,totalPages])

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
        {  Number(currentPage)-1<=0 ? "":
      <>

        {/* Decreasers*/}
          {/* << */}
        <NavLink to={genNewSearchParamString("currentPage", "1")}>
          <PaginationItem>
            <PaginationLink
            tag="span"
            className="pagination-button"
              first
              href="#"
            />
          </PaginationItem>
        </NavLink>
        
          {/* < */}
        <NavLink to={genNewSearchParamString("currentPage", Number(currentPage)-1)}>
            <PaginationItem>
              <PaginationLink
              tag="span"
              className="pagination-button"
                previous/>
            </PaginationItem>
        </NavLink>

          {/* Decrememt map */}

          { 
        decrementPages.map(pageNm =>
        <NavLink to={genNewSearchParamString("currentPage", pageNm)}>
          <PaginationItem>
            <PaginationLink
            tag="span"
            className="pagination-button">
            {`${pageNm}`}
            </PaginationLink>
          </PaginationItem>
        </NavLink>)
          }
          </> 

            }
        {/* ------------------------------------------------------------------------------ */}
          {/* current */}
        <NavLink  to={genNewSearchParamString("currentPage", currentPage )}>
          <PaginationItem>
            <PaginationLink 
            tag="span"
            className='current-page'>
            {`${currentPage}`}
            </PaginationLink>
          </PaginationItem>
        </NavLink>
        {/* ------------------------------------------------------------------------------ */}
          {/* Increasers*/}
          {/* + */}
        {
        Number(currentPage)+1>totalPages?"":
        <>
        {/* increment map */}
        {incrementPages ? incrementPages.map(a=>
        <NavLink to={genNewSearchParamString("currentPage", a)}>
          <PaginationItem>
            <PaginationLink
            tag="span"
            className="pagination-button">
            {`${a}`}
            </PaginationLink>
          </PaginationItem>
        </NavLink>):""}
        {/* > */} 
        <NavLink to={genNewSearchParamString("currentPage", Number(currentPage)+1)}>
            <PaginationItem>
              <PaginationLink
              tag="span"
              className="pagination-button"
                next/>
            </PaginationItem>
        </NavLink>
        {/* >> */}
        <NavLink to={genNewSearchParamString("currentPage", totalPages)}>
          <PaginationItem>
            <PaginationLink
              tag="span"
              href="#"
              className="pagination-button"
              last
            />
          </PaginationItem>
        </NavLink></>}
      </Pagination>
    </>

  )

}

export default SearchPage
