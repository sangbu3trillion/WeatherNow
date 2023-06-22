import React, {useEffect, useState} from 'react';
import {Map, MapMarker} from 'react-kakao-maps-sdk';
import {dfs_xy_conv} from '../Utils/XYtranselate';

function KakaoMap() {
    const [x, setX] = useState(null);
    const [y, setY] = useState(null);

    function init() {
        function success(pos) {
            const x = pos.coords.latitude;
            const y = pos.coords.longitude;

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
    }, []);

    return (
        <div>
            {x && y && (
                <Map
                    center={{lat: x, lng: y}}
                    style={{width: '300px', height: '292px'}}
                    level={3}
                    className="rounded-lg shadow-xl" //bodr radius
                >
                    <MapMarker position={{lat: x, lng: y}} infoWindowOptions={{disableAutoPan: true}}></MapMarker>
                </Map>
            )}
        </div>
    );
}

export default KakaoMap;
