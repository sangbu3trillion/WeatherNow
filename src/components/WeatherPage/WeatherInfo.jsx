import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {dfs_xy_conv} from '../Utils/XYtranselate';
import BasetimeCalc from '../Utils/BasetimeCalc';

const WeatherInfo = () => {
    const [x, setX] = useState(null);
    const [y, setY] = useState(null);
    const [weather, setWeather] = useState(null);
    const [baseDate, setBaseDate] = useState(null);
    const [baseTime, setBaseTime] = useState(null);

    let temp = new Date();
    let hour = temp.getHours();
    hour = hour - 1;
    console.log(hour);

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
        if (baseTime) {
            const rs = dfs_xy_conv('toXY', x, y);
            axios
                .get('/1360000/VilageFcstInfoService_2.0/getVilageFcst', {
                    params: {
                        serviceKey:
                            'c0ThfABkN/fAsmZROXef62eRVKB+yqalaUdIY9JGtNTDm+NqMwt52rHbVMAJIbe3DoZQN/mA/siPgjowhnGSnA==',
                        numOfRows: 100,
                        pageNo: 1,
                        base_date: baseDate,
                        base_time: baseTime + '00',
                        nx: Math.floor(rs.x),
                        ny: Math.floor(rs.y),
                        dataType: 'JSON',
                    },
                })
                .then(res => console.log(res))
                .catch(err => console.log(err));
        }
    }, [baseTime, x, y]);

    return (
        <>
            <ul>
                {/* {users.map(user => (
                    <li key={user.b}>
                        {user.username} ({user.name})
                    </li>
                ))} */}
            </ul>
            <br />
            <button>Try loading again</button>
        </>
    );
};
export default WeatherInfo;
