// This variable calls the local saved
const savedMovieList = JSON.parse(localStorage.getItem('watchList'));
// This is the location it will parse too
const displayWatchList = document.querySelector('#movie-watch-list');
const deleteBtn = document.querySelector('#delete-btn');


function titleResults(data) {
    const movieArray = data;
    console.log(data);


    console.log("Card is being made");
    const imageLocation = movieArray.poster_path;
    const movieTitle = movieArray.original_title;
    const movieId = movieArray.id;
    const image = `https://media.themoviedb.org/t/p/w300_and_h450_bestv2` + imageLocation

    // This is the CARD
    const card = document.createElement("div");
    card.setAttribute("class", "card");
    card.setAttribute("style", "width: 18rem;");
    card.setAttribute('data-movie-id', movieId);
    card.setAttribute('onClick', "sendMovieIdToLocalStorage(this)")

    const img = document.createElement("img");
    img.setAttribute("src", image);
    img.setAttribute("class", "card-img-top");

    const cardBody = document.createElement("div");
    cardBody.setAttribute('class', "card-body");

    const p = document.createElement("p");
    p.setAttribute('class', 'card-text');
    p.textContent = movieTitle;

    const btn = document.createElement('button');
    btn.setAttribute('id', 'delete-btn');
    btn.setAttribute('class', 'btn btn-danger delete')
    btn.textContent = 'Remove from Watch List';
    btn.onclick = function () {
        removeMovie(movieId);
    };

    p.append(btn);

    cardBody.append(p);

    card.append(img, cardBody);
    displayWatchList.append(card);
}

function displayMovies() {
    for (i = 0; i < savedMovieList.length; i++) {
        fetchMovieID();
    }
}

// This runs displayMovies(); on page load
displayMovies();

function fetchMovieID() {
    const movieId = savedMovieList[i];
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MDA2YjZiMTA4ZTlkYzk4NTRkMzNiZWU3M2JmZTUwMSIsInN1YiI6IjY2MTU5M2FhMTVhNGExMDE0YWY3ZTM5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9GPo1YyE3aDYpIfjnQjt_1vO4ZuQId0pH1v0TYhhdK4'
        }
    };

    fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options)
        .then(response => response.json())
        .then(response => titleResults(response))
        .catch(err => console.error(err));

}

