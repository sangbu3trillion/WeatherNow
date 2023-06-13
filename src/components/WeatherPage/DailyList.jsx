import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {dfs_xy_conv} from '../Utils/XYtranselate';
import BasetimeCalc from '../Utils/BasetimeCalc';

export default function DailyList() {
    const [x, setX] = useState(null);
    const [y, setY] = useState(null);
    const [weather, setWeather] = useState(null);
    const [baseDate, setBaseDate] = useState(null);
    const [baseTime, setBaseTime] = useState(null);

    let temp = new Date();
    let hour = temp.getHours();
    hour = hour - 1;

    let year = temp.getFullYear();
    let month = temp.getMonth() + 1 < 10 ? '0' + (temp.getMonth() + 1) : temp.getMonth() + 1;
    let date = temp.getDate();

    function init() {
        function success(pos) {
            const x = pos.coords.latitude;
            const y = pos.coords.longitude;
            setBaseTime(BasetimeCalc(hour));
            setBaseDate(year.toString() + month.toString() + date.toString());

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
            const rs = dfs_xy_conv('toXY', x, y);
            axios
                .get('/1360000/VilageFcstInfoService_2.0/getVilageFcst', {
                    params: {
                        serviceKey:
                            'c0ThfABkN/fAsmZROXef62eRVKB+yqalaUdIY9JGtNTDm+NqMwt52rHbVMAJIbe3DoZQN/mA/siPgjowhnGSnA==',
                        numOfRows: 500,
                        pageNo: 1,
                        base_date: baseDate,
                        base_time: baseTime + '00',
                        nx: Math.floor(rs.x),
                        ny: Math.floor(rs.y),
                        dataType: 'JSON',
                    },
                })
                .then(res => setWeather(cur => res.data.response.body.items.item))
                .catch(err => console.log(err));
        }
    }, [baseTime, x, y]);

    return (
        <div>
            {weather.map(e => (
                <div>{e.baseDate}</div>
            ))}
        </div>
    );
}
