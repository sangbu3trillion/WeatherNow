import React from 'react';

const Controls = ({isPlaying, setIsPlaying, handleNext, handlePrev}) => {
    return (
        <div className="controls">
            <button className="control-button" onClick={handlePrev}>
                Previous
            </button>
            <button className="control-button" onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? 'Pause' : 'Play'}
            </button>
            <button className="control-button" onClick={handleNext}>
                Next
            </button>
        </div>
    );
};

export default Controls;
