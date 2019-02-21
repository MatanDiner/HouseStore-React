import axios from 'axios';

const instance = axios.create({
    baseURL:'https://mystore-app.firebaseio.com/'
});


export default instance;