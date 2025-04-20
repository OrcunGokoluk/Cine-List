import React from 'react'
import { FaMagnifyingGlass } from "react-icons/fa6";

function Searchbar() {
  return (
    <>
    <div className='input-wrapper'>
        <FaMagnifyingGlass className='search-icon' />
        <input className='searchbar' type="text" name="searchbar" placeholder='Search'/>
    </div>
    </>
  )
}

export default Searchbar
