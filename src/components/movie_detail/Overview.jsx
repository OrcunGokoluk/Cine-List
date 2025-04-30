import React from 'react'
import { useOutletContext } from 'react-router-dom'

function Overview() {
    const movie= useOutletContext();
  return (
    <>
            <p className="dt-tagline">{movie.tagline}</p>
            <h3>Overview</h3>
            <p className="dt-overview">{movie.overview}</p>
    </>
  )
}

export default Overview
