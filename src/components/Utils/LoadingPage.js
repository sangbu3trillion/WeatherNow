import React, {useState, useEffect} from 'react';
import Loading from './Loading';

export default function LoadingPage() {
    const [loading, setLoading] = useState(true);

    const mainApi = async () => {
        setLoading(true); // api 호출 전에 true로 변경하여 로딩화면 띄우기
        try {
            const response = await fetch(`api url`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(),
            });

            const result = await response.json();
            console.log('mainData', result);
            setLoading(false); // api 호출 완료 됐을 때 false로 변경하려 로딩화면 숨김처리
        } catch (error) {
            window.alert(error);
        }
    };

    useEffect(() => {
        mainApi();
    }, []);

    return <div>{loading ? <Loading /> : null}</div>;
}
