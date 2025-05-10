import React, {lazy, Suspense, useState  ,useEffect} from 'react'
import MovieCard from '../components/MovieCards/MovieCard';
import "../CSS/navigation_pages/filter_pages.css"
import {
  UncontrolledAccordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from 'reactstrap';

//const LanguagesFilter = lazy(() => import('../components/Filters/LanguagesFilter'));
const LanguagesFilter = lazy(()=> import("../components/filter_panels/movies/LanguagesFilter"))

function PopularMovies() {

    const [opened, setOpened] = useState("")
    const [popMovies, setPopMovie] = useState([])
    const [movFilter, setMovFilter]=useState("")

    const [movGenres, setGenres]=useState([])
    const [page, setPage]= useState(1)

    const [selectedProvider, setSelectedProvider] = useState("");
    const [selectedGenre, setSelectedGenre]= useState("")

    const [userCountryCode, setUserCountryCode] = useState("");

    const API_KEY=import.meta.env.VITE_TMDB_KEY;

    console.log("rendered")
    useEffect(()=>{
      if(movFilter){
              console.log("Provider from main:"+selectedProvider)
              console.log("countryCode:"+userCountryCode)
              console.log("movFilter:"+movFilter)
              console.log("page:"+page)
        const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${page}&sort_by=${movFilter}&watch_region=${userCountryCode}&with_watch_providers=${selectedProvider}&with_genres=${selectedGenre}`;
        fetch(url)
          .then(res => res.json())
          .then(data =>setPopMovie(prev=>[...prev,...data.results])
          )

          .catch(err=>console.log(err))
          console.log("Work ue filter")
      }
      else{
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`)
        .then(res=>res.json())
        .then(data=>
             setPopMovie(prev=>[...prev,...data.results]))
        .catch(err=>console.log(err))
        console.log("Work ue popular")
      }
    },[page])

    useEffect(()=>{
      fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
      .then(res=>res.json())
      .then(data=>{
        console.log(data)
        setGenres(data.genres)}
      )
      .catch(err=>console.log(err))

      },[])

    
    function applyFilters(e){
      e.preventDefault();
      const formData = new FormData(e.target);

        const data = {
        filterMovieBySort: formData.get("sort-movies")
        }
      setMovFilter(data.filterMovieBySort)
      setPage(1);
        const sortURL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=1&sort_by=${data.filterMovieBySort}&watch_region=${userCountryCode}&with_watch_providers=${selectedProvider}&with_genres=${selectedGenre}`;
        fetch(sortURL)
          .then(res => res.json())
          .then(data => {
            console.log(data)
            setPopMovie(data.results);
          })
          .catch(err=>console.log(err))
          console.log("Work f filter")
      }



  return (
    <>

    <section className='filter-page'>
    <h2 className='filter-page-title'>Popular Movies</h2>

    <form onSubmit={applyFilters} className='filters-section'>
      <UncontrolledAccordion defaultOpen="0">

        <AccordionItem>
          <AccordionHeader targetId="1">
            <p className='filter-menu-title'>Sort</p>
          </AccordionHeader>
          <AccordionBody accordionId="1">
            <h3 className='sort-results-title'>Sort Results By</h3>
            <select name="sort-movies" id="sort-movies">
              <option value="popularity.desc">Popularity Descending</option>
              <option value="popularity.asc">Popularity Ascending</option>
              <option value="vote_average.desc">Rating Descending</option>
              <option value="vote_average.asc">Rating Ascending</option>
              <option value="primary_release_date.desc">Release Date Descending</option>
              <option value="primary_release_date.asc">Release Date Ascending</option>
            </select>
          </AccordionBody>
        </AccordionItem>

        <AccordionItem>
          <AccordionHeader targetId="2"  onClick={() => setOpened("2")} >
          <p  className='filter-menu-title'>Where to watch</p>
          </AccordionHeader>
          <AccordionBody accordionId="2">
              <Suspense fallback={<p>Loading...</p>}>
                  {opened === "2" && (
                  <LanguagesFilter selectedProvider={selectedProvider} setSelectedProvider={setSelectedProvider} setUserCountryCode={setUserCountryCode} userCountryCode={userCountryCode}/>
                  )}
              </Suspense>
          </AccordionBody>
        </AccordionItem>

        <AccordionItem>
          <AccordionHeader targetId="3">
          <p  className='filter-menu-title'>Filters</p>
          </AccordionHeader>
          <AccordionBody accordionId="3">
                  {movGenres.map(genre=>
                <div 
                  style={{
                    backgroundColor : selectedGenre===genre.id ? " #FCA311" : "#fefefefe",
                    cursor: "pointer",
                    color: selectedGenre===genre.id ? "white": "black"
                    }} 
                  onClick={()=>setSelectedGenre(genre.id)} key={genre.id}>{genre.name}
                </div>)}
          </AccordionBody>
        </AccordionItem>
        
      </UncontrolledAccordion>
      <button className='search-by-filters-button'>Search</button>
      </form>


        {popMovies.map((popMovie,index)=><MovieCard key={index} id={popMovie.id} title={popMovie.title} image_path={popMovie.poster_path} date={popMovie.release_date} overview={popMovie.overview}/>) }
          <button className='load-more-button' onClick={()=>setPage(prev=>prev+1)}>Load More</button>
      </section>
    </>
  )
}

export default PopularMovies
