import React, {useEffect} from 'react';

const KakaoMap = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.async = true;
        script.src = '//dapi.kakao.com/v2/maps/sdk.js?appkey=0093d0befbe41bcf45157c1da208e9f2';
        document.head.appendChild(script);

        script.onload = () => {
            const container = document.getElementById('map');
            const options = {
                center: new window.kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
                level: 3,
            };
            const map = new window.kakao.maps.Map(container, options);
        };
    }, []);

    return (
        <div>
            <div id="map" style={{width: '500px', height: '400px'}}></div>
        </div>
    );
};

export default KakaoMap;
