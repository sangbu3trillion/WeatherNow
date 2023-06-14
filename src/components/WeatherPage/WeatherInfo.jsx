import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {dfs_xy_conv} from '../Utils/XYtranselate';
import BasetimeCalc from '../Utils/BasetimeCalc';
import Sunny from '../imgs/icons8-태양.gif';
import Cloud from '../imgs/icons8-부분적으로-흐린-날 (1).gif';
import Cloud_many from '../imgs/icons8-비.gif';

const WeatherInfo = () => {
    const [x, setX] = useState(null);
    const [y, setY] = useState(null);
    const [weather_vilage, setWeather_vilage] = useState(null);
    const [weather_ultra_cur_temp, setWeather_ultra_cur_temp] = useState(null);
    const [weather_ultra_cur_sky, setWeather_ultra_cur_sky] = useState(null);
    const [weather_ultra_cur_pty, setWeather_ultra_cur_pty] = useState(null);
    const [weather_ultra_cur_reh, setWeather_ultra_cur_reh] = useState(null);

    const [baseDate_vilage, setBaseDate_vilage] = useState(null);
    const [baseDate_ultra, setBaseDate_ultra] = useState(null);
    const [baseTime_vilage, setBaseTime_vilage] = useState(null);
    const [baseTime_ultra, setBaseTime_ultra] = useState(null);

    let temp = new Date();
    let hour = temp.getHours();
    hour = hour - 1 < 0 ? (hour = 0) : hour - 1;

    let year = temp.getFullYear();
    let month = temp.getMonth() + 1 < 10 ? '0' + (temp.getMonth() + 1) : temp.getMonth() + 1;
    let date = temp.getDate();

    function init() {
        function success(pos) {
            const x = pos.coords.latitude;
            const y = pos.coords.longitude;
            setBaseTime_vilage(BasetimeCalc(hour).baseTime);
            setBaseTime_ultra(hour < 10 ? '0' + hour : hour);

            setBaseDate_vilage(
                BasetimeCalc(hour).flag
                    ? year.toString() + month.toString() + (date - 1).toString()
                    : year.toString() + month.toString() + date.toString(),
            );
            setBaseDate_ultra(year.toString() + month.toString() + date.toString());
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
    // async function fechDate() {
    //     const res = await axios.get('/1360000/VilageFcstInfoService_2.0/getVilageFcst', {
    //         params: {
    //             serviceKey: 'c0ThfABkN/fAsmZROXef62eRVKB+yqalaUdIY9JGtNTDm+NqMwt52rHbVMAJIbe3DoZQN/mA/siPgjowhnGSnA==',
    //             numOfRows: 500,
    //             pageNo: 1,
    //             base_date: baseDate_vilage,
    //             base_time: baseTime_vilage + '00',
    //             nx: Math.floor(rs.x),
    //             ny: Math.floor(rs.y),
    //             dataType: 'JSON',
    //         },
    //     });
    //     const filteredWeather = res.data.response.body.items.item.filter(
    //         item =>
    //             item.category === 'SKY' ||
    //             item.category === 'PTY' ||
    //             item.category === 'TMN' ||
    //             item.category === 'TMX' ||
    //             item.category === 'REH',
    //     );
    //     // const res1=await axios.get
    // }

    // 동네예보 axios START
    useEffect(() => {
        if (baseTime_vilage) {
            console.log(baseTime_vilage, '빌리지 타임');
            const rs = dfs_xy_conv('toXY', x, y);
            axios
                .get('/1360000/VilageFcstInfoService_2.0/getVilageFcst', {
                    params: {
                        serviceKey:
                            'c0ThfABkN/fAsmZROXef62eRVKB+yqalaUdIY9JGtNTDm+NqMwt52rHbVMAJIbe3DoZQN/mA/siPgjowhnGSnA==',
                        numOfRows: 500,
                        pageNo: 1,
                        base_date: baseDate_vilage,
                        base_time: baseTime_vilage + '00',
                        nx: Math.floor(rs.x),
                        ny: Math.floor(rs.y),
                        dataType: 'JSON',
                    },
                })
                .then(res => {
                    console.log('---------res', res);
                    const filteredWeather = res.data.response.body.items.item.filter(
                        item =>
                            item.category === 'SKY' ||
                            item.category === 'PTY' ||
                            item.category === 'TMN' ||
                            item.category === 'TMX' ||
                            item.category === 'REH',
                    );
                    setWeather_vilage(filteredWeather);
                })
                .catch(err => console.log(err));
        }
    }, [baseTime_vilage, x, y]);

    // 동네예보 axios END

    // 단기예보 axios START
    useEffect(() => {
        if (baseTime_ultra) {
            console.log(baseTime_ultra, '단기예보 베이스 타임');
            const rs = dfs_xy_conv('toXY', x, y);

            axios
                .get(
                    `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?serviceKey=c0ThfABkN%2FfAsmZROXef62eRVKB%2ByqalaUdIY9JGtNTDm%2BNqMwt52rHbVMAJIbe3DoZQN%2FmA%2FsiPgjowhnGSnA%3D%3D&numOfRows=60&pageNo=1&base_date=${baseDate_ultra}&base_time=${baseTime_ultra}00&nx=${Math.floor(
                        rs.x,
                    )}&ny=${Math.floor(rs.y)}&dataType=JSON`,
                )
                .then(responses => {
                    console.log('---------ultra', responses);
                    const cur_temp = responses.data.response.body.items.item.filter(item => item.category === 'T1H');

                    const cur_sky = responses.data.response.body.items.item.filter(item => item.category === 'SKY');

                    const cur_pty = responses.data.response.body.items.item.filter(item => item.category === 'PTY');

                    const cur_reh = responses.data.response.body.items.item.filter(item => item.category === 'REH');

                    setWeather_ultra_cur_temp(cur_temp);
                    setWeather_ultra_cur_sky(cur_sky);
                    setWeather_ultra_cur_pty(cur_pty);
                    setWeather_ultra_cur_reh(cur_reh);
                })
                .catch(err => console.log(err));
        }
    }, [baseTime_ultra, x, y]);
    // 단기예보 axios END

    console.log('------vilage', weather_vilage);
    console.log('------ultra', weather_ultra_cur_temp);
    console.log('------ultra', weather_ultra_cur_sky);
    console.log('------ultra', weather_ultra_cur_pty);
    console.log('------ultra', weather_ultra_cur_reh);

    return (
        <div id="wrap">
            <div className="current_temp_and_img">
                {weather_ultra_cur_temp ? (
                    <li>{weather_ultra_cur_temp[0].fcstValue}°</li>
                ) : (
                    <li>Loading weather data...</li>
                )}
                {weather_ultra_cur_sky ? (
                    <li>
                        {weather_ultra_cur_sky[0].fcstValue === 0 ? (
                            <img src={Sunny} />
                        ) : weather_ultra_cur_sky[0].fcstValue === 3 ? (
                            <img src={Cloud} />
                        ) : (
                            <img src={Cloud_many} />
                        )}
                    </li>
                ) : (
                    <li>Loading weather data...</li>
                )}
            </div>
            <div className="high_low_temp">
                {weather_vilage ? (
                    // some() 메서드는 배열 안의 어떤 요소라도 주어진 판별 함수를 적어도 하나라도 통과하는지 테스트
                    weather_vilage.some(item => item.category === 'TMN' || item.category === 'TMX') ? (
                        <p>
                            {weather_vilage.find(item => item.category === 'TMN').fcstValue}°/&nbsp;
                            {weather_vilage.find(item => item.category === 'TMX').fcstValue}°
                        </p>
                    ) : (
                        <p>No temperature data available.</p>
                    )
                ) : (
                    <p>Loading weather data...</p>
                )}
            </div>
            <div className="current_reh">
                {weather_ultra_cur_reh ? (
                    <p>습도: {weather_ultra_cur_reh[0].fcstValue}%</p>
                ) : (
                    <p>Loading weather data...</p>
                )}
            </div>
        </div>
    );
};

export default WeatherInfo;
