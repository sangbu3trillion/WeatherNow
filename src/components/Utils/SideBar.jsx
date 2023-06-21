import React from 'react';

import {Link} from 'react-router-dom';

const WEATHER_i = '1';
const WEATHER_p = '2';
const STYLE_i = '3';
const STYLE_p = '4';
const MUSIC_i = '5';
const MUSIC_p = '6';

export default function SideBar() {
    //Handler START
    const logoBtnClickHandler = () => {
        console.log('[SideBar] logoBtnClickHandler() CALLED!! ');
    };

    const sideBtnClickHandler = e => {
        console.log('[SideBar] sideBtnClickHandler() CALLED!!');
        switch (e.target.name) {
            case WEATHER_i:
            case WEATHER_p:
                console.log('[SideBar] WEATHER CLICKED!!');
                break;
            case STYLE_i:
            case STYLE_p:
                console.log('[SideBar] STYLE CLICKED!!');
                break;
            case MUSIC_i:
            case MUSIC_p:
                console.log('[SideBar] MUSIC CLICKED!!');
                break;
            default:
                break;
        }
        return sideBtnClickHandler;
    };
    //Handler END

    return (
        <div className="mr-8">
            {/* sidebar navigation */}
            <div id="sidebar-section">
                <div className="flex gap-5 ml-2 w-44 ">
                    <button
                        onClick={logoBtnClickHandler}
                        className="mb-5 text-[37px] font-bold font-suit leading-[0.1em]"
                    >
                        <Link to="/">
                            {' '}
                            <span className="leading text-neutral-600">weather</span>
                            <br />
                            <span className="text-7xl text-neutral-700">now</span>
                        </Link>
                    </button>
                </div>
                <div
                    id="sidebar"
                    className="w-20 ml-2 duration-200 bg-stone-500 left-36 mt-10 rounded-xl drop-shadow-xl opacity-60 hover:w-56"
                >
                    <nav role="navigation" className="pt-8 pl-4 mt-4 mb-4 ">
                        <div className="relative mt-5 mb-5 overflow-hidden">
                            <ul className="space-y-10 nav-list mb-14" id="nav-list">
                                <li className="flex gap-5 p-2 text-xl text-white cursor-pointer nav-item active rounded-l-xl mb-7 hover:text-white/70 ">
                                    <Link to="/">
                                        <button
                                            onClick={sideBtnClickHandler}
                                            name={WEATHER_i}
                                            className="fas fa-sun fa-2x"
                                        ></button>
                                    </Link>
                                    <button
                                        onClick={sideBtnClickHandler}
                                        name={WEATHER_p}
                                        className="text-2xl font-bold font-suit"
                                    >
                                        <Link to="/"> weather</Link>
                                    </button>
                                </li>
                                <li className="flex gap-5 p-2 text-xl text-white cursor-pointer nav-item rounded-l-xl my-7 hover:text-white/70">
                                    <Link to="/food">
                                        <button
                                            onClick={sideBtnClickHandler}
                                            name={STYLE_i}
                                            className="fas fa-spoon fa-2x"
                                        ></button>
                                    </Link>

                                    <button
                                        onClick={sideBtnClickHandler}
                                        name={STYLE_p}
                                        className="text-2xl font-bold font-suit"
                                    >
                                        <Link to="/food"> food</Link>
                                    </button>
                                </li>
                                <li className="flex gap-5 p-2 text-xl text-white cursor-pointer nav-item rounded-l-xl my-7 hover:text-white/70">
                                    <Link to="/music">
                                        <button
                                            onClick={sideBtnClickHandler}
                                            name={MUSIC_i}
                                            className="fas fa-headphones fa-2x"
                                        ></button>
                                    </Link>
                                    <button
                                        onClick={sideBtnClickHandler}
                                        name={MUSIC_p}
                                        className="text-2xl font-bold font-suit"
                                    >
                                        <Link to="/music"> music</Link>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
}
