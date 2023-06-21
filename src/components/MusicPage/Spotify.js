import axios from 'axios';

const authEndpoint = process.env.REACT_APP_AUTH_ENDPOINT;
const clientID = process.env.REACT_APP_CLIENT_ID;
const redirecUri = process.env.REACT_APP_REDIRECT_URI;
const scopes = ['user-library-read', 'playlist-read-private'];

export const loginEndpoint = `${authEndpoint}client_id=${clientID}&redirect_uri=${redirecUri}&scope=${scopes.join(
    '%20',
)}&response_type=token&show_dialog=true`;

console.log(loginEndpoint);

const apiClinet = axios.create({
    baseURL: 'https://api.spotify.com/v1',
});

export const setClientToken = token => {
    apiClinet.interceptors.request.use(async function (config) {
        config.headers.Authorization = 'Bearer' + token;
        return config;
    });
};

export default apiClinet;
