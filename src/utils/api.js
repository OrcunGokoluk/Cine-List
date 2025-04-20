
export function getSearchMovies(data){
    fetch("https://api.themoviedb.org/3/search/movie?query="+data)
    .then(res=>res.json())
}