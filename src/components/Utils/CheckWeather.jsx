export const CheckWeather = (weather, weatherTime) => {
    let skyValue;

    weather.map(e => {
        e.fcstTime === weatherTime && e.category === 'SKY' && (skyValue = e.fcstValue);
    });

    if (skyValue === '1') {
        console.log('sunny  ');
        return 'sunny';
    } else if (skyValue === '3') {
        console.log('cloudy');
        return 'cloudy_sun';
    }
};
