import axios from 'axios';
import React, {useEffect, useState} from 'react';

//강원도: 105, (서울, 인천, 경기도) : 109, 충북: 131, (대전, 세종, 충남) : 133, (대구, 경북) : 143 , (광주, 전남) : 156, 제주도: 184, (부산,울산,경남) : 159
const city_list = [
    {강원특별자치도: 105},
    {경기: 109},
    {서울: 109},
    {인천: 109},
    {충북: 131},
    {대전: 133},
    {세종특별자치시: 133},
    {충남: 133},
    {경북: 143},
    {대구: 143},
    {광주: 156},
    {전남: 156},
    {제주특별자치도: 184},
    {경남: 159},
    {울산: 159},
    {부산: 159},
];

const WeatherReport = () => {
    const [report, setReport] = useState();
    const [x, setX] = useState();
    const [y, setY] = useState();
    const [city, setCity] = useState();

    let time = new Date();
    let year = time.getFullYear();
    let month = time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1;
    let date = time.getDate() < 10 ? '0' + time.getDate() : time.getDate();

    let cur_time = year.toString() + month.toString() + date.toString();

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
                headers: {Authorization: `KakaoAK 8a2e72241a0c6bdd460d4e3ba175136b`},
            })
            .then(city => {
                console.log('---- 기상특보', city);
                console.log('---- 기상특보도시', city.data.documents[0].address.region_1depth_name);
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

    // 기상특보 API를 가져오는 axios 코드 START
    const fetchReport = async () => {
        const report_res = await axios
            .get(`/1360000/WthrWrnInfoService/getWthrWrnMsg`, {
                params: {
                    serviceKey:
                        '6YO4sbIcPIzV2/WMukgKakcdfJwxLW28pUxsGNGerNPxgVk/QNBq7t1DuwfGMoQsdDgTduvyC7pbd1qacRTvRQ==',
                    numOfRows: 10,
                    pageNo: 1,
                    dataType: 'JSON',
                    stnId: cityCode,
                    fromTmFc: parseInt(cur_time) - 5,
                    toTmFc: cur_time,
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

    //cityCode,time값이 존재하면 fetchReport 불러오는 방식 START
    useEffect(() => {
        if (cityCode) {
            fetchReport();
        }
    }, [cityCode, cur_time]);
    //cityCode, time값이 존재하면 fetchReport 불러오는 방식 END
    console.log('report-----', report);

    return (
        <div className="border-solid border-2 rounded-xl shadow-lg p-6 bg-white opacity-85">
            <div className="mb-3">
                <div className="font-gb font-bold text-xl text-center mb-2 ">기상특보 현황</div>
                {report ? (
                    <>
                        <div className="mb-4">
                            <span className="border-solid border-2 rounded-lg p-2 mr-2 bg-red-500 text-slate-50">
                                {report.t6.slice(2, report.t6.indexOf(':', 2) - 1) === '없'
                                    ? '특보없음'
                                    : report.t6.slice(2, report.t6.indexOf(':', 2) - 1)}
                            </span>
                            <span>
                                {report.t6
                                    .slice(report.t6.indexOf(':', 2) + 1)
                                    .split(/[\(\)]/)
                                    .filter((item, index) => index % 2 === 0) == 'o 없 음'
                                    ? '현재 특보 지역은 없습니다'
                                    : report.t6
                                          .slice(report.t6.indexOf(':', 2) + 1)
                                          .split(/[\(\)]/)
                                          .filter((item, index) => index % 2 === 0)}
                            </span>
                        </div>
                    </>
                ) : (
                    <div className="mb-4">
                        <span className="border-solid border-2 rounded-lg p-2 mr-2 bg-red-500 text-slate-50">
                            특보없음
                        </span>
                        <span>현재 특보 지역은 없습니다</span>
                    </div>
                )}
            </div>
        </div>
    );
};
export default WeatherReport;
