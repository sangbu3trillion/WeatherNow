import {useEffect, useState} from 'react';
import './PlayList.css';
import axios from 'axios';

export default function PlayList() {
    // 음악 차트 데이터를 가져오는 코드 작성
    const [getList, setGetList] = useState([]);
    const [playlist, setPlaylist] = useState([]);

    const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
    const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
    const AUTH_ENDPOINT = process.env.REACT_APP_AUTH_ENDPOINT;
    const RESPONSE_TYPE = 'token';

    //login, logout
    const [token, setToken] = useState('');

    //hover event
    const [hover, setHover] = useState('');

    //search
    const [searchKey, setSearchKey] = useState('');

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

    useEffect(() => {
        if (token) {
            axios
                .get('https://api.spotify.com/v1/your-endpoint', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(response => {
                    setGetList(response.data); // 받아온 데이터를 playlist 상태로 설정
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [token]);

    // logout
    const logout = () => {
        setToken('');
        window.localStorage.removeItem('token');
        setPlaylist([]);
    };

    const searchMusic = async e => {
        e.preventDefault();
        const {data} = await axios.get('https://api.spotify.com/v1/search', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                q: searchKey,
                type: 'track',
            },
        });

        setPlaylist(data.tracks.items);
    };
    console.log(playlist);

    //render
    const renderMusic = () => {
        return playlist.map(track => (
            <div key={track.album.id}>
                <ul>
                    <li className="bg-sky-100/20 shadow-lg rounded-lg p-4 cursor-pointer hover:bg-sky-200/20 grid grid-cols-5">
                        <div className="col-start-1 col-end-1 grid place-items-center">
                            {track.album.images.length ? (
                                <img width={'50%'} src={track.album.images[0].url} alt="앨범커버" />
                            ) : (
                                <div>No Image</div>
                            )}
                        </div>
                        <div className="ml-10  w-96">
                            <h2 className="text-2xl font-bold mb-2">{track.name}</h2>
                            <p className="text-xl text-gray-500">{track.album.artists[0].name}</p>
                        </div>
                        <div className="col-start-4 col-end-5">
                            <p className="text-xl text-gray-500">{track.album.name}</p>
                        </div>
                        <div className="mx-20 my-auto col-start-5 col-end-6">
                            <button className="fas fa-play hover:text-red-500 font-bold"></button>
                        </div>
                    </li>
                </ul>
            </div>
        ));
    };

    return (
        <div className="font-gb my-0 mx-auto w-6/12">
            <div>
                <p className="font-bold text-5xl my-10 text-center">Today Music</p>
            </div>
            <div className="mb-7 mt-14">
                {' '}
                {!token ? (
                    <a
                        className="text-gray-400"
                        href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
                    >
                        <span className="text-black hover:text-blue-300 text-3xl leading-5">Login to Spotify</span>
                        &nbsp;
                        <span
                            className="far fa-circle-question absolute leading-loose "
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
            </div>
            <form onSubmit={searchMusic}>
                <input type="text" onChange={e => setSearchKey(e.target.value)} />
                <button type={'submit'}>Search</button>
            </form>
            <div>
                <ul className="gap-3 grid place-items-center">{renderMusic()}</ul>
            </div>
        </div>
    );
}
