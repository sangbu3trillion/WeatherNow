import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/dist/query';
import {weatherApi} from './apis/fetchWeather';

export const store = configureStore({
    reducer: {
        [weatherApi.reducerPath]: weatherApi.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(weatherApi.middleware),
});

setupListeners(store.dispatch);

export {useFetchWeatherQuery} from './apis/fetchWeather';
