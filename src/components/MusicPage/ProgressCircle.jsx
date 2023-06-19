import React from 'react';

const ProgressCircle = ({percentage, isPlaying, image, size, color}) => {
    const radius = size / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="progress-circle" style={{width: size, height: size}}>
            <svg className="progress-circle-svg" width={size} height={size}>
                <circle
                    className="progress-circle-background"
                    cx={radius}
                    cy={radius}
                    r={radius}
                    strokeWidth={size / 8}
                />
                <circle
                    className={`progress-circle-progress${isPlaying ? ' playing' : ''}`}
                    cx={radius}
                    cy={radius}
                    r={radius}
                    strokeWidth={size / 8}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    stroke={color}
                />
            </svg>
            <img className="progress-circle-image" src={image} alt="Album Cover" />
        </div>
    );
};

export default ProgressCircle;
