import React, {useEffect} from 'react';
import {Map, MapMarker} from 'react-kakao-maps-sdk';

export default KakaoMap;
{
    <Map center={{lat: x, lng: y}} style={{width: '200px', height: '200px'}} level={3} className="rounded-lg shadow-xl">
        <MapMarker position={{lat: x, lng: y}} infoWindowOptions={{disableAutoPan: true}}></MapMarker>
    </Map>;
}

<Map center={{lat: 33.5563, lng: 126.79581}} style={{width: '100%', height: '360px'}}>
    <MapMarker position={{lat: 33.55635, lng: 126.795841}}>
        <div style={{padding: '42px', backgroundColor: '#fff', color: '#000'}}>Custom Overlay!</div>
    </MapMarker>
</Map>;
