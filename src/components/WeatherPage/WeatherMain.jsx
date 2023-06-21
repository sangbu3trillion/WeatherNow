import React from 'react';
import SideBar from '../Utils/SideBar';
import KakaoMap from './KakaoMap';
import WeatherInfo from './WeatherInfo';
import DailyList from './DailyList';
import WeatherRepAndIdx from './WeatherRepAndIdx';
import WeatherRadar from './WeatherSatellite';
import WeatherReport from './WeatherReport';

const WeatherMain = () => {
    return (
        <div className="flex flex-col justify-center w-full">
            <div className="flex  justify-between">
                <KakaoMap />
                <WeatherInfo />
                <WeatherRepAndIdx />
            </div>
            <div className="flex items-center justify-between mt-10 ">
                <DailyList />
                <WeatherRadar />
            </div>
            <div className="w-full mt-10">
                <WeatherReport />
            </div>
        </div>
    );
};

export default WeatherMain;
