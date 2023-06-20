import {useState} from 'react';
import axios from 'axios';
import './css/search.css';
import {useFetchFoodQuery, useFetchWeatherQuery} from '../../store';
import {useEffect} from 'react';
import BasetimeCalc from '../Utils/BasetimeCalc';
import {CheckWeather} from '../Utils/CheckWeather';

export default function MusicSearchForm({token, onSearch}) {
    const [searchKey, setSearchKey] = useState('');
    const [searchPerformed, setSearchPerformed] = useState(false);
    const [baseDate, setBaseDate] = useState(null);
    const [baseTime, setBasetime] = useState(null);
    const [x, setX] = useState(null);
    const [y, setY] = useState(null);
    let temp = new Date();
    let hour = temp.getHours();
    let year = temp.getFullYear();
    let month = temp.getMonth() + 1 < 10 ? '0' + (temp.getMonth() + 1) : temp.getMonth() + 1;
    let date = temp.getDate();
    let weather;
    const foodData = useFetchFoodQuery();
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
    const searchMusic = async e => {
        e.preventDefault();
        try {
            const {data} = await axios.get('https://api.spotify.com/v1/search', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    q: ret,
                    type: 'track',
                },
            });

            onSearch(data.tracks.items);
            setSearchPerformed(true); // Set the searchPerformed state to true
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        init();
        // fetchUsers();
    }, []);

    const weatherData = useFetchWeatherQuery({
        x,
        y,
        numOfRows: 253,
        baseDate,
    });

    if (searchPerformed) {
        return null;
    }
    if (
        weatherData.isFetching ||
        foodData.isFetching ||
        baseTime === null ||
        baseDate === null ||
        x === null ||
        y === null
    ) {
        return <div>로딩중입니다</div>;
    } else if (weatherData.error || foodData.error) {
        return <div>에러가 발생했습니다</div>;
    } else if (!weatherData.data || !foodData.data) {
        return null;
    }
    weather = weatherData.data.response.body.items.item;
    let fwth = weather.filter(e => {
        if (e.fcstTime === baseTime + '00' && (e.category === 'PTY' || e.category === 'SKY')) return true;
        return false;
    });

    console.log(fwth, 'fwth');
    let ret = CheckWeather(fwth, '', 2);
    console.log(ret, 'ret');
    if (ret === 'cloud') ret += ' 구름 흐림';
    else if (ret === 'rain') ret += ' 비 흐림';
    else if (ret === 'snow') ret += ' 눈 흐림';
    else if (ret === 'sun') ret += ' 맑음 피크닉';
    return (
        <div className="start-screen">
            <ul>
                <li>
                    <h1>오늘 날씨에 맞는 노래를 추천해드릴게요</h1>
                </li>
                <li>
                    <form onSubmit={searchMusic} className="mt-6">
                        <input type="text" onChange={e => setSearchKey(e.target.value)} />
                        <button className="p-4 bg-sky-200 rounded-2xl" type={'submit'}>
                            Search
                        </button>
                    </form>
                </li>
            </ul>
        </div>
    );
}
