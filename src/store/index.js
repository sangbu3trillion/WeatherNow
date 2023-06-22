import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/dist/query';
import {weatherApi} from './apis/fetchWeather';
import {foodApi} from './apis/fetchFood';

export const store = configureStore({
    reducer: {
        [weatherApi.reducerPath]: weatherApi.reducer,
        [foodApi.reducerPath]: foodApi.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(weatherApi.middleware).concat(foodApi.middleware),
});

setupListeners(store.dispatch);

export {useFetchWeatherQuery} from './apis/fetchWeather';
export {useFetchFoodQuery} from './apis/fetchFood';
