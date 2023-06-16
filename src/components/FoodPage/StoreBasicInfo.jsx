import React from 'react';

const StoreBasicInfo = ({info}) => {
    const title = info && info.length > 0 ? info[0].title : '';
    const addr = info && info.length > 0 ? info[0].addr : '';
    const tel = info && info.length > 0 ? info[0].tel : '';

    return (
        <div className="mt-3 ml-4">
            <div className="mt-3 mb-3 ">
                <p className="text-2xl font-semibold text-slate-500">{title}</p>
            </div>
            <p className="mb-2 text-lg">Address : {addr}</p>
            <p className="mb-2 text-lg">Tel : {tel}</p>
        </div>
    );
};

export default StoreBasicInfo;
