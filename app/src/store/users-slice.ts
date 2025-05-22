import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppState } from ".";
import { User } from "../models/User";

export interface UserState {
	loading: boolean;
	user: User | null;
	error: string;
}

const initialState: UserState = {
	loading: false,
	user: null,
	error: "",
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		saveForm: (state : UserState, action: PayloadAction<{ user : User }>) => {
			const { user } = action.payload;
			state.user = user;
			console.log(state.user)
		},
		signupRequest(state: UserState) {
			state.loading = true;
			state.error = "";
		},
		signupSuccess(state: UserState, action: PayloadAction<User>) {
			state.loading = false;
			state.user = action.payload;
		},
		signupFailure(state: UserState, action: PayloadAction<string>) {
			state.loading = false;
			state.error = action.payload;
		},
		loginRequest(state: UserState) {
			state.loading = true;
			state.error = "";
		},
		loginSuccess(state: UserState, action: PayloadAction<User>) {
			state.loading = false;
			state.user = action.payload;
		},
		loginFailure(state: UserState, action: PayloadAction<string>) {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

// Actions
export const { saveForm, signupRequest, signupSuccess, signupFailure, loginRequest, loginSuccess, loginFailure } = userSlice.actions;

// Selectors
export const getUser = (): ((state: AppState) => UserState) => {
	return (state: AppState) => state.user;
};


export default userSlice.reducer;
