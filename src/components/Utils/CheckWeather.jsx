export const CheckWeather = (weather, weatherTime, flag) => {
    let skyValue;

    if (flag === 2) {
        weather.map(e => {
            if (e.category === 'PTY' && (e.fcstValue === '1' || e.fcstValue === '4' || e.fcstValue === '2'))
                return (skyValue = 'rain');

            if (e.category === 'PTY' && e.fcstValue === '3') return (skyValue = 'snow');

            if (e.category === 'SKY' && e.fcstValue === '1') {
                skyValue = 'sun';
                console.log('sunny');
            }

            if ((e.category === 'SKY' && e.fcstValue === '3') || e.fcstValue === '4') skyValue = 'cloud';
        });
        console.log(skyValue, 'skyValue');
        return skyValue;
    }

    if (flag === 1) {
        weather.map(e => {
            e.fcstTime === weatherTime && e.category === 'SKY' && (skyValue = e.fcstValue);
        });

        if (skyValue === '1') {
            console.log('sunny');
            return 'sunny';
        } else if (skyValue === '3') {
            console.log('cloudy');
            return 'cloudy_sun';
        }
    }
};
