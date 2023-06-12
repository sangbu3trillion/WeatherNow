import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {dfs_xy_conv} from '../Utils/XYtranselate';

const WeatherInfo = () => {
    const [x, setX] = React.useState(null);
    const [y, setY] = React.useState(null);
    const [weather, setWeather] = React.useState(null);
    const [baseTime, setBaseTime] = React.useState(null);
    let temp = new Date();
    let hour = temp.getHours();
    hour = hour - 1;
    function init() {
        function success(pos) {
            const x = pos.coords.latitude;
            const y = pos.coords.longitude;
            setBaseTime(hour.toString());
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
        if (baseTime) {
            const rs = dfs_xy_conv('toXY', x, y);
            axios
                .get(
                    `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?serviceKey=${
                        process.env.REACT_APP_API_WEATHER_API
                    }&numOfRows=60&pageNo=15&base_date=20230612&base_time=${baseTime}00&nx=${Math.floor(
                        rs.x,
                    )}&ny=${Math.floor(rs.y)}&dataType=JSON`,
                )
                .then(res => {
                    console.log(res);
                    setWeather(res.data.response.body.items.item);
                })
                .catch(err => {
                    console.log(err);
                });
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
