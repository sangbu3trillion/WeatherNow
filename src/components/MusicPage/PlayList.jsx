import {useEffect, useState} from 'react';
import axios from 'axios';
import imgs from './logo.png';
import './PlayList.css';

export default function PlayList() {
    // 음악 차트 데이터를 가져오는 코드 작성
    const chartData = [
        {title: 'Song 1', artist: 'Artist 1', album: 'album 1'},
        {title: 'Song 2', artist: 'Artist 2', album: 'album 2'},
        {title: 'Song 3', artist: 'Artist 3', album: 'album 3'},
        {title: 'Song 4', artist: 'Artist 4', album: 'album 4'},
        {title: 'Song 5', artist: 'Artist 5', album: 'album 5'},
    ];

    const CLIENT_ID = '98268ab8f48f4177a7976f4d2b8a966b';
    const REDIRECT_URI = 'http://localhost:3000';
    const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
    const RESPONSE_TYPE = 'token';

    //axios
    // axios.get() => .then() '요청성공'과 .catch() '요청실패'
    const axios = require('axios');

    //login, logout
    const [token, setToken] = useState('');

    //hover event
    const [hover, setHover] = useState('');

    //useEffect : token
    useEffect(() => {
        const hash = window.location.hash;
        let token = window.localStorage.getItem('token');

        // getToken()

        if (!token && hash) {
            token = hash
                .substring(1)
                .split('&')
                .find(elem => elem.startsWith('access_token'))
                .split('=')[1];

            window.location.hash = '';
            window.localStorage.setItem('token', token);
        }

        setToken(token);
    }, []);

    // logout
    const logout = () => {
        setToken('');
        window.localStorage.removeItem('token');
    };

    return (
        <div className="font-gb w-5/6 my-0 mx-auto">
            <div>
                <div className="font-bold text-5xl my-10 grid place-items-left">Today Music</div>
                <div>
                    <ul>
                        <li className="my-2">
                            {' '}
                            {!token ? (
                                <a
                                    className="text-gray-400"
                                    href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
                                >
                                    <span className="text-black hover:text-blue-300 text-3xl">Login to Spotify</span>
                                    &nbsp;
                                    <span
                                        className="far fa-circle-question absolute leading-relaxed"
                                        onMouseEnter={() => setHover(true)}
                                        onMouseLeave={() => setHover(false)}
                                    >
                                        <span className="relative">
                                            <span>
                                                {hover && (
                                                    <span>
                                                        <p className="font-gb text-2xl">로그인이 필요합니다</p>
                                                    </span>
                                                )}
                                            </span>
                                        </span>
                                    </span>
                                </a>
                            ) : (
                                <button onClick={logout} className="hover:text-blue-300 text-3xl">
                                    Logout
                                </button>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
            <div>
                <ul className="gap-3 w-auto cursor-pointer grid place-items-center">
                    {/* sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 */}
                    {chartData.map((song, index) => (
                        <li key={index} className="bg-white shadow-lg rounded-lg p-4 grid grid-cols-4 gap-4">
                            <div>
                                <img src={imgs} className="w-16 h-14"></img>
                            </div>
                            <div className="mx-5">
                                <h2 className="text-xl font-bold mb-2">{song.title}</h2>
                                <p className="text-gray-500">{song.artist}</p>
                            </div>
                            <div className="mx-20 my-auto">
                                <p>{song.album}</p>
                            </div>
                            <div className="mx-20 my-auto">
                                <button className="bg-gray-200 fas fa-play text-white hover:bg-gray-300 hover:text-black font-bold py-2 px-4 rounded"></button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
