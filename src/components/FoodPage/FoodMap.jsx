import React, {useEffect, useRef, useState} from 'react';
import {Map, MapMarker} from 'react-kakao-maps-sdk';
import FoodContents from './FoodContents';

import {useFetchWeatherQuery, useFetchFoodQuery} from '../../store';
import BasetimeCalc from '../Utils/BasetimeCalc';
import {CheckWeather} from '../Utils/CheckWeather';
import {FoodList} from '../Utils/FoodList';
console.log(FoodList, 'FoodList');

const FoodMap = () => {
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(false);
    const [positions, setPositions] = useState([]);
    const [activeMarker, setActiveMarker] = useState(null);
    // const [info, setInfo] = useState(null);
    const [x, setX] = useState(null);
    const [y, setY] = useState(null);
    const [baseTime, setBasetime] = useState(null);
    const [baseDate, setBaseDate] = useState(null);

    let temp = new Date();
    let hour = temp.getHours();
    let year = temp.getFullYear();
    let month = temp.getMonth() + 1 < 10 ? '0' + (temp.getMonth() + 1) : temp.getMonth() + 1;
    let date = temp.getDate();

    const weatherData = useFetchWeatherQuery({
        //날씨 데이터 가져오기
        x,
        y,
        numOfRows: 253, //날씨데이터 253개 , 1시간에 6개, 새벽3시부터 00시
        baseDate,
        baseTime: baseTime + '00',
    });

    const foodData = useFetchFoodQuery(); //음식 데이터 가져오기

    console.log(weatherData.data, 'data');
    console.log(foodData.data, 'foodData');

    function init() {
        //위치정보 가져오기, 위도경도 가져오기
        function success(pos) {
            const x = pos.coords.latitude;
            const y = pos.coords.longitude;

            setBasetime(BasetimeCalc(hour).baseTime);

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
        navigator.geolocation.getCurrentPosition(success, error); //사용자의 현재위치
    }

    useEffect(() => {
        init();
        // fetchUsers();
    }, []);

    const handleMarkerClick = position => {
        // console.log(clickRef.current.Gb);
        // console.log(position, 'position');
        // console.log(position, 'position');
        // console.log(info[positions.indexOf(activeMarker)]);
        setActiveMarker(position);
    };

    if (
        weatherData.isFetching ||
        foodData.isFetching ||
        baseTime === null ||
        baseDate === null ||
        x === null ||
        y === null
    ) {
        return <div>로딩중..</div>;
    }
    if (weatherData.error || foodData.error) {
        weatherData.refetch();
        foodData.refetch();
        return <div>에러가 발생했습니다</div>;
    }
    if (!weatherData.data || !foodData.data) {
        console.log('null');
        return null;
    }

    const weather = weatherData.data.response.body.items.item; //날씨 데이터

    let fwth = weather.filter(e => {
        if (e.fcstTime === baseTime + '00' && (e.category === 'PTY' || e.category === 'SKY')) return true; //PTY강수형태, SKY 하늘의 상태
        return false;
    });

    console.log(fwth, 'fwth');
    let ret = CheckWeather(fwth, '', 2);
    console.log(ret, 'ret');

    let test = foodData.data.getFoodKr.item.filter(e => e.RPRSNTV_MENU.includes(FoodList[0][ret][0]));
    let test2 = foodData.data.getFoodKr.item.filter(e => e.RPRSNTV_MENU.includes(FoodList[0][ret][3]));
    let test3 = foodData.data.getFoodKr.item.filter(e => e.RPRSNTV_MENU.includes(FoodList[0][ret][8]));
    let test4 = foodData.data.getFoodKr.item.filter(e => e.RPRSNTV_MENU.includes(FoodList[0][ret][12]));
    let test5 = foodData.data.getFoodKr.item.filter(e => e.RPRSNTV_MENU.includes(FoodList[0][ret][34]));
    let test6 = foodData.data.getFoodKr.item.filter(e => e.RPRSNTV_MENU.includes(FoodList[0][ret][45]));
    let test7 = foodData.data.getFoodKr.item.filter(e => e.RPRSNTV_MENU.includes(FoodList[0][ret][65]));
    let test8 = foodData.data.getFoodKr.item.filter(e => e.RPRSNTV_MENU.includes(FoodList[0][ret][88]));

    test = test.concat(test2);
    test = test.concat(test3);
    test = test.concat(test4);
    test = test.concat(test5);
    test = test.concat(test6);
    test = test.concat(test7);
    test = test.concat(test8);

    // test = new Set(test);
    // test = Array.from(test);
    console.log(test, 'test hi');
    console.log(FoodList[0][ret].length, 'test2 hi');
    const info = test.map(items => ({
        picture: items.MAIN_IMG_THUMB,
        title: items.MAIN_TITLE,
        addr: items.ADDR1,
        tel: items.CNTCT_TEL,
        time: items.USAGE_DAY_WEEK_AND_TIME,
        menu: items.RPRSNTV_MENU,
        detail: items.ITEMCNTNTS,
    }));

    const newPositions = test.map(item => ({
        title: item.MAIN_TITLE,
        latlng: {lat: item.LAT, lng: item.LNG},
    }));

    console.log(newPositions, 'newPositions');
    console.log(info, 'info');

    return (
        <div className="h-screen">
            <div className="w-4/6 m-auto mt-14">
                <p className="mb-10 text-5xl font-bold font-gb ">Today Place</p>
            </div>
            <div>
                <Map
                    className="rounded-lg shadow-lg shadow-blue-500/50"
                    center={{lat: 35.1795543, lng: 129.0756416}}
                    style={{width: '1000px', height: '450px'}}
                    level={8}
                >
                    {newPositions.map((position, index) => (
                        <MapMarker
                            key={`${position.title}-${position.latlng}`}
                            position={position.latlng}
                            image={{
                                src: `${process.env.PUBLIC_URL}/ci.png`,
                                size: {width: 35, height: 45},
                            }}
                            title={position.title}
                            onClick={() => handleMarkerClick(position)}
                        />
                    ))}
                </Map>
            </div>

            {activeMarker !== null && <FoodContents info={info} marker={activeMarker} positions={newPositions} />}

            {/* {activeMarker && <FoodContent1 info={info[positions.indexOf(activeMarker)]} />} */}
        </div>
    );
};
export default FoodMap;
