import axios from 'axios';
import React, {useEffect, useState} from 'react';

const FoodList = () => {
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // const [food, setFood] = useState([]);

    let test = [];

    const fetchUsers = async () => {
        console.log('fetchUsers CALLED!!');

        setError(null); //아직 오류 발생 안남
        setUsers(null); //데이터 아직 안 불러옴
        setLoading(true); //로딩 중

        const response = await axios
            .get(
                'http://apis.data.go.kr/6260000/FoodService/getFoodKr?serviceKey=GSRcCYZGeievH8r6AdKyjzKx5dDFhx9Uyh9X9ieoqWEwe1alFjjcRtG5KiLxH7Ur313ypnBOPtpPD%2FR9m2hn0A%3D%3D&numOfRows=100&pageNo=1&resultType=json',
            )
            .then(response => {
                // .then은 get으로 가져오면, 그 다음에 가져온 데이터로 다음과 같이 처리하라는 의미
                // 통신이 왔다 갔다 하면 성공으로 본다.(제대로 데이터를 못 받아도)
                console.log('success!!'); // 그래서 원래 데이터를 받는 검수과정이 들어 가야 한다.
                console.log('------', response.data);

                setUsers(response.data);
                response.data.getFoodKr.item.filter(e => (e.RPRSNTV_MENU.includes('수육') ? test.push(e) : ''));
                console.log('test', test);
            })
            .catch(e => {
                console.log('error!!'); // 통신 장애 발생시 출력하는 오류
                setError(e);
            });

        setLoading(false);
    };

    useEffect(() => {
        console.log('USE EFFECT!!');

        fetchUsers();
    }, []);

    if (loading) {
        console.log('-----> loading');
        return <div>로딩중..</div>;
    }
    if (error) {
        console.log('-----> error');
        return <div>에러가 발생했습니다</div>;
    }
    if (users === null) {
        console.log('-----> !users');
        return null;
    }

    return;
};

export default FoodList;
