const url = 'https://imdb146.p.rapidapi.com/v1/find/?query=robot';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '21f6497c22mshcec9eab44f70c4ap10a2e3jsn8657e78becfa',
		'X-RapidAPI-Host': 'imdb146.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}