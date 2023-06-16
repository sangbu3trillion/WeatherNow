import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import XYposition from '../../components/Utils/XYposition';
import {dfs_xy_conv} from '../../components/Utils/XYtranselate';

const weatherApi = createApi({
    reducerPath: 'weather',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000',
    }),
    endpoints(builder) {
        return {
            fetchWeather: builder.query({
                query: weather => {
                    return {
                        url: 'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst',
                        params: {
                            serviceKey: weather.serviceKey,
                            numOfRows: 700,
                            pageNo: 1,
                            base_date: weather.baseDate,
                            base_time: weather.baseTime,
                            nx: dfs_xy_conv('toXY', weather.x, weather.y).x,
                            ny: dfs_xy_conv('toXY', weather.x, weather.y).y,
                            dataType: 'JSON',
                        },
                        method: 'GET',
                    };
                },
            }),
        };
    },
});

export const {useFetchWeatherQuery} = weatherApi;

export {weatherApi};
