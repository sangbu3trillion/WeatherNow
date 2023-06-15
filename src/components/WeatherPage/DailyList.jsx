import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {dfs_xy_conv} from '../Utils/XYtranselate';
import BasetimeCalc from '../Utils/BasetimeCalc';

export default function DailyList() {
    const [x, setX] = useState(null);
    const [y, setY] = useState(null);
    const [weather, setWeather] = useState([]);
    const [baseDate, setBaseDate] = useState(null);
    const [baseTime, setBaseTime] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    let temp = new Date();
    let hour = temp.getHours();

    let year = temp.getFullYear();
    let month = temp.getMonth() + 1 < 10 ? '0' + (temp.getMonth() + 1) : temp.getMonth() + 1;
    let date = temp.getDate();
    console.log(date, 'hi');

    async function dataPatch() {
        const rs = dfs_xy_conv('toXY', x, y);

        const res = await axios.get('/1360000/VilageFcstInfoService_2.0/getVilageFcst', {
            params: {
                serviceKey: 'c0ThfABkN/fAsmZROXef62eRVKB+yqalaUdIY9JGtNTDm+NqMwt52rHbVMAJIbe3DoZQN/mA/siPgjowhnGSnA==',
                numOfRows: 200,
                pageNo: 1,
                base_date: baseDate,
                base_time: baseTime + '00',
                nx: Math.floor(rs.x),
                ny: Math.floor(rs.y),
                dataType: 'JSON',
            },
        });
        console.log(res);

        setWeather(cur => res.data.response.body.items.item);
        setIsLoaded(true);
    }

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

    useEffect(() => {
        console.log(baseTime);
        console.log(baseDate);
        if (baseTime) {
            dataPatch();
        }
    }, [baseTime, x, y]);

    return (
        <div className="flex items-center justify-center h-screen m-auto ">
            <div className="flex justify-between w-2/6 p-6 overflow-x-scroll border-2 border-solid shadow-md rounded-xl h-96 scrollbar-track-white scrollbar-thumb-blue-300 scrollbar-thumb-rounded-lg scrollbar-thin ">
                {isLoaded && (
                    <div className="flex h=full flex-row w-full justify-center">
                        {weather.map(
                            e =>
                                e.category === 'TMP' &&
                                (e.fcstDate === baseDate ||
                                    e.fcstDate[e.fcstDate.length - 1] * 1 === baseDate[baseDate.length - 1] * 1) && (
                                    <div className="flex flex-col items-center justify-center">
                                        <div className="ml-1 mr-5 text-2xl font-bold">{e.fcstValue + '°'}</div>
                                        <div className="flex flex-col-reverse items-center h-full my-4 mr-6 bg-gray-200 rounded-full shadow-lg dark:bg-gray-500">
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
                {/* {isLoaded && (
                    <div className="flex justify-between h-full my-5">
                        {weather.map(
                            e =>
                                e.category === 'TMP' &&
                                (e.fcstDate === baseDate ||
                                    e.fcstDate[e.fcstDate.length - 1] * 1 === baseDate[baseDate.length - 1] * 1) && (
                                    <>
                                        <div className="flex flex-col-reverse w-full h-full mr-6 shadow-lg rou7ded-full bg-1ray-200 dark:bg-gray-700">
                                            <div
                                                className={`${
                                                    e.fcstValue < 25
                                                        ? 'bg-gradient-to-t from-red-200 to-red-400'
                                                        : 'bg-gradient-to-t from-red-300 to-red-700'
                                                }  text-xs font-medium text-blue-100
                                             text-center p-0.5 leading-none rounded-full flex justify-center items-center `}
                                                style={{height: `${e.fcstValue * 1 + 35}%`}}
                                            >
                                                {' '}
                                                <p> {e.fcstValue + '°'}</p>
                                            </div>
                                        </div>
                                    </>
                                ),
                        )}
                    </div>
                )}
                {isLoaded && (
                    <div className="flex scrollbar scrollbar-track-orange-500 scrollbar-thumb-slate-400">
                        {weather.map(
                            e =>
                                e.category === 'TMP' &&
                                (e.fcstDate === baseDate ||
                                    e.fcstDate[e.fcstDate.length - 1] * 1 === baseDate[baseDate.length - 1] * 1) && (
                                    <div className="mr-5 text-base font-semibold">
                                        {e.fcstTime[0] + e.fcstTime[1] + ':' + e.fcstTime[2] + e.fcstTime[3]}
                                    </div>
                                ),
                        )}
                    </div>
                )} */}
            </div>
        </div>
    );
}
