import React from 'react';

const WaveAnimation = ({isPlaying}) => {
    return (
        <div className={`wave-animation${isPlaying ? ' playing' : ''}`}>
            <div className="wave wave-1"></div>
            <div className="wave wave-2"></div>
            <div className="wave wave-3"></div>
        </div>
    );
};

export default WaveAnimation;
