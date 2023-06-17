import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const addWeather = createAsyncThunk('weather/addWeather', async (rs, baseDate_vilage, baseTime_vilage) => {
    const res = await axios.get('/1360000/VilageFcstInfoService_2.0/getVilageFcst', {
        params: {
            serviceKey: 'c0ThfABkN/fAsmZROXef62eRVKB+yqalaUdIY9JGtNTDm+NqMwt52rHbVMAJIbe3DoZQN/mA/siPgjowhnGSnA==',
            numOfRows: 500,
            pageNo: 1,
            base_date: baseDate_vilage,
            base_time: baseTime_vilage + '00',
            nx: Math.floor(rs.x),
            ny: Math.floor(rs.y),
            dataType: 'JSON',
        },
    });
});

export {addWeather};
