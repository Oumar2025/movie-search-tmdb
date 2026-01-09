// Load environment variables FIRST
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const movieRoutes = require('./routes/movies');

const app = express();
const PORT = process.env.PORT || 3000;

// Debug: Check if API key is loaded
console.log('TMDB API Key loaded:', process.env.TMDB_API_KEY ? 'YES' : 'NO');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/api/movies', movieRoutes);

// Serve HTML
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/movie.html');
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        error: 'Internal server error'
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`TMDB API Key: ${process.env.TMDB_API_KEY ? 'Loaded' : 'NOT LOADED'}`);
});