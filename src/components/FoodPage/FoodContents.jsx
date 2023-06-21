import React from 'react';

const FoodContents = ({info, marker, positions}) => {
    console.log(positions, 'positions');
    console.log(info[positions.indexOf(marker)], 'info');
    const infoItems = info.filter(e => (e.title === marker.title ? true : false));
    console.log(infoItems, 'info');
    return (
        <div className=" mt-10 mb-14 font-gb text-neutral-700">
            <div className="w-3/4 h-auto mx-20 rounded-lg  bg-zinc-100/90">
                <div className="flex">
                    <div>
                        <img className="w-64 h-40 mt-3 ml-3 rounded-lg" src={infoItems[0].picture} alt="infoPicture" />
                    </div>
                    <div className="flex">
                        <div className="mt-3 ml-4">
                            <div className="mt-3 mb-3 ">
                                <p className="text-2xl font-bold text-slate-500">{infoItems[0].title}</p>
                            </div>
                            <p className="mb-2 text-xl">
                                <span className="font-suit">Address : </span>
                                <span>{infoItems[0].addr}</span>
                            </p>
                            <p className="mb-2 text-xl">
                                <span className="font-suit">Tel : </span>
                                <span>{infoItems[0].tel}</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-3 ml-4 p-3">
                    <p className="mb-2 text-xl">
                        <span className="font-suit">Time : </span>
                        <span>{infoItems[0].time}</span>
                    </p>{' '}
                    <p className="mb-2 text-xl">
                        <span className="font-suit">Menu : </span>
                        <span>{infoItems[0].menu}</span>
                    </p>{' '}
                    <p className="mb-2 text-xl">
                        <span className="font-suit">Detail : </span>
                        <span>{infoItems[0].detail}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FoodContents;
