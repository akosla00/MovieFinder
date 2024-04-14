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
        .then(response => displayMovieInfo(response))
        .catch(err => console.error(err));

}

function displayMovieInfo (data) {
    console.log(data); //testing
    const movieTitle = data.title;
    const movieDescription = data.overview;
    const movieDuration = data.runtime;
    const movieRating = data.vote_average;
    // const movieGenreArray = data.genres;
    const productionCompany = data.production_companies[0].name

    // movie poster
    const moviePoster = data.poster_path;
    const moviePosterLink = `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${moviePoster}`
    // movie time duration 
    let movieHour = Math.trunc(movieDuration /60);
    let movieMinutes = movieDuration % 60; 
    let movieTime = `${movieHour}hr, ${movieMinutes}min`;
    // movie background link
    const movieBannerEl = data.backdrop_path;
    const movieHero = `https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${movieBannerEl}`;


    // This is testing
    console.log(movieRating);

    // This sets the background
    const movieBanner = document.querySelector("#movie-hero");
    movieBanner.setAttribute("style", `background-image: url('${movieHero}');`);

    // movie title
    const movieTitleDisplay = document.querySelector("#movie-title");
    movieTitleDisplay.textContent = movieTitle;
    const movieDescriptionDisplay = document.querySelector("#movie-description");
    // movie description
    movieDescriptionDisplay.textContent = movieDescription;
    const movieDurationDisplay = document.querySelector("#movie-duration");
    movieDurationDisplay.textContent = movieTime;
    // movie poster
    const moviePosterEl = document.querySelector("#movie-poster");
    moviePosterEl.setAttribute('src', moviePosterLink)

    const movieProductionCompany = document.querySelector("#production-company");
    movieProductionCompany.textContent = productionCompany;
    // list the genres
    listGenre(data);
    
    // movieRating 
    const movieRatingEl = document.querySelector("#movie-rating");
    movieRatingEl.textContent = `${Math.trunc(movieRating)} / 10`;
}

function listGenre (data) {
    const movieGenreArray = data.genres
    const movieGenreListEl = document.querySelector("#genre-list");
    for (i = 0; i < movieGenreArray.length; i++) {    
            const genreLi = document.createElement('li');
            genreLi.textContent = movieGenreArray[i].name;
            movieGenreListEl.append(genreLi);
        }
}


// This runs of page load
fetchMovieID();