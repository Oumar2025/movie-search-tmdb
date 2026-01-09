const axios = require('axios');

async function testAPI() {
    const API_KEY = '9bbed4eabb35e985b17b8ea614c97e2a'; // Your API key
    const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YmJlZDRlYWJiMzVlOTg1YjE3YjhlYTYxNGM5N2UyYSIsIm5iZiI6MTc2Nzk1OTgwNy4wMDQsInN1YiI6IjY5NjBlY2ZlNDg5ZDY2YWFmNTU5NWI1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._ttZla7JGEiMag3orvB-927phj0W3Hb87n1l8sx53_E'; // Your token

    console.log('Testing TMDB API...\n');

    // Test with API key
    try {
        console.log('Testing with API key...');
        const response1 = await axios.get('https://api.themoviedb.org/3/movie/550', {
            params: { api_key: API_KEY }
        });
        console.log('✓ API Key works:', response1.data.title);
    } catch (error) {
        console.log('✗ API Key error:', error.response?.data?.status_message || error.message);
    }

    // Test with Bearer token
    try {
        console.log('\nTesting with Bearer token...');
        const response2 = await axios.get('https://api.themoviedb.org/3/movie/550', {
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
                'accept': 'application/json'
            }
        });
        console.log('✓ Token works:', response2.data.title);
    } catch (error) {
        console.log('✗ Token error:', error.response?.data?.status_message || error.message);
    }
}

testAPI();