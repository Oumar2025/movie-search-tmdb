const API_CONFIG = {
    TMDB: {
        BASE_URL: 'https://api.themoviedb.org/3',
        API_KEY: process.env.TMDB_API_KEY,
        DEFAULT_LANGUAGE: 'en-US',
        DEFAULT_PAGE: 1
    },
    VALIDATION: {
        MAX_QUERY_LENGTH: 100,
        MIN_QUERY_LENGTH: 1,
        MAX_PAGE: 500
    }
};

module.exports = API_CONFIG;