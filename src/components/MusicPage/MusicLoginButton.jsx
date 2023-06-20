import {useState} from 'react';
import './css/login.css';
import {loginEndpoint} from './Spotify';

export default function MusicLoginButton({token, onClickLogout}) {
    //hover event
    const [hover, setHover] = useState(false);

    if (!token) {
        return (
            <a className="text-gray-400" href={loginEndpoint}>
                <span className="text-black hover:text-blue-300 text-xl leading-5">
                    <i className="fa-brands fa-spotify"></i>
                    &nbsp;
                    <span>Login to Spotify</span>
                </span>
                <span
                    className="ml-1 far fa-circle-question absolute leading-loose "
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
            <button onClick={onClickLogout} className="hover:text-blue-300 text-xl">
                <i className="fas fa-right-from-bracket"></i>
                &nbsp;
                <span className="font-gb"> Logout</span>
            </button>
        );
    }
}
