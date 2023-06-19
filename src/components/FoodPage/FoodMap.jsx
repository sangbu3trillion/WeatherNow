import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Map, MapMarker} from 'react-kakao-maps-sdk';

import {useFetchWeatherQuery} from '../../store';
import BasetimeCalc from '../Utils/BasetimeCalc';
import {CheckWeather} from '../Utils/CheckWeather';
import {FoodList} from '../Utils/FoodList';
console.log(FoodList, 'FoodList');

const FoodMap = () => {
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(false);

    const [positions, setPositions] = useState([]);
    const [activeMarker, setActiveMarker] = useState(null);
    const [info, setInfo] = useState(null);
    const [x, setX] = useState(null);
    const [y, setY] = useState(null);
    const [baseTime, setBasetime] = useState(null);
    const [baseDate, setBaseDate] = useState(null);
    let temp = new Date();
    let hour = temp.getHours();

    let year = temp.getFullYear();
    let month = temp.getMonth() + 1 < 10 ? '0' + (temp.getMonth() + 1) : temp.getMonth() + 1;
    let date = temp.getDate();

    const {data, isLoading, refetch, error} = useFetchWeatherQuery({
        x,
        y,
        numOfRows: 253,
        baseDate,
        baseTime: baseTime + '00',
    });

    console.log(data, 'data');

    function init() {
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
        navigator.geolocation.getCurrentPosition(success, error);
    }
    const fetchUsers = async () => {
        setUsers(null);
        setLoading(true);

        try {
            const response = await axios.get(
                'http://apis.data.go.kr/6260000/FoodService/getFoodKr?serviceKey=GSRcCYZGeievH8r6AdKyjzKx5dDFhx9Uyh9X9ieoqWEwe1alFjjcRtG5KiLxH7Ur313ypnBOPtpPD%2FR9m2hn0A%3D%3D&numOfRows=100&pageNo=1&resultType=json',
            );

            setUsers(response.data);

            let test = response.data.getFoodKr.item.filter(e => e.RPRSNTV_MENU.includes('수육'));
            let test2 = response.data.getFoodKr.item.filter(e => e.RPRSNTV_MENU.includes(FoodList[0][ret][1]));
            let test3 = response.data.getFoodKr.item.filter(e => e.RPRSNTV_MENU.includes(FoodList[0][ret][2]));
            console.log(test3, 'test3');
            test = test.concat(test2);
            test = test.concat(test3);
            console.log(test, 'test');
            const newPositions = test.map(item => ({
                title: item.MAIN_TITLE,
                latlng: {lat: item.LAT, lng: item.LNG},
            }));

            setPositions(newPositions);

            const foodList = test.map(items => ({
                picture: items.MAIN_IMG_THUMB,
                title: items.MAIN_TITLE,
                addr: items.ADDR1,
                tel: items.CNTCT_TEL,
                time: items.USAGE_DAY_WEEK_AND_TIME,
                menu: items.RPRSNTV_MENU,
                detail: items.ITEMCNTNTS,
            }));
            setInfo(foodList);
        } catch (e) {
            console.log(e);
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchUsers();
        init();
    }, []);

    const handleMarkerClick = position => {
        setActiveMarker(position);
    };

    if (loading || isLoading) {
        return <div>로딩중..</div>;
    }
    if (error) {
        return <div>에러가 발생했습니다</div>;
    }
    if (users === null || !data) {
        return null;
    }
    const weather = data.response.body.items.item;
    let fwth = weather.filter(e => {
        if (e.fcstTime === baseTime + '00' && (e.category === 'PTY' || e.category === 'SKY')) return true;
        return false;
    });

    console.log(fwth, 'fwth');
    let ret = CheckWeather(fwth, '', 2);
    console.log(ret, 'ret');

    return (
        <div>
            <div className="w-4/6 m-auto mt-14">
                <p className="mb-10 text-5xl font-bold font-gb ">Today Place</p>
            </div>
            <div className="flex justify-center">
                <Map
                    className="rounded-lg shadow-lg shadow-blue-500/50"
                    center={{lat: 35.1795543, lng: 129.0756416}}
                    style={{width: '1000px', height: '450px'}}
                    level={8}
                >
                    {positions.map((position, index) => (
                        <MapMarker
                            key={`${position.title}-${position.latlng}`}
                            position={position.latlng}
                            image={{
                                src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
                                size: {width: 24, height: 35},
                            }}
                            title={position.title}
                            onClick={() => handleMarkerClick(position)}
                        />
                    ))}
                </Map>
            </div>
            {activeMarker && <FoodContent1 info={info[positions.indexOf(activeMarker)]} />}
        </div>
    );
};

const FoodContent1 = ({info}) => {
    return (
        <div className="flex justify-center w-4/6 m-auto mt-10 mb-14">
            <div className="w-3/4 mx-20 border rounded-lg h-96 border-slate-200">
                <div className="flex">
                    <div>
                        <img className="w-64 h-40 mt-3 ml-3 rounded-lg" src={info.picture} />
                    </div>
                    <div className="flex">
                        <div className="mt-3 ml-4">
                            <div className="mt-3 mb-3 ">
                                <p className="text-2xl font-semibold text-slate-500">{info.title}</p>
                            </div>
                            <p className="mb-2 font-mono text-lg">Address : {info.addr}</p>
                            <p className="mb-2 font-mono text-lg">Tel : {info.tel}</p>
                        </div>
                    </div>
                </div>
                <div className="mt-3 ml-4">
                    <p className="mb-2 font-mono text-lg">Time : {info.time}</p>
                    <p className="mb-2 font-mono text-lg">Menu : {info.menu}</p>
                    <p className="mb-2 font-mono text-lg">Detail : {info.detail}</p>
                </div>
            </div>
        </div>
    );
};

export default FoodMap;
