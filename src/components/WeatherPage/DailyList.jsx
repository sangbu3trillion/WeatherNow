import React, {useEffect, useState} from 'react';
import BasetimeCalc from '../Utils/BasetimeCalc';
import {CheckWeather} from '../Utils/CheckWeather';
import {useFetchWeatherQuery, useFetchFoodQuery} from '../../store';
import Loading from '../Loading';

export default function DailyList() {
    const [x, setX] = useState(null);
    const [y, setY] = useState(null);
    const [baseDate, setBaseDate] = useState(null);
    const [baseTime, setBaseTime] = useState(null);
    const [today, setToday] = useState(true); //오늘 날씨
    const [tommorow, setTommorow] = useState(false);
    const [afterTommorow, setAfterTommorow] = useState(false);
    const [flag, setFlag] = useState(false);
    let temp = new Date();
    let hour = temp.getHours();

    let year = temp.getFullYear();
    let month = temp.getMonth() + 1 < 10 ? '0' + (temp.getMonth() + 1) : temp.getMonth() + 1;
    let date = temp.getDate();
    let weather;
    const weatherData = useFetchWeatherQuery({
        x,
        y,
        numOfRows: 700,
        baseDate,
        baseTime: baseTime + '00',
    });
    // weatherData.data && setFlag(true);
    console.log(weatherData.data, 'data');
    console.log(weatherData.isLoading, 'isLoading');
    console.log(weatherData.error, 'error');

    // function dataPatch2() {
    //     console.log(data, 'data');
    //     // refetch();
    //     setWeather(data.response.body.items.item);
    // }

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

    // useEffect(() => {
    //     console.log(baseTime);
    //     console.log(baseDate);
    //     if (baseTime) {
    //         // dataPatch();
    //         if (!isLoading) dataPatch2();
    //     }
    // }, [baseTime, x, y, isLoading]);

    const TodayHandler = () => {
        console.log('today handler');
        setToday(true);
        setAfterTommorow(false);
        setTommorow(false);
        // setBaseDate(year.toString() + month.toString() + date.toString());
    };

    const TommorowHandler = () => {
        console.log('tommorow handler');
        setToday(false);
        setAfterTommorow(false);
        setTommorow(true);
        console.log(baseDate, 'baseDate');
        // setBaseDate(year.toString() + month.toString() + (date + 1).toString());
    };

    const DayAfterTomorrow = () => {
        console.log('day after tomorrow');
        setTommorow(false);
        setToday(false);
        setAfterTommorow(true);
        // setBaseDate(year.toString() + month.toString() + (date + 2).toString());
    };

    console.log(weatherData.isFetching, 'isFetching');
    console.log(weatherData.isLoading, 'isLoading');

    if (
        weatherData.isLoading ||
        weatherData.isFetching ||
        baseTime === null ||
        baseDate === null ||
        x === null ||
        y === null
    ) {
        return <div>로딩중..</div>;
    }
    if (weatherData.error) {
        weatherData.refetch();
        return <div>에러가 발생했습니다</div>;
    }
    if (!weatherData.data) {
        console.log('null');
        return null;
    }
    weather = weatherData.data.response.body.items.item;
    return (
        <>
            <div className="flex flex-col my-auto ">
                <div className="flex w-80">
                    <p className="mr-2 text-2xl font-bold font-gb">기온 및 날씨|</p>
                    <p
                        className={`mr-1 ${today ? 'text-2xl' : 'text-xl'}  ${
                            !today && 'text-gray-400'
                        } font-bold cursor-pointer font-gb`}
                        onClick={TodayHandler}
                    >
                        오늘
                    </p>
                    <p
                        className={`mr-1 ${tommorow ? 'text-2xl' : 'text-xl'}  font-bold ${
                            !tommorow && 'text-gray-400'
                        } cursor-pointer font-gb`}
                        onClick={TommorowHandler}
                    >
                        내일
                    </p>
                    <p
                        className={`mr-1 ${afterTommorow ? 'text-2xl' : 'text-xl'} font-bold ${
                            !afterTommorow && 'text-gray-400'
                        } cursor-pointer font-gb`}
                        onClick={DayAfterTomorrow}
                    >
                        모레
                    </p>
                </div>
                <div className="flex justify-between max-w-lg min-w-0 p-6 overflow-x-scroll border-2 border-solid shadow-md rounded-xl h-96 scrollbar-track-white scrollbar-thumb-blue-300 scrollbar-thumb-rounded-lg scrollbar-thin ">
                    {today && (
                        <div className="flex flex-row w-full h-full ">
                            {weather.map(
                                (e, idx) =>
                                    e.category === 'TMP' &&
                                    (e.fcstDate === baseDate ||
                                        e.fcstDate[e.fcstDate.length - 1] * 1 ===
                                            baseDate[baseDate.length - 1] * 1) && (
                                        <div key={idx} className="flex flex-col items-center justify-center">
                                            <div className="ml-1 mr-4 text-2xl font-bold">{e.fcstValue + '°'}</div>
                                            <div>
                                                <img
                                                    src={`resource/${CheckWeather(
                                                        weather,
                                                        e.fcstTime,
                                                        1,
                                                        e.baseDate,
                                                    )}.gif`}
                                                    alt="클라우드"
                                                    className="w-8 h-8 mr-3"
                                                ></img>
                                            </div>
                                            <div className="flex flex-col-reverse items-center h-full my-4 mr-3 bg-gray-200 rounded-full shadow-lg dark:bg-gray-500">
                                                <div
                                                    className={`${
                                                        e.fcstValue < 25
                                                            ? 'bg-gradient-to-t from-blue-100 to-red-400'
                                                            : 'bg-gradient-to-t from-red-300 to-red-700'
                                                    }  text-xs font-medium text-blue-100
                                                        text-center p-0.5 leading-none rounded-full flex justify-center items-center   
                                            
                                             `}
                                                    style={{height: `${e.fcstValue * 1 + 35}%`}}
                                                >
                                                    {' '}
                                                    <p> {e.fcstValue + '°'}</p>
                                                </div>
                                            </div>
                                            <div className="mr-5 text-base font-semibold">
                                                {e.fcstTime[0] + e.fcstTime[1] + ':' + e.fcstTime[2] + e.fcstTime[3]}
                                            </div>
                                        </div>
                                    ),
                            )}
                        </div>
                    )}
                    {tommorow && (
                        <div className="flex flex-row w-full h-full ">
                            {weather.map(
                                (e, idx) =>
                                    e.category === 'TMP' &&
                                    e.fcstDate * 1 === baseDate * 1 + 1 && (
                                        <div key={idx} className="flex flex-col items-center justify-center">
                                            <div className="ml-1 mr-4 text-2xl font-bold">{e.fcstValue + '°'}</div>
                                            <div>
                                                <img
                                                    src={`resource/${CheckWeather(
                                                        weather,
                                                        e.fcstTime,
                                                        1,
                                                        year.toString() + month.toString() + (date + 1).toString(),
                                                    )}.gif`}
                                                    alt="클라우드"
                                                    className="w-8 h-8 mr-3"
                                                ></img>
                                            </div>
                                            <div className="flex flex-col-reverse items-center h-full my-4 mr-3 bg-gray-200 rounded-full shadow-lg dark:bg-gray-500">
                                                <div
                                                    className={`${
                                                        e.fcstValue < 25
                                                            ? 'bg-gradient-to-t from-blue-100 to-red-400'
                                                            : 'bg-gradient-to-t from-red-300 to-red-700'
                                                    }  text-xs font-medium text-blue-100
                                             text-center p-0.5 leading-none rounded-full flex justify-center items-center 
                                            
                                             `}
                                                    style={{height: `${e.fcstValue * 1 + 35}%`}}
                                                >
                                                    {' '}
                                                    <p> {e.fcstValue + '°'}</p>
                                                </div>
                                            </div>
                                            <div className="mr-5 text-base font-semibold">
                                                {console.log(tommorow)}
                                                {e.fcstTime[0] + e.fcstTime[1] + ':' + e.fcstTime[2] + e.fcstTime[3]}
                                            </div>
                                        </div>
                                    ),
                            )}
                        </div>
                    )}
                    {afterTommorow && (
                        <div className="flex flex-row w-full h-full">
                            {weather.map(
                                (e, idx) =>
                                    e.category === 'TMP' &&
                                    e.fcstDate * 1 === baseDate * 1 + 2 && (
                                        <div key={idx} className="flex flex-col items-center justify-center">
                                            <div className="ml-1 mr-4 text-2xl font-bold">{e.fcstValue + '°'}</div>
                                            <div>
                                                <img
                                                    src={`resource/${CheckWeather(
                                                        weather,
                                                        e.fcstTime,
                                                        1,
                                                        year.toString() + month.toString() + (date + 2).toString(),
                                                    )}.gif`}
                                                    alt="클라우드"
                                                    className="w-8 h-8 mr-3"
                                                ></img>
                                            </div>
                                            <div className="flex flex-col-reverse items-center h-full my-4 mr-3 bg-gray-200 rounded-full shadow-lg dark:bg-gray-500">
                                                <div
                                                    className={`${
                                                        e.fcstValue < 25
                                                            ? 'bg-gradient-to-t from-blue-100 to-red-400'
                                                            : 'bg-gradient-to-t from-red-300 to-red-700'
                                                    }  text-xs font-medium text-blue-100
                                             text-center p-0.5 leading-none rounded-full flex justify-center items-center 
                                            
                                             `}
                                                    style={{height: `${e.fcstValue * 1 + 35}%`}}
                                                >
                                                    {' '}
                                                    <p> {e.fcstValue + '°'}</p>
                                                </div>
                                            </div>
                                            <div className="mr-5 text-base font-semibold">
                                                {e.fcstTime[0] + e.fcstTime[1] + ':' + e.fcstTime[2] + e.fcstTime[3]}
                                            </div>
                                        </div>
                                    ),
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
