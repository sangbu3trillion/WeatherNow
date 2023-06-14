import React, {useState, useEffect} from 'react';

let timeID;

const Clock = () => {
    console.log('clock() called!');

    let days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    const [year, setYear] = useState(0); //년
    const [month, setMonth] = useState(0); //월
    const [date, setDate] = useState(0); //일
    const [day, setDay] = useState(0); //일
    const [hour, setHour] = useState(0); //시
    const [minute, setMinute] = useState(0); //분

    useEffect(() => {
        setTimeout(setTime, 100);
        if (timeID === undefined) timeID = setInterval(setTime, 10000);
    }, []);

    const setTime = () => {
        console.log('setTime() CALLED!!');

        let today = new Date();

        setYear(today.getFullYear());
        //0부터 나오기 때문 +1 해주야함
        // 10보다 작으면 0 붙이기
        setMonth(today.getMonth() < 10 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1);
        setDate(() => (today.getDate() < 10 ? '0' + today.getDate() : today.getDate()));
        setDay(() => today.getDay());
        setHour(() => today.getHours());
        setMinute(today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes());
    };

    return (
        <>
            <div className="border-2 p-5 w-60 rounded-md">
                <div className="text-center">
                    <p className="font-gb font-bold">{`${month}/${date}/${days[day]}`} </p>
                </div>
                <div className="text-center">
                    <p className="font-gb">{`${
                        (hour < 12 ? 'A' : 'P') + 'M' + ' ' + (hour % 12 || 12)
                    } : ${minute}`}</p>
                </div>
            </div>
        </>
    );
};
export default Clock;
