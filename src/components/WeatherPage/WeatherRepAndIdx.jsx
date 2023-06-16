import axios from 'axios';
import React, {useEffect, useState} from 'react';
import Clock from './Clock';
import Bad from '../imgs/bad.jpg';
import Superbad from '../imgs/superbad.jpg';
import Normal from '../imgs/normal.jpg';
import Pregood from '../imgs/pregood.jpg';
import Good from '../imgs/good.jpg';

const city_list = [
    {부산: 2600000000},
    {서울: 1100000000},
    {강원특별자치도: 5100000000},
    {경기: 4100000000},
    {경남: 4800000000},
    {경북: 4700000000},
    {광주: 2900000000},
    {대구: 2700000000},
    {대전: 3000000000},
    {세종특별자치시: 3600000000},
    {울산: 3100000000},
    {인천: 2800000000},
    {전남: 4600000000},
    {전북: 4500000000},
    {제주특별자치도: 5000000000},
    {충남: 4400000000},
    {충북: 4300000000},
];

const WeatherRepAndIdx = () => {
    const [city, setCity] = useState(null);
    const [uv, setUv] = useState(null);
    const [air, setAir] = useState(null);
    const [report, setReport] = useState(null);
    const [x, setX] = useState(null);
    const [y, setY] = useState(null);

    let temp = new Date();
    let year = temp.getFullYear();
    let month = temp.getMonth() + 1 < 10 ? '0' + (temp.getMonth() + 1) : temp.getMonth() + 1;
    let date = temp.getDate() < 10 ? '0' + temp.getDate() : temp.getDate();

    let hour = temp.getHours() < 10 ? '0' + temp.getHours() : temp.getHours();
    let time = year.toString() + month.toString() + date.toString() + hour.toString();

    //현재 위도 경도를 가져오는 작업 START
    function init() {
        function success(pos) {
            const x = pos.coords.longitude;
            const y = pos.coords.latitude;
            setX(x);
            setY(y);
        }
        navigator.geolocation.getCurrentPosition(success);
    }

    useEffect(() => {
        init();
    }, []);
    //현재 위도 경도를 가져오는 작업 END

    //kakao api를 이용하여 위도 경도에 해당하는 현재 도시를 가져오는 함수 START
    const fetchCity = async () => {
        console.log('[WeatherRepAndIdx]fetchCity CALLED!!');

        const city = await axios
            .get(`https://dapi.kakao.com/v2/local/geo/coord2address.json?input_coord=WGS84&y=${y}&x=${x}`, {
                headers: {Authorization: `KakaoAK ${process.env.REACT_APP_API_KAKAO_API_H}`},
            })
            .then(city => {
                console.log('---- 전체값', city);
                console.log('---- 도시명', city.data.documents[0].address.region_1depth_name);
                setCity(city.data.documents[0].address.region_1depth_name);
            })
            .catch(e => {
                console.log('error!!'); // 통신 장애 발생시 출력하는 오류
            });
    };
    //kakao api를 이용하여 위도 경도에 해당하는 현재 도시를 가져오는 함수 END

    //x, y값이 존재하면 fetchCity를 불러오는 방식 START
    useEffect(() => {
        if (x && y) {
            fetchCity();
        }
    }, [x, y]);
    //x, y값이 존재하면 fetchCity를 불러오는 방식 END

    // city_list에 있는 value를가져오기 위한 코드 START
    const getCityCode = city => {
        for (let i = 0; i < city_list.length; i++) {
            const entry = city_list[i];
            const cityName = Object.keys(entry)[0];
            if (cityName === city) {
                return entry[cityName];
            }
        }
        return null; // 해당 도시가 city_list에 없는 경우 null 반환
    };
    const cityCode = getCityCode(city);
    console.log('도시명은 무엇일까요?', city);
    console.log('도시명은 무엇일까요?', cityCode);

    // city_list에 있는 value를가져오기 위한 코드 END

    // 자외선 API를 가져오는 axios 코드 START

    const fetchUv = async () => {
        console.log(time);
        const uv_res = await axios
            .get(`/1360000/LivingWthrIdxServiceV4/getUVIdxV4`, {
                params: {
                    serviceKey: process.env.REACT_APP_API_LIVING_WEATHER_API,
                    numOfRows: 10,
                    pageNo: 1,
                    areaNo: cityCode,
                    time: time,
                    dataType: 'JSON',
                },
            })
            .then(uv_res => {
                // .then은 get으로 가져오면, 그 다음에 가져온 데이터로 다음과 같이 처리하라는 의미
                // 통신이 왔다 갔다 하면 성공으로 본다.(제대로 데이터를 못 받아도)
                console.log('success!!'); // 그래서 원래 데이터를 받는 검수과정이 들어 가야 한다.
                console.log('자와선 데이터', uv_res.data.response.body.items.item[0]);
                setUv(uv_res.data.response.body.items.item[0]);
            })
            .catch(e => {
                console.log('error!!'); // 통신 장애 발생시 출력하는 오류
            });
    };

    // 자외선 API를 가져오는 axios 코드 END

    //cityCode값이 존재하면 fetchUv 불러오는 방식 START
    useEffect(() => {
        if (cityCode) {
            fetchUv();
        }
    }, [time, cityCode]);
    //cityCode값이 존재하면 fetchUv 불러오는 방식 END

    // 대기확산지수 API를 가져오는 axios 코드 START

    const fetchAir = async () => {
        const air_res = await axios
            .get(`/1360000/LivingWthrIdxServiceV4/getAirDiffusionIdxV4`, {
                params: {
                    serviceKey: process.env.REACT_APP_API_LIVING_WEATHER_API,
                    numOfRows: 10,
                    pageNo: 1,
                    areaNo: cityCode,
                    time: time,
                    dataType: 'JSON',
                },
            })
            .then(air_res => {
                // .then은 get으로 가져오면, 그 다음에 가져온 데이터로 다음과 같이 처리하라는 의미
                // 통신이 왔다 갔다 하면 성공으로 본다.(제대로 데이터를 못 받아도)
                console.log('success!!'); // 그래서 원래 데이터를 받는 검수과정이 들어 가야 한다.
                console.log('대기확산지수', air_res.data.response.body.items.item[0]);
                setAir(air_res.data.response.body.items.item[0]);
            })
            .catch(e => {
                console.log('error!!'); // 통신 장애 발생시 출력하는 오류
            });
    };

    // 대기확산지수 API를 가져오는 axios 코드 END

    //cityCode값이 존재하면 fetchUv 불러오는 방식 START
    useEffect(() => {
        if (cityCode) {
            fetchAir();
        }
    }, [time, cityCode]);
    //cityCode값이 존재하면 fetchUv 불러오는 방식 END

    // 기상특보 API를 가져오는 axios 코드 START

    const fetchReport = async () => {
        const report_res = await axios
            .get(`/1360000/WthrWrnInfoService/getPwnStatus`, {
                params: {
                    serviceKey:
                        '6YO4sbIcPIzV2/WMukgKakcdfJwxLW28pUxsGNGerNPxgVk/QNBq7t1DuwfGMoQsdDgTduvyC7pbd1qacRTvRQ==',
                    numOfRows: 10,
                    pageNo: 1,
                    dataType: 'JSON',
                },
            })
            .then(report_res => {
                // .then은 get으로 가져오면, 그 다음에 가져온 데이터로 다음과 같이 처리하라는 의미
                // 통신이 왔다 갔다 하면 성공으로 본다.(제대로 데이터를 못 받아도)
                console.log('success!!'); // 그래서 원래 데이터를 받는 검수과정이 들어 가야 한다.
                console.log('기상특보', report_res.data.response.body.items.item[0]);
                setReport(report_res.data.response.body.items.item[0]);
            })
            .catch(e => {
                console.log('error!!'); // 통신 장애 발생시 출력하는 오류
            });
    };

    // 기상특보 API를 가져오는 axios 코드 END

    //time값이 존재하면 fetchReport 불러오는 방식 START
    useEffect(() => {
        if (time) {
            fetchReport();
        }
    }, [time]);
    //time값이 존재하면 fetchReport 불러오는 방식 END

    return (
        <div className="border-solid border-2 rounded-xl w-56 shadow-lg p-6 text-center">
            <div className="font-gb font-bold text-xl mb-3.5">현재 생활·보건 지수 </div>
            <div className="mb-3.5">
                {uv ? (
                    uv.h0 >= 11 ? (
                        <>
                            <div className="flex flex-col my-auto items-center">
                                <img className="object-contain w-20 h-20 " src={Superbad} />
                            </div>
                            <div className="text-sm text-red-600 mb-2">위험</div>
                            <div className="font-gb text-base font-bold">자외선지수</div>
                        </>
                    ) : uv.h0 >= 8 ? (
                        <>
                            <div className="flex flex-col my-auto items-center">
                                <img className="object-contain w-10 h-10 " src={Bad} />
                            </div>
                            <div className="text-sm text-red-400 mb-2">매우높음</div>
                            <div className="font-gb text-base font-bold">자외선지수</div>
                        </>
                    ) : uv.h0 >= 6 ? (
                        <>
                            <div className="flex flex-col my-auto items-center">
                                <img className="object-contain w-20 h-20 " src={Normal} />
                            </div>
                            <div className="text-sm text-orange-400 mb-2">높음</div>
                            <div className="font-gb text-base font-bold">자외선지수</div>
                        </>
                    ) : uv.h0 >= 3 ? (
                        <>
                            <div className="flex flex-col my-auto items-center">
                                <img className="object-contain w-20 h-20 " src={Pregood} />
                            </div>
                            <div className="text-sm text-green-500 mb-2">보통</div>
                            <div className="font-gb text-base font-bold">자외선지수</div>
                        </>
                    ) : (
                        <>
                            <div className="flex flex-col my-auto items-center">
                                <img className="object-contain w-20 h-20 " src={Good} />
                            </div>
                            <div className="text-sm text-blue-400 mb-2">낮음</div>
                            <div className="font-gb text-base font-bold">자외선지수</div>
                        </>
                    )
                ) : (
                    <div>Loading weather data...</div>
                )}
            </div>

            <div className="mb-3">
                {air ? (
                    air.h3 <= 100 ? (
                        <>
                            <div className="flex flex-col my-auto items-center">
                                <img className="object-contain w-10 h-10 " src={Good} />
                            </div>
                            <div className="text-sm text-blue-400 mb-2">낮음</div>
                            <div className="font-gb text-base font-bold">대기정체지수</div>
                        </>
                    ) : air.h3 <= 75 ? (
                        <>
                            <div className="flex flex-col my-auto items-center">
                                <img className="object-contain w-10 h-10 " src={Pregood} />
                            </div>
                            <div className="text-sm text-green-500 mb-2">보통</div>
                            <div className="font-gb text-base font-bold">대기정체지수</div>
                        </>
                    ) : air.h3 <= 50 ? (
                        <>
                            <div className="flex flex-col my-auto items-center">
                                <img className="object-contain w-10 h-10 " src={Normal} />
                            </div>
                            <div className="text-sm text-orange-400 mb-2">높음</div>
                            <div className="font-gb text-base font-bold">대기정체지수</div>
                        </>
                    ) : air.h3 <= 25 ? (
                        <>
                            <div className="flex flex-col my-auto items-center">
                                <img className="object-contain w-10 h-10 " src={Bad} />
                            </div>
                            <div className="text-sm text-red-400 mb-2">매우높음</div>
                            <div className="font-gb text-base font-bold">대기정체지수</div>
                        </>
                    ) : null
                ) : (
                    <div>Loading weather data...</div>
                )}
            </div>
            <div className="mb-3">
                <div className="font-gb font-bold text-xl ">기상특보 현황</div>
                {report ? (
                    report.other && report.t6 && report.t7 === 'o 없음' ? (
                        <div>특보사항은 없습니다.</div>
                    ) : (
                        <div>
                            참고사항: {report.other} 특보: {report.t6} 예비특보: {report.t7}{' '}
                        </div>
                    )
                ) : (
                    <div>Loading weather data...</div>
                )}
            </div>
        </div>
    );
};

export default WeatherRepAndIdx;
