import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const foodApi = createApi({
    reducerPath: 'food',
    keepUnusedDataFor: 500,
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000',
    }),
    endpoints(builder) {
        return {
            fetchFood: builder.query({
                query: () => {
                    return {
                        url: 'http://apis.data.go.kr/6260000/FoodService/getFoodKr?serviceKey=GSRcCYZGeievH8r6AdKyjzKx5dDFhx9Uyh9X9ieoqWEwe1alFjjcRtG5KiLxH7Ur313ypnBOPtpPD%2FR9m2hn0A%3D%3D&numOfRows=100&pageNo=1&resultType=json',

                        method: 'GET',
                    };
                },
            }),
        };
    },
});

export const {useFetchFoodQuery} = foodApi;

export {foodApi};
