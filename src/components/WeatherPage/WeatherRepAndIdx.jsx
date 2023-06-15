import axios from 'axios';
import React, {useEffect, useState} from 'react';
const city_list = [{부산: 2600000000}];

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
        <>
            <div>현재 자외선 지수는:</div>
            <div>
                {uv ? (
                    uv.h0 >= 11 ? (
                        <div className="font-gb font-bold text-4xl">위험 수준입니다</div>
                    ) : uv.h0 >= 8 ? (
                        <div className="font-gb font-bold text-4xl">매우 높은 수준입니다</div>
                    ) : uv.h0 >= 6 ? (
                        <div className="font-gb font-bold text-4xl">높은 수준입니다</div>
                    ) : uv.h0 >= 3 ? (
                        <div className="font-gb font-bold text-4xl">보통 수준입니다</div>
                    ) : (
                        <div className="font-gb font-bold text-4xl">낮은 수준입니다</div>
                    )
                ) : (
                    <div>Loading weather data...</div>
                )}
            </div>
            <br />
            {/* 대기확산지수’란 오염물질이 대기중에 유입되어 존재할 경우, 대기상태(소산과 관련된 기상요소)에 의해 변화될 수 있는 가능성 예보를 말한다. */}
            <div>현재 대기확산 지수는:</div>
            <div>
                {air ? (
                    air.h3 <= 100 ? (
                        <div className="font-gb font-bold text-4xl">낮음 단계입니다</div>
                    ) : air.h3 <= 75 ? (
                        <div className="font-gb font-bold text-4xl">보통 단계입니다</div>
                    ) : air.h3 <= 50 ? (
                        <div className="font-gb font-bold text-4xl">높은 단계입니다</div>
                    ) : air.h3 <= 25 ? (
                        <div className="font-gb font-bold text-4xl">매우 높음 단계입니다</div>
                    ) : null
                ) : (
                    <div>Loading weather data...</div>
                )}
            </div>
            <br />
            <div>현재 기상특보 현황은:</div>
            <div>
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
        </>
    );
};

export default WeatherRepAndIdx;
