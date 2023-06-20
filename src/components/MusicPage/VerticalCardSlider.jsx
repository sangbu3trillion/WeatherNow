import React, {useState} from 'react';

const VerticalCardSlider = ({track}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex(prevIndex => (prevIndex === 0 ? track.album.images.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex(prevIndex => (prevIndex === track.album.images.length - 1 ? 0 : prevIndex + 1));
    };

    if (!track.album || !track.album.artists || track.album.artists.length === 0) {
        return null;
    }

    return (
        <div className="max-w-6xl mx-auto">
            <div className="relative h-96">
                {track.album.images && track.album.images.length > 0 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-4/5 w-4/5 bg-white rounded-lg shadow-md">
                            <div className="relative h-full">
                                <img
                                    className="h-full object-cover rounded-lg"
                                    src={track.album.images[currentIndex].url}
                                    alt="앨범커버"
                                />
                                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black to-transparent">
                                    <h2 className="text-2xl font-bold text-white mb-2">{track.name}</h2>
                                    <p className="text-xl text-gray-300">{track.album.artists[0].name}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <button
                    className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
                    onClick={handlePrev}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-6 h-6"
                    >
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </button>

                <button
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
                    onClick={handleNext}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-6 h-6"
                    >
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default VerticalCardSlider;
