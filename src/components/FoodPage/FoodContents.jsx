import React from 'react';
import FoodMap from './FoodMap';

const FoodContents = ({info}) => {
    return (
        <div className="w-4/6 m-auto mt-10 mb-14 flex justify-center">
            <div className="mx-20 w-3/4 h-96 border rounded-lg border-slate-200 bg-white relative">
                <div className="flex">
                    <div>
                        <img className="mt-3 ml-3 rounded-lg w-64 h-40" src={info.picture} />
                    </div>
                    <div className="flex">
                        <div className="mt-3 ml-4">
                            <div className="mt-3 mb-3 ">
                                <p className="text-2xl font-semibold text-slate-500">{info.title}</p>
                            </div>
                            <p className="mb-2 text-lg font-mono">Address : {info.addr}</p>
                            <p className="mb-2 text-lg font-mono">Tel : {info.tel}</p>
                        </div>
                    </div>
                </div>
                <div className="mt-3 ml-4">
                    <p className="mb-2 text-lg font-mono">Time : {info.time}</p>
                    <p className="mb-2 text-lg font-mono">Menu : {info.menu}</p>
                    <p className="mb-2 text-lg font-mono">Detail : {info.detail}</p>
                </div>
            </div>
        </div>
    );
};

export default FoodContents;
