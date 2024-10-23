import axios from 'axios';

const API_KEY = process.env.VUE_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';


// Fetching genres from tmdb api
export const getGenres = async () => {
    try{
        const response = await axios.get(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
        return response.data.genres;
    }
    catch(error){
        console.error('Error fetching genres:', error)
        throw error;
    }
}

// fetching movie backdrop, for my HomePage background
export const getHomePicture = async () =>{
    try{
        const response = await axios.get(`${BASE_URL}/movie/129/images?api_key=${API_KEY}`);
        return response.data.backdrops[0].file_path; // getting the third picture from the array
    } catch(error){
        console.error('Error fetching movie images:', error)
        throw error;
    }
}

// Fetching popular movies from tmdb api, which is displayed on the Homepage
export const getPopularMovies = async (page = 1) =>{
    try{
        const response = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
        return response.data.results;

    } catch(error){
        console.error('Error fetching movies:', error)
        throw error;
    }
}

export const getBestVotedMovies = async (page = 1) => {
    try{
        const response = await axios.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=vote_count.desc&page=${page}`);
        return response.data.results;
    } catch(error){
        console.error('Error fetching movies:', error)
        throw error;
    }
}
export const getMoviesByGenre = async (genreId, page = 1) =>{
    try{
        const response = await axios.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=vote_count.desc&with_genres=${genreId}&page=${page}`);
        return response.data.results;
    }
    catch(error){
        console.error('Error fetching movies in genre: ', error)
    }
}