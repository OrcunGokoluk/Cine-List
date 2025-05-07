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
    const [page, setPage]= useState(1)
    const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });



    const API_KEY=import.meta.env.VITE_TMDB_KEY;

    useEffect(()=>{
      if(movFilter&&movFilter!=="popularity.desc"){
        const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${page}&sort_by=${movFilter}`;
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
      fetch(`https://api.themoviedb.org/3/configuration/primary_translations?api_key=${API_KEY}`)
      .then(res=>res.json())
      .then(data=>{
        const arr=[]
        data?.map(language =>{
          const countryCode = language.slice(-2);
          if(!arr.includes(countryCode))
          {
          arr.push(countryCode)
          const countryName = regionNames.of(countryCode);
          setLanguages(prev=>[...prev,countryName])
         }
        }) 
      })
      .catch(err=>console.log(err))
      console.log("Work languages")
    },[])

    
    function applyFilters(formData){

      const filterMovieBy = formData.get("sort-movies")
      setMovFilter(filterMovieBy)
        const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=1&sort_by=${filterMovieBy}`;
        fetch(url)
          .then(res => res.json())
          .then(data => {
            setPopMovie(data.results);
            setPage(1);
          })
          .catch(err=>console.log(err))
          console.log("Work f filter")
      }
  return (
    <>

    <section className='filter-page'>
    <h2 className='filter-page-title'>Popular Movies</h2>

    <form action={applyFilters} className='filters-section'>
      <UncontrolledAccordion defaultOpen="1">
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
          <select name="sort-lang" id="countries">
            {
            languages?.sort().map(language=>{
              return <option value={language}>{language}</option>})}
          </select>
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
