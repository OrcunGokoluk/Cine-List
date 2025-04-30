import React from 'react'
import { useOutletContext } from 'react-router-dom'

function Details() {
    const movie = useOutletContext()
  return (
    <>
      <p>{movie.tagline}</p>
    </>
  )
}

export default Details
