import {useState} from 'react';
import './PlayList.css';

export default function MusicLoginButton({token, onClickLogout}) {
    const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
    const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
    const AUTH_ENDPOINT = process.env.REACT_APP_AUTH_ENDPOINT;
    const RESPONSE_TYPE = 'token';

    //hover event
    const [hover, setHover] = useState(false);

    if (!token) {
        return (
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
        );
    } else {
        return (
            <button onClick={onClickLogout} className="hover:text-blue-300 text-3xl">
                Logout
            </button>
        );
    }
}
