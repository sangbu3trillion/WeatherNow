import React from 'react';

const WEATHER = '1';
const STYLE = '2';
const MUSIC = '3';

export default function SideBar() {
    //Handler START
    const logoBtnClickHandler = () => {
        console.log('[SideBar] logoBtnClickHandler() CALLED!! ');
    };

    const sideBtnClickHandler = e => {
        console.log('[SideBar] sideBtnClickHandler() CALLED!!');
        switch (e.target.name) {
            case WEATHER:
                console.log('[SideBar] WEATHER CLICKED!!');
                break;
            case STYLE:
                console.log('[SideBar] STYLE CLICKED!!');
                break;
            case MUSIC:
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
                    <nav role="navigation" className="pl-4 pt-8 mt-4 ">
                        <div className="mt-4 relative overflow-hidden">
                            <ul className="nav-list space-y-8" id="nav-list">
                                <li className="nav-item text-xl active p-2 rounded-l-xl text-white hover:text-gray-400">
                                    <button
                                        onClick={sideBtnClickHandler}
                                        name={WEATHER}
                                        className="flex gap-5 mb-7 cursor-pointer"
                                    >
                                        <i className="fas fa-sun fa-2x"></i>
                                        <p className="text-2xl font-bold font-gb">weather</p>
                                    </button>
                                </li>
                                <li className="nav-item text-xl p-2 rounded-l-xl text-white hover:text-gray-400">
                                    <button
                                        onClick={sideBtnClickHandler}
                                        name={STYLE}
                                        className="flex gap-5 my-7 cursor-pointer"
                                    >
                                        <i className="fas fa-user fa-2x"></i>
                                        <p className="text-2xl font-bold font-gb">style</p>
                                    </button>
                                </li>
                                <li className="nav-item text-xl p-2 rounded-l-xl  text-white hover:text-gray-400">
                                    <button
                                        onClick={sideBtnClickHandler}
                                        name={MUSIC}
                                        className="flex gap-5 my-7 mb-20 cursor-pointer"
                                    >
                                        <i className="fas fa-headphones fa-2x"></i>
                                        <p className="text-2xl font-bold font-gb">music</p>
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
