// Create test-tmdb.js in your project root:
const axios = require('axios');

async function testDirectCall() {
    const API_KEY = '9bbed4eabb35e985b17b8ea614c97e2a';

    try {
        console.log('Testing direct API call...');

        const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
            params: {
                api_key: API_KEY,
                query: 'avengers',
                page: 1,
                language: 'en-US'
            },
            timeout: 5000
        });

        console.log('✅ SUCCESS! Found', response.data.results.length, 'movies');
        console.log('First movie:', response.data.results[0].title);

    } catch (error) {
        console.log('❌ ERROR:', error.message);
        if (error.response) {
            console.log('Status:', error.response.status);
            console.log('Error:', error.response.data);
        }
    }
}

testDirectCall();