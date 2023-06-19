import React, {useEffect, useState} from 'react';
import MusicLoginButton from './MusicLoginButton';
import MusicSearchForm from './MusicSearchForm';
import MusicTrackItem from './MusicTrackItem';
import {setClientToken} from './Spotify';
import VerticalCardSlider from './VerticalCardSlider';

export default function Music() {
    const [playlist, setPlaylist] = useState([]);
    const [token, setToken] = useState('');
    // const [getList, setGetList] = useState([]);
    // const [player, setPlayer] = useState(null);

    //token
    useEffect(() => {
        //hash로 토큰 값
        const token = window.localStorage.getItem('token');
        const hash = window.location.hash;
        window.location.hash = '';

        if (!token && hash) {
            const _token = hash.split('&')[0].split('=')[1];
            window.localStorage.setItem('token', _token);
            setToken(_token);
            setClientToken(_token);
        } else {
            setToken(token);
            setClientToken(token);
        }
    }, []);

    const logout = () => {
        setToken('');
        window.localStorage.removeItem('token');
        setPlaylist([]);
    };

    const searchMusic = tracks => {
        setPlaylist(tracks);
    };

    const renderMusic = () => {
        return playlist.map(track => <MusicTrackItem key={track.album.id} track={track} />);
    };

    return (
        <div className="font-gb my-0 mx-auto w-6/12">
            <div>
                <p className="font-bold text-5xl my-10 text-center">Today Music</p>
            </div>
            <div className="mb-7 mt-14">
                <MusicLoginButton token={token} onClickLogout={logout} />
            </div>
            <MusicSearchForm token={token} onSearch={searchMusic} />
            <div>
                <script src="https://sdk.scdn.co/spotify-player.js"></script>
                <ul className="grid place-items-center">{renderMusic()}</ul>
            </div>
        </div>
    );
}
