import React, {useState, useEffect} from 'react';

const MusicTrackItem = ({track}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = React.useRef(new Audio(track.preview_url));

    useEffect(() => {
        const updateTime = () => {
            setCurrentTime(audioRef.current.currentTime);
        };

        audioRef.current.addEventListener('timeupdate', updateTime);

        return () => {
            audioRef.current.removeEventListener('timeupdate', updateTime);
        };
    }, []);

    // 재생 정지 버튼 클릭
    const playIcon = <i className="p-3 text-sky-200 fas fa-play hover:text-sky-300 text-3xl"></i>;
    const pauseIcon = <i className="p-3 text-sky-200 fas fa-stop hover:text-sky-300 text-3xl"></i>;

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    // 음악 상태 바
    const calculateProgress = () => {
        if (audioRef.current && audioRef.current.duration) {
            const progress = (currentTime / audioRef.current.duration) * 100;
            if (progress >= 100 && isPlaying == true) {
                audioRef.current.currentTime = 0;
                setIsPlaying(false); //무한루프 빠짐 -> && isPlaying == true
                return 0;
            }
            return progress;
        }
        return 0;
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
                    <div className="ml-10 w-80 my-auto">
                        <h2 className="text-2xl font-bold mb-2">{track.name}</h2>
                        <p className="text-xl text-gray-500">{track.album.artists[0].name}</p>
                    </div>
                    <div className="col-start-4 col-end-5 my-auto">
                        <p className="text-xl text-gray-500">{track.album.name}</p>
                    </div>
                    <div className="mx-20 my-auto col-start-5 col-end-6">
                        <button onClick={togglePlay} className="icon-button">
                            {isPlaying ? pauseIcon : playIcon}
                        </button>
                        <div className="relative">
                            <div className="overflow-hidden h-2 w-14 bg-slate-200">
                                <div
                                    className="bg-gradient-to-r from-sky-200 to-indigo-300 h-full transform"
                                    style={{width: `${calculateProgress()}%`}}
                                ></div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default MusicTrackItem;
