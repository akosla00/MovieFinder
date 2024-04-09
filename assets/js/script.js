const movieListContainer = document.querySelector('#movie-list-container')





function searchMovie () {
    const url = 'https://imdb146.p.rapidapi.com/v1/find/?query=robot';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '21f6497c22mshcec9eab44f70c4ap10a2e3jsn8657e78becfa',
            'X-RapidAPI-Host': 'imdb146.p.rapidapi.com'
        }
    };
    
    fetch(url, options)
        .then(function (response) {
            return response.json();
        })
        .then(function (data){
            titleResults(data);
        })
}

function titleResults (data) {
    const movieArray = data.titleResults.results;
    console.log(movieArray);

    for (i = 0; i < movieArray.length; i++) {
        console.log("Card is being made");
        const image = movieArray[i].titlePosterImageModel.url;
        const movieTitle = movieArray[i].titleNameText;

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