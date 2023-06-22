import {dfs_xy_conv} from './XYtranselate';

const XYposition = () => {
    function success(pos) {
        const x = pos.coords.latitude;
        const y = pos.coords.longitude;
        const rs = dfs_xy_conv('toXY', x, y);
        const newX = rs.x;
        const newY = rs.y;
        console.log(newX, newY, 'XYposition');
        handlePosition(newX, newY); // 값 처리를 위한 함수 호출
    }

    function error(err) {
        console.log(err);
    }

    function handlePosition(x, y) {
        // 여기서 값을 처리하거나 다른 함수에 전달할 수 있습니다.
        console.log(x, y, 'XYposition');
    }

    navigator.geolocation.getCurrentPosition(success, error);
};

export default XYposition;
