import React from 'react';

const FoodContents = ({info, marker, positions}) => {
    console.log(positions, 'positions');
    console.log(info[positions.indexOf(marker)], 'info');
    const infoItems = info.filter(e => (e.title === marker.title ? true : false));
    console.log(infoItems, 'info');
    return (
        <div className="flex justify-center w-4/6 m-auto mt-10 mb-14 ">
            <div className="w-3/4 h-auto mx-20 bg-white border rounded-lg border-slate-200">
                <div className="flex">
                    <div>
                        <img className="w-64 h-40 mt-3 ml-3 rounded-lg" src={infoItems[0].picture} alt="infoPicture" />
                    </div>
                    <div className="flex">
                        <div className="mt-3 ml-4">
                            <div className="mt-3 mb-3 ">
                                <p className="text-2xl font-semibold text-slate-500">{infoItems[0].title}</p>
                            </div>
                            <p className="mb-2 font-mono text-lg">Address : {infoItems[0].addr}</p>
                            <p className="mb-2 font-mono text-lg">Tel : {infoItems[0].tel}</p>
                        </div>
                    </div>
                </div>
                <div className="mt-3 ml-4">
                    <p className="mb-2 font-mono text-lg">Time : {infoItems[0].time}</p>
                    <p className="mb-2 font-mono text-lg">Menu : {infoItems[0].menu}</p>
                    <p className="mb-2 font-mono text-lg">Detail : {infoItems[0].detail}</p>
                </div>
            </div>
        </div>
    );
};

export default FoodContents;
