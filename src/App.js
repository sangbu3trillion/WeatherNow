import PlayList from './components/MusicPage/PlayList';
import SideBar from './components/Utils/SideBar';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import WeatherMain from './components/WeatherPage/WeatherMain';
import FoodMap from './components/FoodPage/FoodMap';
import BasetimeCalc from './components/Utils/BasetimeCalc';
import React, {useEffect, useState} from 'react';
import {useFetchWeatherQuery} from './store';
import {CheckWeather} from './components/Utils/CheckWeather';

function App() {
    const [x, setX] = useState(null);
    const [y, setY] = useState(null);
    const [baseTime, setBasetime] = useState(null);
    const [baseDate, setBaseDate] = useState(null);
    const [backgroundImage, setBackgroundImage] = useState('');

    let temp = new Date();
    let hour = temp.getHours();
    let year = temp.getFullYear();
    let month = temp.getMonth() + 1 < 10 ? '0' + (temp.getMonth() + 1) : temp.getMonth() + 1;
    let date = temp.getDate();

    const weatherData = useFetchWeatherQuery({
        // 날씨 데이터 가져오기
        x,
        y,
        numOfRows: 253, // 날씨 데이터 253개, 1시간에 6개, 새벽 3시부터 00시
        baseDate,
        baseTime: baseTime + '00',
    });

    function init() {
        // 위치 정보 가져오기, 위도 경도 가져오기
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
        navigator.geolocation.getCurrentPosition(success, error); // 사용자의 현재 위치
    }

    useEffect(() => {
        init();
        // fetchUsers();
    }, []);

    useEffect(() => {
        if (weatherData.data) {
            const weather = weatherData.data.response.body.items.item; // 날씨 데이터

            let fwth = weather.filter(e => {
                if (e.fcstTime === baseTime + '00' && (e.category === 'PTY' || e.category === 'SKY')) return true; // 강수형태(PTY), 하늘의 상태(SKY)
                return false;
            });

            let ret = CheckWeather(fwth, '', 2);
            console.log(ret, 'ret');

            // ret 값에 따라 배경 이미지 설정
            let backgroundImageUrl = '';

            switch (ret) {
                case 'A':
                    backgroundImageUrl = `${process.env.PUBLIC_URL}/rain.jpg`;
                    break;
                case 'B':
                    backgroundImageUrl = `${process.env.PUBLIC_URL}/snow.jpg`;
                    break;
                case 'C':
                    backgroundImageUrl = `${process.env.PUBLIC_URL}/sunny.blur.png`;
                    break;
                default:
                    backgroundImageUrl = `${process.env.PUBLIC_URL}/cloud.jpg`; // ret 값이 어떤 case에도 해당하지 않으면 기본 이미지 적용
            }

            setBackgroundImage(`url(${backgroundImageUrl})`);
        }
    }, [weatherData.data, baseTime]);

    if (weatherData.isFetching || baseTime === null || baseDate === null || x === null || y === null) {
        return <div>로딩중..</div>;
    }

    return (
        <div className="flex relative">
            <div
                className="absolute inset-0 bg-no-repeat opacity-25 z-[-1]"
                style={{
                    backgroundImage: `url(${process.env.PUBLIC_URL}/rain.jpg)`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'top',
                }}
            ></div>
            <BrowserRouter>
                <div className="w-1/6 h-auto mt-16 ml-24">
                    <SideBar />
                </div>
                <div className="w-5/6">
                    <div className="h-auto mr-32 p-16  max-w-7xl ">
                        <Routes>
                            <Route path="/" element={<WeatherMain />} />
                            <Route path="/food" element={<FoodMap />} />
                            <Route path="/music" element={<PlayList />} />
                        </Routes>
                    </div>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
