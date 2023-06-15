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
            <div className="flex flex-col justify-between w-2/6 p-6 overflow-x-scroll border-2 border-solid shadow-md rounded-xl h-96 scrollbar-track-white scrollbar-thumb-blue-300 scrollbar-thumb-rounded-lg scrollbar-thin ">
                {isLoaded && (
                    <div className="flex ">
                        {weather.map(
                            e =>
                                e.category === 'TMP' &&
                                (e.fcstDate === baseDate ||
                                    e.fcstDate[e.fcstDate.length - 1] * 1 === baseDate[baseDate.length - 1] * 1) && (
                                    <div className="ml-1 mr-5 text-2xl font-bold">{e.fcstValue + '°'}</div>
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
                )}
            </div>
        </div>
    );
}
