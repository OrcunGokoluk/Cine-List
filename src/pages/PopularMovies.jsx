import React, {useState  ,useEffect} from 'react'
import MovieCard from '../components/MovieCards/MovieCard';
import "../CSS/navigation_pages/filter_pages.css"
import {
  UncontrolledAccordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from 'reactstrap';

function PopularMovies() {

    const [popMovies, setPopMovie] = useState([])
    const [movFilter, setMovFilter]=useState(null)
    const [languages, setLanguages] = useState([])
    const [providers, setProviders] = useState([])
    const [page, setPage]= useState(1)
    const [selectedProvider, setSelectedProvider] = useState(null);



    const API_KEY=import.meta.env.VITE_TMDB_KEY;

    useEffect(()=>{
      if(movFilter&&movFilter!=="popularity.desc"){
        const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${page}&sort_by=${movFilter.sort}&watch_region=${movFilter.countryCode}&with_watch_providers=${selectedProvider}`;
        fetch(url)
          .then(res => res.json())
          .then(data => {
            setPopMovie(prev=>[...prev,...data.results]);
          })
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
      fetch(`https://api.themoviedb.org/3/watch/providers/regions?api_key=${API_KEY}`)
      .then(res=>res.json())
      .then(data=>{
          console.log(data)
          setLanguages(data.results)})
      .catch(err=>console.log(err))
      },[])

    
    function applyFilters(e){
      e.preventDefault();
      const formData = new FormData(e.target);
      const data = {
        filterMovieBySort: formData.get("sort-movies"),
        countryCode: formData.get("where-to-watch")
        }
      setMovFilter({sort:data.filterMovieBySort, countryCode:data.countryCode})
        const sortURL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=1&sort_by=${data.filterMovieBySort}&watch_region=${data.countryCode}&with_watch_providers=${selectedProvider}`;
        fetch(sortURL)
          .then(res => res.json())
          .then(data => {
            setPopMovie(data.results);
            setPage(1);
          })
          .catch(err=>console.log(err))
          console.log("Work f filter")
      }

      function getProviders(dataFromOption){
        const providerURL =`https://api.themoviedb.org/3/watch/providers/movie?api_key=${API_KEY}&watch_region=${dataFromOption}`
        fetch(providerURL)
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setProviders(data.results)
        })
        .catch(err=>console.log(err)) 
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
          <AccordionHeader targetId="2">
          <p  className='filter-menu-title'>Where to watch</p>
          </AccordionHeader>
          <AccordionBody accordionId="2">
          <h3 className='sort-results-title'>Country</h3>
          <select onChange={(e)=>getProviders(e.target.value)} name="where-to-watch" id="countries">
            {
            languages?.sort().map((language)=>{
              return <option key={language.iso_3166_1} value={language.iso_3166_1}>{language.english_name}</option>})}
          </select>
          <section className='provider-list'>
            {providers?.map(provider=>
            <img
            src={`https://image.tmdb.org/t/p/w500${provider.logo_path}`}
            alt={`${provider.provider_name}`}
            onClick={() => setSelectedProvider(provider.provider_id)}
            style={{
              border: selectedProvider === provider.provider_id ? "3px solid rgb(255, 136, 0)" : "none",
              cursor: "pointer",
            }}/>)}
          </section>
          </AccordionBody>
        </AccordionItem>

        <AccordionItem>
          <AccordionHeader targetId="3">
          <p  className='filter-menu-title'>Filters</p>
          </AccordionHeader>
          <AccordionBody accordionId="3">
            <strong>
              This is the third item's accordion body.
            </strong>
            You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the{' '}
            <code>
              .accordion-body
            </code>
            , though the transition does limit overflow.
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
