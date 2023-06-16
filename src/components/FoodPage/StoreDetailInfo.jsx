import React from 'react';

const StoreDetailInfo = ({info}) => {
    const time = info && info.length > 0 ? info[0].time : '';
    const menu = info && info.length > 0 ? info[0].menu : '';
    const detail = info && info.length > 0 ? info[0].detail : '';

    return (
        <div className="mt-3 ml-4">
            <p className="mb-2 text-lg">Time : {time}</p>
            <p className="mb-2 text-lg">Menu : {menu}</p>
            <p className="mb-2 text-lg">Detail : {detail}</p>
        </div>
    );
};

export default StoreDetailInfo;
