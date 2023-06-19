import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Map, MapMarker} from 'react-kakao-maps-sdk';
import FoodContents from './FoodContents';

const FoodMap = () => {
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [positions, setPositions] = useState([]);
    const [activeMarker, setActiveMarker] = useState(null);
    const [info, setInfo] = useState(null);

    const fetchUsers = async () => {
        setError(null);
        setUsers(null);
        setLoading(true);

        try {
            const response = await axios.get(
                'http://apis.data.go.kr/6260000/FoodService/getFoodKr?serviceKey=GSRcCYZGeievH8r6AdKyjzKx5dDFhx9Uyh9X9ieoqWEwe1alFjjcRtG5KiLxH7Ur313ypnBOPtpPD%2FR9m2hn0A%3D%3D&numOfRows=100&pageNo=1&resultType=json',
            );

            setUsers(response.data);
            const test = response.data.getFoodKr.item.filter(e => e.RPRSNTV_MENU.includes('수육'));
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
            setError(e);
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleMarkerClick = position => {
        setActiveMarker(position);
    };

    if (loading) {
        return <div>로딩중..</div>;
    }
    if (error) {
        return <div>에러가 발생했습니다</div>;
    }
    if (users === null) {
        return null;
    }

    return (
        <div className="relative">
            <div
                className="absolute inset-0 bg-no-repeat opacity-25"
                style={{
                    backgroundImage: `url(${process.env.PUBLIC_URL}/cloud.jpg)`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                }}
            />
            <div className="w-4/6 m-auto mt-14">
                <p className="mb-10 font-gb font-bold text-5xl ">Today Place</p>
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
            {activeMarker && <FoodContents info={info[positions.indexOf(activeMarker)]} />}
        </div>
    );
};

export default FoodMap;
