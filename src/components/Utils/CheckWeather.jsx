export const CheckWeather = (weather, weatherTime, flag, weatherDate) => {
    let skyValue;
    console.log(flag, 'flag');
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
    }

    if (flag === 1) {
        console.log(weatherTime, 'weatherTime');
        weather.map(e => {
            if (weatherTime === e.fcstTime && weatherDate === e.fcstDate) {
                if (e.category === 'PTY' && (e.fcstValue === '1' || e.fcstValue === '4' || e.fcstValue === '2')) {
                    console.log('rain');
                    return (skyValue = 'rain');
                }
                if (e.category === 'PTY' && e.fcstValue === '3') return (skyValue = 'snow');

                if (e.category === 'SKY' && e.fcstValue === '1') {
                    skyValue = 'sun';
                    console.log('sunny');
                }

                if ((e.category === 'SKY' && e.fcstValue === '3') || e.fcstValue === '4') skyValue = 'cloud';
            }
        });

        // weather.map(e => {
        //     if (e.fcstTime === weatherTime && e.category === 'SKY' && e.fcstValue === '1') {
        //         skyValue = 'sunny';
        //     }
        //     if (e.fcstTime === weatherTime && e.category === 'SKY' && e.fcstValue === '3') {
        //         skyValue = 'cloudy';
        //     }
        //     if (e.fcstTime === weatherTime && e.category === 'SKY' && e.fcstValue === '4') {
        //         skyValue = 'blur';
        //     }
        //     if (
        //         e.fcstTime === weatherTime &&
        //         e.category === 'PTY' &&
        //         (e.fcstValue === '1' || e.fcstValue === '2' || e.fcstValue === '5')
        //     ) {
        //         skyValue = 'rainny';
        //     }
        // });

        // console.log(skyValue, 'skyValue');
        // if (skyValue === '1') {
        //     console.log('sunny');
        //     skyValue = 'sunny';
        // }
        // if (skyValue === '3') {
        //     console.log('cloud');
        //     skyValue = 'cloudy';
        // }
        // if (skyValue === '4') {
        //     console.log('blur');
        //     skyValue = 'blur';
        // }
    }

    return skyValue;
};
