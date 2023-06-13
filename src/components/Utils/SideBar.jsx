import React from 'react';

export default function SideBar() {
    //Handler START
    //Handler END

    return (
        <div>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css" />
            <script src="https://kit.fontawesome.com/d88bda470b.js" crossorigin="anonymous"></script>
            <style>@import url('https://fonts.googleapis.com/css2?family=Gowun+Batang&display=swap');</style>
            {/* sidebar navigation */}
            <div id="sidebar-section" className="h-screen fixed bac mt-10">
                <p className="flex gap-5 m-10">
                    <p className="ml-14 w-44 cursor-pointer font-gb text-5xl">웨더나우</p>
                </p>
                <div
                    id="sidebar"
                    className="fixed screen left-36 mt bg-gray-200 w-20 rounded-xl drop-shadow-xl opacity-60 hover:w-72 duration-200"
                >
                    <nav role="navigation" className="pl-4 pt-8 mt-4 ">
                        <div className="mt-4 relative overflow-hidden">
                            <ul className="nav-list space-y-8" id="nav-list">
                                <li className="nav-item text-xl active p-2 rounded-l-xl text-white hover:text-gray-400">
                                    <p className="flex gap-5 mb-7 cursor-pointer">
                                        <i className="fas fa-sun fa-2x"></i>
                                        <p className="text-2xl font-bold font-gb">weather</p>
                                    </p>
                                </li>
                                <li className="nav-item text-xl p-2 rounded-l-xl text-white hover:text-gray-400">
                                    <p className="flex gap-5 my-7 cursor-pointer">
                                        <i className="fas fa-user fa-2x"></i>
                                        <p className="text-2xl font-bold font-gb">style</p>
                                    </p>
                                </li>
                                <li className="nav-item text-xl p-2 rounded-l-xl  text-white hover:text-gray-400">
                                    <p className="flex gap-5 my-7 mb-20 cursor-pointer">
                                        <i className="fas fa-headphones fa-2x"></i>
                                        <p className="text-2xl font-bold font-gb">music</p>
                                    </p>
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
