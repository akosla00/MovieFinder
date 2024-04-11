const movieListContainer = document.querySelector('#movie-list-container')
let genre = document.querySelector('#movie-category')



function searchMovie() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MDA2YjZiMTA4ZTlkYzk4NTRkMzNiZWU3M2JmZTUwMSIsInN1YiI6IjY2MTU5M2FhMTVhNGExMDE0YWY3ZTM5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9GPo1YyE3aDYpIfjnQjt_1vO4ZuQId0pH1v0TYhhdK4'
        }
    };

    fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options)
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
        const image = `https://media.themoviedb.org/t/p/w300_and_h450_bestv2` + imageLocation

        // This is the CARD
        const card = document.createElement("div");
        card.setAttribute("class", "card");
        card.setAttribute("style", "width: 18rem;");

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
        movieListContainer.append(card)
    }


}


// try {
// 	const response = await fetch(url, options);
// 	const result = await response.text();
// 	console.log(result);
// } catch (error) {
// 	console.error(error);
// }
