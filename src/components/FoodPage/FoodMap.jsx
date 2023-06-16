import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Map, MapMarker} from 'react-kakao-maps-sdk';

const FoodMap = () => {
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [positions, setPositions] = useState([]);

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
        } catch (e) {
            setError(e);
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

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
        <div>
            <div>
                <p className="mb-10 font-gb font-bold text-5xl ">Today Place</p>
            </div>
            <div className="flex justify-center">
                <Map center={{lat: 35.1795543, lng: 129.0756416}} style={{width: '1000px', height: '450px'}} level={8}>
                    {positions.map((position, index) => (
                        <MapMarker
                            key={`${position.title}-${position.latlng}`}
                            position={position.latlng}
                            image={{
                                src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
                                size: {width: 24, height: 35},
                            }}
                            title={position.title}
                        />
                    ))}
                </Map>
            </div>
        </div>
    );
};

export default FoodMap;
