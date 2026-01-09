const axios = require('axios');
const API_CONFIG = require('../config/apiConfig');

class MovieController {
    async searchMovies(req, res, next) {
        try {
            const { query, page = 1 } = req.query;

            console.log('Searching movies with query:', query); // Debug log
            console.log('Using API key:', API_CONFIG.TMDB.API_KEY ? 'Key exists' : 'NO KEY'); // Debug log

            const response = await axios.get(
                `${API_CONFIG.TMDB.BASE_URL}/search/movie`,
                {
                    params: {
                        api_key: API_CONFIG.TMDB.API_KEY,
                        query: query.trim(),
                        page: parseInt(page),
                        language: API_CONFIG.TMDB.DEFAULT_LANGUAGE
                    },
                    timeout: 5000 // Reduced from 10s to 5s
                }
            );

            console.log('API Response status:', response.status); // Debug log

            const { results, total_pages, total_results } = response.data;

            res.json({
                success: true,
                data: {
                    movies: results.map(movie => ({
                        id: movie.id,
                        title: movie.title,
                        overview: movie.overview,
                        release_date: movie.release_date,
                        vote_average: movie.vote_average,
                        poster_path: movie.poster_path ?
                            `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null
                    })),
                    pagination: {
                        page: parseInt(page),
                        total_pages,
                        total_results
                    }
                }
            });

        } catch (error) {
            console.error('Search Movies Error:', error.message);
            console.error('Error details:', error.response?.data || error.code);

            if (error.code === 'ECONNRESET') {
                return res.status(503).json({
                    success: false,
                    error: 'Network connection lost. Please check your internet.'
                });
            }

            if (error.response?.status === 401) {
                return res.status(401).json({
                    success: false,
                    error: 'Invalid TMDB API key. Please check your .env file.'
                });
            }

            res.status(500).json({
                success: false,
                error: 'Failed to search movies. Please try again.'
            });
        }
    }

    async getPopularMovies(req, res, next) {
        try {
            const { page = 1 } = req.query;

            console.log('Getting popular movies...'); // Debug log

            const response = await axios.get(
                `${API_CONFIG.TMDB.BASE_URL}/movie/popular`,
                {
                    params: {
                        api_key: API_CONFIG.TMDB.API_KEY,
                        page: parseInt(page),
                        language: API_CONFIG.TMDB.DEFAULT_LANGUAGE
                    },
                    timeout: 5000
                }
            );

            const { results } = response.data;

            res.json({
                success: true,
                data: {
                    movies: results.map(movie => ({
                        id: movie.id,
                        title: movie.title,
                        overview: movie.overview,
                        release_date: movie.release_date,
                        vote_average: movie.vote_average,
                        poster_path: movie.poster_path ?
                            `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null
                    })),
                    page: parseInt(page)
                }
            });

        } catch (error) {
            console.error('Popular Movies Error:', error.message);
            console.error('Error details:', error.response?.data || error.code);

            if (error.response?.status === 401) {
                return res.status(401).json({
                    success: false,
                    error: 'Invalid TMDB API key in .env file'
                });
            }

            res.status(500).json({
                success: false,
                error: 'Failed to fetch popular movies'
            });
        }
    }

    async getMovieDetails(req, res, next) {
        try {
            const { id } = req.params;

            const response = await axios.get(
                `${API_CONFIG.TMDB.BASE_URL}/movie/${id}`,
                {
                    params: {
                        api_key: API_CONFIG.TMDB.API_KEY,
                        language: API_CONFIG.TMDB.DEFAULT_LANGUAGE
                    },
                    timeout: 5000
                }
            );

            const movie = response.data;

            res.json({
                success: true,
                data: {
                    id: movie.id,
                    title: movie.title,
                    overview: movie.overview,
                    release_date: movie.release_date,
                    runtime: movie.runtime,
                    vote_average: movie.vote_average,
                    poster_path: movie.poster_path ?
                        `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null
                }
            });

        } catch (error) {
            console.error('Movie Details Error:', error.message);

            if (error.response?.status === 404) {
                return res.status(404).json({
                    success: false,
                    error: 'Movie not found'
                });
            }

            res.status(500).json({
                success: false,
                error: 'Failed to fetch movie details'
            });
        }
    }
}

module.exports = new MovieController();