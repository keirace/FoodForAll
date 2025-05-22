import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from './users-slice';
import { volunteerSlice } from "./volunteers-slice";
import { foodBanksSlice } from './foodBanks-slice'

export const store = configureStore({
    // combine reducers from all the slices
    reducer: {
        [volunteerSlice.name]: volunteerSlice.reducer,
        [foodBanksSlice.name]: foodBanksSlice.reducer,
        [userSlice.name]: userSlice.reducer,
    }
})

export type AppStore = typeof store;
export type AppState = ReturnType<typeof store.getState>; // store.getState = function
export type AppDispatch = typeof store.dispatch;

