import React, {useState} from 'react';
import AudioPlayer from './AudioPlayer';

const MusicTrackItem = ({track}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = React.useRef(new Audio(track.preview_url));

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div key={track.album.id}>
            <ul className="border-b divide-y divide-slate-200">
                <li className="p-3 cursor-pointer hover:bg-gray-100/90 grid grid-cols-5" onClick={() => track.uri}>
                    <div className="col-start-1 col-end-1 grid place-items-center">
                        {track.album.images.length ? (
                            <img width={'50%'} src={track.album.images[0].url} alt="앨범커버" />
                        ) : (
                            <div>No Image</div>
                        )}
                    </div>
                    <div className="ml-10 w-80">
                        <h2 className="text-2xl font-bold mb-2">{track.name}</h2>
                        <p className="text-xl text-gray-500">{track.album.artists[0].name}</p>
                    </div>
                    <div className="col-start-4 col-end-5">
                        <p className="text-xl text-gray-500">{track.album.name}</p>
                    </div>
                    <div className="mx-20 my-auto col-start-5 col-end-6">
                        <button
                            // className={`fas fa-play hover:text-red-500 font-bold ${isPlaying ? 'playing' : ''}`}
                            // onClick={togglePlay}
                            className={`fas fa-play hover:text-red-500 font-bold`}
                        >
                            {togglePlay}
                        </button>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default MusicTrackItem;
