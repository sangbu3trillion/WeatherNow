import React, {useEffect, useState} from 'react';
import axios from 'axios';
import StorePicture from './StorePicture';
import StoreBasicInfo from './StoreBasicInfo';
import StoreDetailInfo from './StoreDetailInfo';

const FoodContent = () => {
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [info, setInfo] = useState(null);

    const fetchUsers = async props => {
        setError(null);
        setUsers(null);
        setLoading(true);
        console.log(props);
        try {
            const response = await axios.get(
                'http://apis.data.go.kr/6260000/FoodService/getFoodKr?serviceKey=GSRcCYZGeievH8r6AdKyjzKx5dDFhx9Uyh9X9ieoqWEwe1alFjjcRtG5KiLxH7Ur313ypnBOPtpPD%2FR9m2hn0A%3D%3D&numOfRows=100&pageNo=1&resultType=json',
            );
            setUsers(response.data);

            const weatherMenu = response.data.getFoodKr.item.filter(item => item.RPRSNTV_MENU.includes('수육'));
            const foodList = weatherMenu.map(item => ({
                title: item.MAIN_TITLE,
                addr: item.ADDR1,
                tel: item.CNTCT_TEL,
                time: item.USAGE_DAY_WEEK_AND_TIME,
                menu: item.RPRSNTV_MENU,
                detail: item.ITEMCNTNTS,
            }));
            console.log('foodList', foodList);
            setInfo(foodList);
        } catch (e) {
            setError(e);
            console.log(e);
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
        <div className=" flex justify-center my-5">
            <div className="mx-20 w-3/4 h-96 border rounded-lg border-slate-200">
                <div className="flex">
                    <StorePicture info={info} />
                    <StoreBasicInfo info={info} />
                </div>
                <StoreDetailInfo info={info} />
            </div>
        </div>
    );
};

export default FoodContent;
