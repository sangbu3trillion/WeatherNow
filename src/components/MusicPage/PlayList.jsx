import React from 'react';

export default function PlayList() {
    // 음악 차트 데이터를 가져오는 코드 작성
    const chartData = [
        {title: 'Song 1', artist: 'Artist 1'},
        {title: 'Song 2', artist: 'Artist 2'},
        {title: 'Song 3', artist: 'Artist 3'},
        {title: 'Song 4', artist: 'Artist 4'},
        {title: 'Song 5', artist: 'Artist 5'},
    ];
    return (
        <div className="font-gb">
            <div className="font-bold text-5xl mb-20">Today Music</div>
            <div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {chartData.map((song, index) => (
                        <li key={index} className="bg-white shadow-lg rounded-lg p-4">
                            <h2 className="text-xl font-bold mb-2">{song.title}</h2>
                            <p className="text-gray-500">{song.artist}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
