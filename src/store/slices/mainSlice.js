// import {createSlice} from '@reduxjs/toolkit';
// import {addWeather} from '../thunks/addWeather';

// const weatherSlice = createSlice({
//     name: 'weather',
//     initialState: {
//         isLoading: false,
//         data: [],
//         error: null,
//     },
//     extraReducers(builder) {
//         builder.addCase(addWeather.pending, (state, action) => {
//             state.isLoading = true;
//         });

//         builder.addCase(addWeather.fulfilled, (state, action) => {
//             state.isLoading = false;
//             state.data = action.payload;
//         });

//         builder.addCase(addWeather.rejected, (state, action) => {
//             state.isLoading = false;
//             state.error = action.error;
//         });
//     },
// });

// export const weatherReducer = weatherSlice.reducer;
