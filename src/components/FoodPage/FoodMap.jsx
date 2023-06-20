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
    const clickRef = useRef();
    let temp = new Date();
    let hour = temp.getHours();
    let year = temp.getFullYear();
    let month = temp.getMonth() + 1 < 10 ? '0' + (temp.getMonth() + 1) : temp.getMonth() + 1;
    let date = temp.getDate();

    const weatherData = useFetchWeatherQuery({
        x,
        y,
        numOfRows: 253,
        baseDate,
        baseTime: baseTime + '00',
    });

    const foodData = useFetchFoodQuery();

    console.log(weatherData.data, 'data');
    console.log(foodData.data, 'foodData');

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

    const weather = weatherData.data.response.body.items.item;

    let fwth = weather.filter(e => {
        if (e.fcstTime === baseTime + '00' && (e.category === 'PTY' || e.category === 'SKY')) return true;
        return false;
    });

    console.log(fwth, 'fwth');
    let ret = CheckWeather(fwth, '', 2);
    console.log(ret, 'ret');

    let test = foodData.data.getFoodKr.item.filter(e => e.RPRSNTV_MENU.includes(FoodList[0][ret][0]));
    let test2 = foodData.data.getFoodKr.item.filter(e => e.RPRSNTV_MENU.includes(FoodList[0][ret][1]));
    let test3 = foodData.data.getFoodKr.item.filter(e => e.RPRSNTV_MENU.includes(FoodList[0][ret][2]));
    test = test.concat(test2);
    test = test.concat(test3);

    const info = test.map(items => ({
        picture: items.MAIN_IMG_THUMB,
        title: items.MAIN_TITLE,
        addr: items.ADDR1,
        tel: items.CNTCT_TEL,
        time: items.USAGE_DAY_WEEK_AND_TIME,
        menu: items.RPRSNTV_MENU,
        detail: items.ITEMCNTNTS,
    }));
    console.log(test2, 'test2');
    console.log(test3, 'test3');
    console.log(test, 'test');

    const newPositions = test.map(item => ({
        title: item.MAIN_TITLE,
        latlng: {lat: item.LAT, lng: item.LNG},
    }));

    console.log(newPositions, 'newPositions');
    console.log(info, 'info');

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
                    {newPositions.map((position, index) => (
                        <MapMarker
                            key={`${position.title}-${position.latlng}`}
                            position={position.latlng}
                            image={{
                                src: `${process.env.PUBLIC_URL}/ci.png`,
                                size: {width: 35, height: 45},
                            }}
                            ref={clickRef}
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

// const FoodContent1 = ({info}) => {
//     return (
//         <div className="flex justify-center w-4/6 m-auto mt-10 mb-14">
//             <div className="w-3/4 mx-20 border rounded-lg h-96 border-slate-200">
//                 <div className="flex">
//                     <div>
//                         <img className="w-64 h-40 mt-3 ml-3 rounded-lg" src={info.picture} />
//                     </div>
//                     <div className="flex">
//                         <div className="mt-3 ml-4">
//                             <div className="mt-3 mb-3 ">
//                                 <p className="text-2xl font-semibold text-slate-500">{info.title}</p>
//                             </div>
//                             <p className="mb-2 font-mono text-lg">Address : {info.addr}</p>
//                             <p className="mb-2 font-mono text-lg">Tel : {info.tel}</p>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="mt-3 ml-4">
//                     <p className="mb-2 font-mono text-lg">Time : {info.time}</p>
//                     <p className="mb-2 font-mono text-lg">Menu : {info.menu}</p>
//                     <p className="mb-2 font-mono text-lg">Detail : {info.detail}</p>
//                 </div>
//             </div>
//         </div>
//     );
// };

export default FoodMap;
