const fetch = require('node-fetch');


class Controller {
    

    static getPopular =  async(req, res) => {
    let endpoint = 'https://api.themoviedb.org/3/tv/popular?api_key=efe61e21b11fc4b6ff49e29d28597602&language=en-US';
    fetch(endpoint)
    .then(result => result.json())
    .then(result => res.json(result))
    .catch(err => err.message);
    console.log('hi')
    };

    static getSearched = (req, res) => {
        const Search = movieName;
        let endpoint = `https://api.themoviedb.org/3/tv/search/movie?api_key=efe61e21b11fc4b6ff49e29d28597602&language=en-US&query=${Search}`;
        fetch(endpoint)
        .then(result => result.json())
        .then(result => res.json(result))
        .catch(err => err.message);
    }

    static getMovieDetails = (req, res) => {
        const movieId = movieId;
        let endpoint =  `https://api.themoviedb.org/3/tv/movie/${movieId}?api_key=efe61e21b11fc4b6ff49e29d28597602&language=en-US`;
        fetch(endpoint)
        .then(result => result.json())
        .then(result => res.json(result))
        .catch(err => err.message);
    
    }

}






module.exports = Controller; 