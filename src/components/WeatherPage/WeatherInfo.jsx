import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {dfs_xy_conv} from '../Utils/XYtranselate';
import BasetimeCalc from '../Utils/BasetimeCalc';
import Clock from './Clock';
import Sunny from '../imgs/sunny.gif';
import Cloud from '../imgs/cloudy.gif';
import Cloud_many from '../imgs/blur.gif';
import Marker from '../imgs/icon_location.6b6e7537b41fdb92eb9a.gif';
import Drop from '../imgs/drop.png';
import LoadingImg from '../imgs/icons8-눈-폭풍.gif';

const WeatherInfo = ({weather, skyValue, t, maxTemp, minTemp, reh}) => {
    console.log(weather, 'weather');
    console.log(skyValue, 'skyValue');
    console.log(t, 't');
    console.log(maxTemp, 'maxTemp');
    console.log(minTemp, 'minTemp');
    console.log(reh, 'reh');

    const [lng, setLng] = useState(null);
    const [lat, setLat] = useState(null);
    const [city, setCity] = useState(null); // 도시명 변수

    function init() {
        function success(pos) {
            const x = pos.coords.longitude;
            const y = pos.coords.latitude;

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

    return (
        <div className="bg-white border-2 border-solid shadow-lg rounded-xl w-80 h-55 p-3 opacity-85">
            <div className="flex current_temp_and_img ml-1">
                <div className="text-7xl font-bold font-gb mb-2">{t}°</div>

                <div className="ml-1 ">
                    <img className="object-contain h-15 w-14 ml-2" src={`resource/${skyValue}.gif`} />
                </div>
            </div>

            <div className="mb-3 ml-1">
                <span className="text-lg font-bold text-indigo-600 font-gb">{minTemp}°</span>
                <span className=" font-bold text-gray-400 font-gb">/ </span>
                <span className="text-2xl font-bold text-red-500 font-gb inline-block">{maxTemp}°</span>
            </div>

            <div className="flex mb-3 ml-1">
                <div className="text-xl font-gb font-bold mr-1">{city}</div>
                <div>
                    <img className="object-contain w-6 h-6" src={Marker} />
                </div>
            </div>

            <div className="flex mb-3">
                <div>
                    <img className="object-contain w-7 h-7" src={Drop} />
                </div>
                <p className="text-lg font-bold font-gb text-cyan-600 ">{reh}%</p>
            </div>

            <div>
                <Clock />
            </div>
        </div>
    );
};

export default WeatherInfo;
