import React from 'react';

const Header = () => {
    return (
        <div>
            <img className="w-4/6 h-3/4" src={process.env.PUBLIC_URL + 'resource/rain.gif'} alt="header_rain" />
            <img className="w-4/6 h-3/4" src={process.env.PUBLIC_URL + 'resource/cloud.gif'} alt="header_cloud" />
            <img className="w-4/6 h-3/4" src={process.env.PUBLIC_URL + 'resource/snow.gif'} alt="header_snow" />
            <img className="w-4/6 h-3/4" src={process.env.PUBLIC_URL + 'resource/thunder.gif'} alt="header_thunder" />
            <img className="w-4/6 h-3/4" src={process.env.PUBLIC_URL + 'resource/sun.gif'} alt="header_sun" />
        </div>
    );
};

export default Header;
