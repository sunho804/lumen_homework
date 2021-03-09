import axios from 'axios';
const KEY = 'AIzaSyB9bUw48iMKjnBTCpqkAbvjjB7DK66O5v0';

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        part: 'snippet',
        maxResults: 20,
        key: KEY
    }
})