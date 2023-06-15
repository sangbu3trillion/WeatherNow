function BasetimeCalc(baseTime) {
    const timeArr = [2, 5, 8, 11, 14, 17, 20, 23];
    let flag = false;
    if (baseTime === 23) {
        baseTime = 23;
        return baseTime;
    }
    console.log(typeof baseTime);

    for (let i = 0; i < timeArr.length; i++) {
        console.log(baseTime, ':', timeArr[i]);

        if (i === timeArr.length - 1) {
            flag = true;
            if (baseTime * 1 < 10) {
                baseTime = '0' + timeArr[i];
            } else baseTime = timeArr[i];
        } //safe guard
        else if (timeArr[i] <= baseTime * 1 && timeArr[i + 1] > baseTime * 1) {
            if (timeArr[i] < 10) {
                baseTime = '0' + timeArr[i].toString();
            } else {
                console.log(baseTime);
                baseTime = timeArr[i];
            }
            break;
        }
    }
    return {baseTime, flag};
}

export default BasetimeCalc;
