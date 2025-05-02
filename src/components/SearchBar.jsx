import React from 'react'
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useNavigate} from "react-router-dom"

function Searchbar() {
    const navigate = useNavigate();
    
    function getData(formData){
        const movieName =formData.get("searchbar").trim()
            navigate(`search?query=${movieName}&currentPage=1`)        
          }

  return (
    <>
    <form action={getData} className='input-wrapper'>
        <button  className='search-icon'><FaMagnifyingGlass  /></button>
        <input className='searchbar' type="text" name="searchbar" placeholder='Search'/>
    </form>
    </>
  )
}

export default Searchbar
