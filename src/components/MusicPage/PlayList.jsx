import React, {useEffect, useState} from 'react';
import './PlayList.css';
import axios from 'axios';
import MusicLoginButton from './MusicLoginButton';
import MusicSearchForm from './MusicSearchForm';
import MusicTrackItem from './MusicTrackItem';

export default function Music() {
    const [getList, setGetList] = useState([]);
    const [playlist, setPlaylist] = useState([]);
    const [token, setToken] = useState('');
    const [player, setPlayer] = useState(null);
    const [hover, setHover] = useState(false);

    const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
    const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
    const AUTH_ENDPOINT = process.env.REACT_APP_AUTH_ENDPOINT;
    const RESPONSE_TYPE = 'token';

    useEffect(() => {
        const hash = window.location.hash;
        let token = window.localStorage.getItem('token');

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
                    setGetList(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [token]);

    useEffect(() => {
        if (token && !player) {
            window.onSpotifyWebPlaybackSDKReady = () => {
                const player = new window.Spotify.Player({
                    name: 'My Spotify Player',
                    getOAuthToken: cb => {
                        cb(token);
                    },
                });

                player.addListener('ready', ({device_id}) => {
                    console.log('Ready with Device ID', device_id);
                    playTrack(device_id);
                });

                player.addListener('not_ready', ({device_id}) => {
                    console.log('Device ID has gone offline', device_id);
                });

                player.connect().then(success => {
                    if (success) {
                        console.log('The Web Playback SDK successfully connected to Spotify!');
                    }
                });

                setPlayer(player);
            };
        }
    }, [token, player]);

    const logout = () => {
        setToken('');
        window.localStorage.removeItem('token');
        setPlaylist([]);
    };

    const searchMusic = tracks => {
        setPlaylist(tracks);
    };

    const playTrack = uri => {
        console.log(token);

        if (player) {
            player._options.getOAuthToken(token => {
                fetch(`https://api.spotify.com/v1/me/player/play?device_id=${player._options.id}`, {
                    method: 'PUT',
                    body: JSON.stringify({uris: [uri]}),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
            });
        }
    };

    const renderMusic = () => {
        return playlist.map(track => <MusicTrackItem key={track.album.id} track={track} playTrack={playTrack} />);
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
