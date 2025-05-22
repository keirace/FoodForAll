import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { FoodBank } from "../models/Volunteer";
import * as service from "../services/api-service";
import { AppState } from ".";

/**
 * Represents the state of food banks in the application.
 * 
 * @type {FoodBank[]}
 */
export type FoodBanksState = FoodBank[];

/**
 * Initial state for the food banks slice.
 * 
 * @type {FoodBanksState}
 */
const initialState: FoodBanksState = [];

/**
 * Redux slice for managing food banks.
 */
export const foodBanksSlice = createSlice({
	name: "foodBanks",
	initialState,
	reducers: {
		/**
		 * Action creator to load food banks into the state.
		 * 
		 * @param {FoodBanksState} state - The current state.
		 * @param {PayloadAction<FoodBanksState>} action - The action containing food banks data.
		 * @returns {FoodBanksState} The updated state with loaded food banks data.
		 */
		loadMaps: (state: FoodBanksState, action: PayloadAction<FoodBanksState>) => {
			return [...action.payload];
		},
	},
});

/**
 * Exported action creators from the food banks slice.
 */
export const { loadMaps } = foodBanksSlice.actions;

/**
 * Selector function to get all food banks from the state.
 * 
 * @returns {Function} A function that returns all food banks from the state.
 */
export const getAll = (): ((state: AppState) => FoodBank[]) => {
	return (state: AppState) => state.foodBanks;
};

/**
 * Selector function to get food banks filtered by zip code from the state.
 * 
 * @param {string | undefined} zipCode - The zip code to filter food banks by.
 * @returns {Function} A function that returns filtered food banks by zip code from the state.
 */
export const getByZipCode = (zipCode: string | undefined): ((state: AppState) => FoodBank[] | undefined) => {
	return (state: AppState) => state.foodBanks.filter((fb) => fb.address.zip_code === zipCode);
};

/**
 * Default reducer function for the food banks slice.
 */
export default foodBanksSlice.reducer;
