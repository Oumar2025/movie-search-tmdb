const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

// Simple validation middleware
const validateSearch = (req, res, next) => {
    const { query } = req.query;

    if (!query || query.trim().length < 1) {
        return res.status(400).json({
            success: false,
            error: 'Search query is required (minimum 1 character)'
        });
    }

    if (query.length > 100) {
        return res.status(400).json({
            success: false,
            error: 'Search query too long (maximum 100 characters)'
        });
    }

    next();
};

// Routes
router.get('/search', validateSearch, movieController.searchMovies);
router.get('/popular', movieController.getPopularMovies);
router.get('/:id', movieController.getMovieDetails);

module.exports = router;