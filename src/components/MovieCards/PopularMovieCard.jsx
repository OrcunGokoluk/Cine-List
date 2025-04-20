import React from 'react'
import "../../CSS/home_page/popular_movies.css"

function PopularMovieCard({image_path=null, title}) {

    const imageStyle = {
        backgroundImage:`url(https://image.tmdb.org/t/p/w780${image_path})`
      };
      console.log(imageStyle.backgroundImage)
  return (
    <>
     {image_path ? <section className='popular-movie-card'>
        <div className='movie-image' style={imageStyle}></div>
        <p>{title.length>18? title.slice(0,18)+"...":title}</p>
      </section>:""}
    </>
  )
}

export default PopularMovieCard
