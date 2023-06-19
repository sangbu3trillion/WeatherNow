import React, {useState, useRef, useEffect} from 'react';
import ProgressCircle from './ProgressCircle';
import WaveAnimation from './WaveAnimation';
import Controls from './Controls';

export default function AudioPlayer({track}) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [trackProgress, setTrackProgress] = useState(0);
    const audioRef = React.useRef(new Audio(track.preview_url));
    const intervalRef = useRef();
    const isReady = useRef(false);
    const {duration} = audioRef.current;
    const currentPercentage = duration ? (trackProgress / duration) * 100 : 0;

    const startTimer = () => {
        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            if (audioRef.current.ended) {
                handleNext();
            } else {
                setTrackProgress(audioRef.current.currentTime);
            }
        }, 1000);
    };

    useEffect(() => {
        if (audioRef.current.src) {
            if (isPlaying) {
                audioRef.current.play();
                startTimer();
            } else {
                clearInterval(intervalRef.current);
                audioRef.current.pause();
            }
        } else {
            if (isPlaying) {
                audioRef.current = new Audio(track.preview_url);
                audioRef.current.play();
                startTimer();
            } else {
                clearInterval(intervalRef.current);
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    useEffect(() => {
        audioRef.current.pause();
        audioRef.current = new Audio(track.preview_url);
        setTrackProgress(audioRef.current.currentTime);

        if (isReady.current) {
            audioRef.current.play();
            setIsPlaying(true);
            startTimer();
        } else {
            isReady.current = true;
        }
    }, [track]);

    useEffect(() => {
        return () => {
            audioRef.current.pause();
            clearInterval(intervalRef.current);
        };
    }, []);

    const handleNext = () => {
        console.log('[AudioPlayer] handleNext() CLICKED!!');
        // Handle next track logic
    };

    const handlePrev = () => {
        console.log('[AudioPlayer] handlePrev() CLICKED!!');
        // Handle previous track logic
    };

    const addZero = n => {
        return n > 9 ? '' + n : '0' + n;
    };

    const artists = track.album.artists.map(artist => artist.name);

    return (
        <div className="player-body flex">
            <div className="player-left-body">
                <ProgressCircle
                    percentage={currentPercentage}
                    isPlaying={isPlaying}
                    image={track.album.images[0].url}
                    size={300}
                    color="#C96850"
                />
            </div>
            <div className="player-right-body flex">
                <p className="song-title">{track.name}</p>
                <p className="song-artist">{artists.join(' | ')}</p>
                <div className="player-right-bottom flex">
                    <div className="song-duration flex">
                        <p className="duration">0:{addZero(Math.round(trackProgress))}</p>
                        <WaveAnimation isPlaying={isPlaying} />
                        <p className="duration">0:30</p>
                    </div>
                    <Controls
                        isPlaying={isPlaying}
                        setIsPlaying={setIsPlaying}
                        handleNext={handleNext}
                        handlePrev={handlePrev}
                        track={track}
                    />
                </div>
            </div>
        </div>
    );
}
