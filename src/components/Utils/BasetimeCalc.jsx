import React from 'react';

function BasetimeCalc(baseTime) {
    const timeArr = [2, 5, 8, 11, 14, 17, 20, 23];

    for (let i = 0; i < timeArr.length - 1; i++) {
        if (i === timeArr.length - 1) baseTime = timeArr[i]; //safe guard
        else if (timeArr[i] <= baseTime * 1 && timeArr[i + 1] > baseTime * 1) {
            baseTime = timeArr[i];
            break;
        }
    }
    return baseTime;
}

export default BasetimeCalc;
