// The point of this code is to display the movie we have saved in local storage
// How does it work?
// Gets an Array of Object with movie


// This variable calls the local saved
const savedMovieList = localStorage('savedMovieList');
// This is the location it will parse too
const displayWatchList = document.querySelector('#movie-watch-list');


function displayMovies () {
    const parsedMovieList = JSON.parse(savedMovieList);

    for (let i = 0; i < parsedMovieList.lenght; i++) {
        // TODO: Copy the for loop from Alecs branch to display the Movie cards
    }
}

// This runs displayMovies(); on page load
displayMovies();