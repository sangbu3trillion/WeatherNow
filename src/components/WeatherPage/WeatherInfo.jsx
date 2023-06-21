import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {dfs_xy_conv} from '../Utils/XYtranselate';
import BasetimeCalc from '../Utils/BasetimeCalc';
import Clock from './Clock';
import Sunny from '../imgs/sunny.gif';
import Cloud from '../imgs/cloudy.gif';
import Cloud_many from '../imgs/blur.gif';
import Marker from '../imgs/icon_location.6b6e7537b41fdb92eb9a.gif';
import LoadingImg from '../imgs/icons8-눈-폭풍.gif';

const WeatherInfo = () => {
    const [lng, setLng] = useState(null);
    const [lat, setLat] = useState(null);
    const [city, setCity] = useState(null); // 도시명 변수
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
            const x = pos.coords.longitude;
            const y = pos.coords.latitude;
            setBaseTime_vilage(BasetimeCalc(hour).baseTime);
            setBaseTime_ultra(hour < 10 ? '0' + hour : hour);

            setBaseDate_vilage(
                BasetimeCalc(hour).flag
                    ? year.toString() + month.toString() + (date - 1).toString()
                    : year.toString() + month.toString() + date.toString(),
            );
            setBaseDate_ultra(year.toString() + month.toString() + date.toString());
            setLng(x);
            setLat(y);
        }

        function error(err) {
            console.log(err);
        }
        navigator.geolocation.getCurrentPosition(success, error);
    }

    useEffect(() => {
        init();
    }, []);

    //kakao api를 이용하여 위도 경도에 해당하는 현재 도시를 가져오는 함수 START
    const fetchCity = async () => {
        console.log('[WeatherRepAndIdx]fetchCity CALLED!!');

        const city = await axios
            .get(`https://dapi.kakao.com/v2/local/geo/coord2address.json?input_coord=WGS84&y=${lat}&x=${lng}`, {
                headers: {Authorization: `KakaoAK 8a2e72241a0c6bdd460d4e3ba175136b`},
            })
            .then(city => {
                console.log('---- [WeatherInfo]전체값', city);
                console.log('---- 도시명', city.data.documents[0].address.region_1depth_name);
                setCity(city.data.documents[0].address.region_3depth_name);
            })
            .catch(e => {
                console.log('error!!'); // 통신 장애 발생시 출력하는 오류
            });
    };
    //kakao api를 이용하여 위도 경도에 해당하는 현재 도시를 가져오는 함수 END

    console.log('도시명은 무엇일까요?', city);

    //lng, lat값이 존재하면 fetchCity를 불러오는 방식 START
    useEffect(() => {
        if (lng && lat) {
            fetchCity();
        }
    }, [lng, lat]);
    //lng, lat값이 존재하면 fetchCity를 불러오는 방식 END

    // city_list에 있는 value를가져오기 위한 코드 END

    useEffect(() => {
        if (baseTime_vilage) {
            console.log(baseTime_vilage, '빌리지 타임');
            const rs = dfs_xy_conv('toXY', lng, lat);
            axios
                .get('/1360000/VilageFcstInfoService_2.0/getVilageFcst', {
                    params: {
                        serviceKey:
                            'c0ThfABkN/fAsmZROXef62eRVKB+yqalaUdIY9JGtNTDm+NqMwt52rHbVMAJIbe3DoZQN/mA/siPgjowhnGSnA==',
                        numOfRows: 500,
                        pageNo: 1,
                        base_date: baseDate_vilage,
                        base_time: baseTime_vilage + '00',
                        nx: Math.floor(rs.lng),
                        ny: Math.floor(rs.lat),
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
    }, [baseTime_vilage, lng, lat]);

    // 동네예보 axios END

    // 단기예보 axios START
    useEffect(() => {
        if (baseTime_ultra) {
            console.log(baseTime_ultra, '단기예보 베이스 타임');
            const rs = dfs_xy_conv('toXY', lng, lat);

            axios
                .get(
                    `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?serviceKey=c0ThfABkN%2FfAsmZROXef62eRVKB%2ByqalaUdIY9JGtNTDm%2BNqMwt52rHbVMAJIbe3DoZQN%2FmA%2FsiPgjowhnGSnA%3D%3D&numOfRows=60&pageNo=1&base_date=${baseDate_ultra}&base_time=${baseTime_ultra}00&nx=${Math.floor(
                        rs.lng,
                    )}&ny=${Math.floor(rs.lat)}&dataType=JSON`,
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
    }, [baseTime_ultra, lng, lat]);
    // 단기예보 axios END

    console.log('------vilage', weather_vilage);
    console.log('------ultra', weather_ultra_cur_temp);
    console.log('------ultra', weather_ultra_cur_sky);
    console.log('------ultra', weather_ultra_cur_pty);
    console.log('------ultra', weather_ultra_cur_reh);

    return (
        <div className="border-solid border-2 rounded-xl w-80 h-55 shadow-lg p-7 bg-white opacity-85">
            <div className="current_temp_and_img flex">
                {weather_ultra_cur_temp ? (
                    <div className="font-gb font-bold text-4xl">{weather_ultra_cur_temp[0].fcstValue}°</div>
                ) : (
                    <div>
                        <img className="object-contain w-20 h-20 " src={LoadingImg} />
                    </div>
                )}
                {weather_ultra_cur_sky ? (
                    <div className="ml-1 ">
                        {weather_ultra_cur_sky[0].fcstValue === '1' ? (
                            <img className="object-contain w-14 h-8" src={Sunny} />
                        ) : weather_ultra_cur_sky[0].fcstValue === '3' ? (
                            <img className="object-contain w-14 h-8" src={Cloud} />
                        ) : (
                            <img className="object-contain w-14 h-8" src={Cloud_many} />
                        )}
                    </div>
                ) : (
                    <div>
                        <img className="object-contain w-20 h-20 " src={LoadingImg} />
                    </div>
                )}
            </div>
            <div className="mb-3">
                {weather_vilage ? (
                    // some() 메서드는 배열 안의 어떤 요소라도 주어진 판별 함수를 적어도 하나라도 통과하는지 테스트
                    weather_vilage.some(item => item.category === 'TMN' || item.category === 'TMX') ? (
                        <p className="font-gb font-bold text-red-400">
                            {weather_vilage.find(item => item.category === 'TMN').fcstValue}°/&nbsp;
                            {weather_vilage.find(item => item.category === 'TMX').fcstValue}°
                        </p>
                    ) : (
                        <p>No temperature data available.</p>
                    )
                ) : (
                    <div>
                        <img className="object-contain w-20 h-20 " src={LoadingImg} />
                    </div>
                )}
            </div>
            <div className="mb-3 flex">
                <div className="mr-1">{city}</div>
                <div>
                    <img className="object-contain w-5 h-5" src={Marker} />
                </div>
            </div>
            <div className="mb-3">
                {weather_ultra_cur_reh ? (
                    <p className="font-gb font-bold text-cyan-600 text-sm ">{weather_ultra_cur_reh[0].fcstValue}%</p>
                ) : (
                    <p>Loading weather data...</p>
                )}
            </div>
            <div>
                <Clock />
            </div>
        </div>
    );
};

export default WeatherInfo;
