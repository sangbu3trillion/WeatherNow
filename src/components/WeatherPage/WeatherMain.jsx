import React from 'react';
import SideBar from '../Utils/SideBar';
import KakaoMap from './KakaoMap';
import WeatherInfo from './WeatherInfo';
import DailyList from './DailyList';

const WeatherMain = () => {
    return (
        <div className="flex flex-col justify-center w-full">
            <div className="flex items-center justify-center">
                <KakaoMap />
                <WeatherInfo />
            </div>
            <div className="flex items-center justify-center">
                <DailyList />
            </div>
        </div>
    );
};

export default WeatherMain;
