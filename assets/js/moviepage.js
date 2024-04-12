const moviePageContainer = document.querySelector("#movie-page");
const movieLS = localStorage.getItem('movieId');


function fetchMovieID (event) {
    const movieId = movieLS;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MDA2YjZiMTA4ZTlkYzk4NTRkMzNiZWU3M2JmZTUwMSIsInN1YiI6IjY2MTU5M2FhMTVhNGExMDE0YWY3ZTM5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9GPo1YyE3aDYpIfjnQjt_1vO4ZuQId0pH1v0TYhhdK4'
        }
    };
      
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));

}

// This runs of page load
fetchMovieID();