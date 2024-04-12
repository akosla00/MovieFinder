const movieListContainer = document.querySelector('#movie-list-container');
let genre = document.querySelector('#movie-category');
const popularMovieList = document.querySelector('#popular-movie-list');
const omdbUrl = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
const searchFormEl = document.querySelector('#search-form');


function loadMovie() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MDA2YjZiMTA4ZTlkYzk4NTRkMzNiZWU3M2JmZTUwMSIsInN1YiI6IjY2MTU5M2FhMTVhNGExMDE0YWY3ZTM5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9GPo1YyE3aDYpIfjnQjt_1vO4ZuQId0pH1v0TYhhdK4'
        }
    };

    fetch(omdbUrl, options)
        .then(response => response.json())
        .then(response => titleResults(response))
        .catch(err => console.error(err));
}

function titleResults(data) {
    const movieArray = data.results;
    console.log(movieArray);

    for (i = 0; i < movieArray.length; i++) {
        console.log("Card is being made");
        const imageLocation = movieArray[i].poster_path;
        const movieTitle = movieArray[i].original_title;
        const movieId = movieArray[i].id;
        const image = `https://media.themoviedb.org/t/p/w300_and_h450_bestv2` + imageLocation

        // This is the CARD
        const card = document.createElement("div");
        card.setAttribute("class", "card");
        card.setAttribute("style", "width: 18rem;");
        card.setAttribute('data-movie-id', movieId);
        card.setAttribute('onClick', "sendMovieIdToLocalStorage(this)")
        // card.addEventListener('click', sendMovieIdToLocalStorage);

        const img = document.createElement("img");
        img.setAttribute("src", image);
        img.setAttribute("class", "card-img-top");

        const cardBody = document.createElement("div");
        cardBody.setAttribute('class', "card-body");

        const p = document.createElement("p");
        p.setAttribute('class', 'card-text');
        p.textContent = movieTitle;

        cardBody.append(p);

        card.append(img, cardBody);
        popularMovieList.append(card)
    }


}

function moviesByGenre(event) {
    event.preventDefault();

    const genreVal = genre.value;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MDA2YjZiMTA4ZTlkYzk4NTRkMzNiZWU3M2JmZTUwMSIsInN1YiI6IjY2MTU5M2FhMTVhNGExMDE0YWY3ZTM5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9GPo1YyE3aDYpIfjnQjt_1vO4ZuQId0pH1v0TYhhdK4'
        }
    };



    const queryString = omdbUrl + `&with_genres=${genreVal}`;

    fetch(queryString, options)
        .then(response => response.json())
        .then(response => titleResults(response))
        .catch(err => console.error(err));


}

searchFormEl.addEventListener('submit', moviesByGenre);


$(document).ready(function () {
    window.onload = loadMovie();
});












// Gio was working here last
const tempMovieCardTestButton = document.querySelector('#movieCardClick');
// This WILL be the data-movie-id attach to the movie click event

function sendMovieIdToLocalStorage (event) {
    console.log(event)
    const movieId = event.dataset.movieId;
    
    if (localStorage.getItem('movieId') !== null) {
        let movieKey = localStorage.getItem('movieId');
        movieKey = movieId;
        localStorage.setItem('movieId', movieKey);
        console.log("This ran 1");
    } else {
        let emptyMovieId = 0;
        emptyMovieId = movieId;
        localStorage.setItem('movieId', emptyMovieId);
        console.log("This ran 2");
    }

    var myWindow = window.open("moviepage.html", "_self");
    myWindow
}
