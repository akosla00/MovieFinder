const moviePageContainer = document.querySelector("#movie-page");
const movieLS = localStorage.getItem('movieId');
const watchListBtn = document.querySelector('#add-watch-list')

function fetchMovieID() {
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

function displayMovieInfo(data) {
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
    let movieHour = Math.trunc(movieDuration / 60);
    let movieMinutes = movieDuration % 60;
    let movieTime = `${movieHour}hr, ${movieMinutes}min`;
    // movie background link
    const movieBannerEl = data.backdrop_path;
    const movieHero = `https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${movieBannerEl}`;


    // This is testing


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

function listGenre(data) {
    const movieGenreArray = data.genres
    const movieGenreListEl = document.querySelector("#genre-list");
    for (i = 0; i < movieGenreArray.length; i++) {
        const genreLi = document.createElement('li');
        genreLi.textContent = movieGenreArray[i].name;
        movieGenreListEl.append(genreLi);
    }
}

function addToWatchList(event) {
    event.preventDefault();

    let watchListArray = [];

    const watchList = JSON.parse(localStorage.getItem('watchList'))

    if (watchList == null) {
        watchListArray.push(movieLS);
    } else if (watchList.includes(movieLS)) {
        watchListArray.push(...watchList);
    } else {
        watchListArray.push(...watchList, movieLS);
    }

    localStorage.setItem("watchList", JSON.stringify(watchListArray));

    watchListBtn.textContent = "ADDED TO WATCH LIST";
}

watchListBtn.addEventListener('click', addToWatchList);

// TMDB video fetch
// Step #1
function fetchMovieVideo () {
    const movieId = movieLS;
    const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MDA2YjZiMTA4ZTlkYzk4NTRkMzNiZWU3M2JmZTUwMSIsInN1YiI6IjY2MTU5M2FhMTVhNGExMDE0YWY3ZTM5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9GPo1YyE3aDYpIfjnQjt_1vO4ZuQId0pH1v0TYhhdK4'
    }
  };
  
  fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US?type=trailer`, options)
    .then(response => response.json())
    .then(response => filterMovieVideos(response))
    .catch(err => console.error(err));
}

// Step #4
let youtubeVideoId = '';

// Step #2
function filterMovieVideos (data) {
    const movieVideosArray = data.results;
    const order = ['Behind the Scenes', 'Clip', 'Featurette', 'Teaser', 'Trailer'];
    const reorderedArray = movieVideosArray.sort((a, b) => order.indexOf(a.type) - order.indexOf(b.type));
    // For Testing
    console.log(movieVideosArray);
    
      for (let i = movieVideosArray.length - 1; i >= 0; i--) {
        if (movieVideosArray[i].type === 'Trailer' && movieVideosArray[i].name === 'Official Trailer') {
            const movieKey = movieVideosArray[i].key;
            return youtubeVideoId = movieKey;
        } else if (movieVideosArray[i].type === 'Trailer') {
            const movieKey = movieVideosArray[i].key;
            return youtubeVideoId = movieKey;
        } else if (movieVideosArray[i].type === 'Teaser') {
            const movieKey = movieVideosArray[i].key;
            return youtubeVideoId = movieKey;
        }
        
    }  
    
}

// Step #5
// Youtube
var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: '506',
          width: '900',
          videoId: youtubeVideoId,
          playerVars: {
            'playsinline': 1
          },
          events: {
            // 'onReady': onPlayerReady,
            // 'onStateChange': onPlayerStateChange
          }
        });
      }

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        event.target.playVideo();
      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      var done = false;
      function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
          setTimeout(stopVideo, 0);
          done = true;
        }
      }
      function stopVideo() {
        player.stopVideo();
      }




// This runs of page load
fetchMovieID();
fetchMovieVideo();
