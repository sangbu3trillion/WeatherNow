import React, {useEffect, useState} from 'react';
import KakaoMap from './KakaoMap';
import WeatherInfo from './WeatherInfo';
import DailyList from './DailyList';
import WeatherRepAndIdx from './WeatherRepAndIdx';
import WeatherRadar from './WeatherSatellite';
import WeatherReport from './WeatherReport';
// import {useFetchWeatherQuery} from '../../store';
import BasetimeCalc from '../Utils/BasetimeCalc';
import {useFetchWeatherQuery} from '../../store';
const WeatherMain = props => {
    const [x, setX] = useState(null);
    const [y, setY] = useState(null);
    const [baseDate, setBaseDate] = useState(null);
    const [baseTime, setBaseTime] = useState(null);
    let temp = new Date();
    let hour = temp.getHours();
    // let weather = props.props.data.response.body.items.item;
    let weather;
    let year = temp.getFullYear();
    let month = temp.getMonth() + 1 < 10 ? '0' + (temp.getMonth() + 1) : temp.getMonth() + 1;
    let date = temp.getDate();
    const weatherData = useFetchWeatherQuery({
        x,
        y,
        numOfRows: 700,
        baseDate,
        baseTime: baseTime + '00',
    });
    function init() {
        function success(pos) {
            const x = pos.coords.latitude;
            const y = pos.coords.longitude;

            setBaseTime(BasetimeCalc(hour).baseTime);

            if (BasetimeCalc(hour).flag === true) {
                console.log('flag true');
                date = date - 1;
                console.log(date, '55');
                date < 10
                    ? setBaseDate(year.toString() + month.toString() + '0' + date.toString())
                    : setBaseDate(year.toString() + month.toString() + date.toString());
            } else {
                setBaseDate(year.toString() + month.toString() + date.toString());
            }
            setX(x);
            setY(y);
        }

        function error(err) {
            console.log(err);
        }
        navigator.geolocation.getCurrentPosition(success, error);
    }
    useEffect(() => {
        init();
    }, []);
    if (
        weatherData.isLoading ||
        weatherData.isFetching ||
        baseTime === null ||
        baseDate === null ||
        x === null ||
        y === null
    )
        return (
            <div className="flex flex-col justify-center w-full my-0 -ml-20 mt-[144px]">
                <div className="flex justify-between "></div>
                <div className="flex items-center justify-between mt-10 ">
                    <div className="flex items-center justify-center w-screen h-screen">
                        <img src={`${process.env.PUBLIC_URL}/spinner.gif`} />
                    </div>
                </div>
                <div className="w-full mt-10"></div>
            </div>
        );
    if (weatherData.error) {
        weatherData.refetch();
    }
    if (!weatherData.data) return <div>데이터 없음</div>;
    weather = weatherData.data.response.body.items.item;
    let t;
    let skyValue;
    let maxTemp;
    let minTemp;
    let reh;

    weather.map(e => {
        if (e.category === 'TMP' && e.fcstTime === baseTime + '00' && e.fcstDate === baseDate) {
            t = e.fcstValue;
            console.log(t, 't map');
        }
        if (e.fcstTime === baseTime + '00' && e.fcstDate === baseDate) {
            if (e.category === 'PTY' && (e.fcstValue === '1' || e.fcstValue === '4' || e.fcstValue === '2'))
                return (skyValue = 'rain');

            if (e.category === 'PTY' && e.fcstValue === '3') return (skyValue = 'snow');

            if (e.category === 'SKY' && e.fcstValue === '1') {
                skyValue = 'sun';
                console.log('sunny');
            }

            if ((e.category === 'SKY' && e.fcstValue === '3') || e.fcstValue === '4') skyValue = 'cloud';
        }
        if (e.fcstDate === baseDate && e.category === 'TMX') {
            maxTemp = e.fcstValue;
        }
        if (e.fcstDate === baseDate && e.category === 'TMN') {
            minTemp = e.fcstValue;
        }
        if (e.fcstTime === baseTime + '00' && e.fcstDate === baseDate && e.category === 'REH') {
            reh = e.fcstValue;
        }
    });

    return (
        <div className="flex flex-col justify-center w-full my-0 -ml-20 mt-[144px]">
            <div className="flex justify-between ">
                <KakaoMap />
                <WeatherInfo
                    weather={weather}
                    skyValue={skyValue}
                    t={t}
                    maxTemp={maxTemp}
                    minTemp={minTemp}
                    reh={reh}
                />
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
