import React from 'react';

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
        <div className="shadow-lg w-5/6 m-auto  h-auto p-16">
            {/* sidebar navigation */}
            <div id="sidebar-section">
                <div className="flex gap-5 w-44 ml-2">
                    <button onClick={logoBtnClickHandler} className="text-3xl mb-5 font-bold font-gb">
                        웨더나우
                    </button>
                </div>
                <div
                    id="sidebar"
                    className=" left-36 mt bg-gray-200 w-20 rounded-xl drop-shadow-xl opacity-60 hover:w-72 duration-200 ml-3 "
                >
                    <nav role="navigation" className="pl-4 pt-8 mt-4 mb-4 ">
                        <div className="mt-5 mb-5 relative overflow-hidden">
                            <ul className="nav-list space-y-8 mb-14" id="nav-list">
                                <li className="nav-item text-xl active p-2 rounded-l-xl flex gap-5 mb-7 cursor-pointer text-white hover:text-gray-400 ">
                                    <button
                                        onClick={sideBtnClickHandler}
                                        name={WEATHER_i}
                                        className="fas fa-sun fa-2x"
                                    ></button>
                                    <button
                                        onClick={sideBtnClickHandler}
                                        name={WEATHER_p}
                                        className="text-2xl font-bold font-gb"
                                    >
                                        weather
                                    </button>
                                </li>
                                <li className="nav-item text-xl p-2 rounded-l-xl flex gap-5 my-7 cursor-pointer text-white hover:text-gray-400">
                                    <button
                                        onClick={sideBtnClickHandler}
                                        name={STYLE_i}
                                        className="fas fa-user fa-2x"
                                    ></button>
                                    <button
                                        onClick={sideBtnClickHandler}
                                        name={STYLE_p}
                                        className="text-2xl font-bold font-gb"
                                    >
                                        style
                                    </button>
                                </li>
                                <li className="nav-item text-xl p-2 rounded-l-xl flex gap-5 my-7 cursor-pointer text-white hover:text-gray-400">
                                    <button
                                        onClick={sideBtnClickHandler}
                                        name={MUSIC_i}
                                        className="fas fa-headphones fa-2x"
                                    ></button>
                                    <button
                                        onClick={sideBtnClickHandler}
                                        name={MUSIC_p}
                                        className="text-2xl font-bold font-gb"
                                    >
                                        music
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>

            {/* main content */}
            <div id="content" className="md:ml-24"></div>
        </div>
    );
}
