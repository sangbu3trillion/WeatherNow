import {useEffect, useState} from 'react';
import './PlayList.css';
import axios from 'axios';

export default function PlayList() {
    // 음악 차트 데이터를 가져오는 코드 작성
    const [getList, setGetList] = useState([]);
    const [playlist, setPlaylist] = useState([]);

    const CLIENT_ID = '98268ab8f48f4177a7976f4d2b8a966b';
    const REDIRECT_URI = 'http://localhost:3000';
    const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
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
                <li className="bg-white shadow-lg rounded-lg p-4 grid grid-cols-4 gap-4 cursor-pointer hover:bg-gray-50">
                    <div>
                        {track.album.images.length ? (
                            <img width={'50px'} src={track.album.images[0].url} alt="앨범커버" />
                        ) : (
                            <div>No Image</div>
                        )}
                    </div>
                    <div className="mx-5">
                        <h2 className="text-xl font-bold mb-2">{track.album.name}</h2>
                        <p className="text-gray-500">{track.album.artists[0].name}</p>
                    </div>
                    <div className="mx-20 my-auto">
                        <button className="bg-gray-200 fas fa-play text-white hover:bg-gray-300 hover:text-black font-bold py-2 px-4 rounded"></button>
                    </div>
                </li>
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
