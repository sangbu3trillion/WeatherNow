import React from 'react';
import imgs from './logo.png';

export default function PlayList() {
    // 음악 차트 데이터를 가져오는 코드 작성
    const chartData = [
        {title: 'Song 1', artist: 'Artist 1', album: 'album 1'},
        {title: 'Song 2', artist: 'Artist 2', album: 'album 2'},
        {title: 'Song 3', artist: 'Artist 3', album: 'album 3'},
        {title: 'Song 4', artist: 'Artist 4', album: 'album 4'},
        {title: 'Song 5', artist: 'Artist 5', album: 'album 5'},
    ];
    return (
        <div className="font-gb w-5/6 my-0 mx-auto">
            <div className="font-bold text-5xl my-10 grid place-items-left">Today Music</div>
            <div>
                <ul className="gap-3 w-auto cursor-pointer grid place-items-center">
                    {/* sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 */}
                    {chartData.map((song, index) => (
                        <li key={index} className="bg-white shadow-lg rounded-lg p-4 grid grid-cols-4 gap-4">
                            <div>
                                <img src={imgs} className="w-16 h-14"></img>
                            </div>
                            <div className="mx-5">
                                <h2 className="text-xl font-bold mb-2">{song.title}</h2>
                                <p className="text-gray-500">{song.artist}</p>
                            </div>
                            <div className="mx-20 my-auto">
                                <p>{song.album}</p>
                            </div>
                            <div className="mx-20 my-auto">
                                <button className="bg-gray-200 fas fa-play text-white hover:bg-gray-300 hover:text-black font-bold py-2 px-4 rounded"></button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
