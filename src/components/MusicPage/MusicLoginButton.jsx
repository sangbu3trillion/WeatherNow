import {useState} from 'react';
import './css/PlayList.css';
import {loginEndpoint} from './Spotify';

export default function MusicLoginButton({token, onClickLogout}) {
    //hover event
    const [hover, setHover] = useState(false);

    if (!token) {
        return (
            <a className="text-gray-400" href={loginEndpoint}>
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
