import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { VolunteerOpportunity } from "../models/Volunteer";
import { AppState } from ".";
import { searchOpportunities } from "../services/volunteerOpportunity-service";

export type VolunteerState = {
	firstName: string;
	lastName: string;
	email: string;
	zip_code: string;
	volunteerId: string | null;
	volunteerOpportunities: VolunteerOpportunity[];
	status: "idle" | "loading" | "succeeded" | "failed";
	error: string | null;
}

const initialState: VolunteerState = {
	firstName: "",
	lastName: "",
	email: "",
	zip_code: "",
	volunteerId: null,
	volunteerOpportunities: [],
	status: "idle",
	error: null,
};

export const searchVolunteerOpportunities = createAsyncThunk("volunteer/searchVolunteerOpportunities", async (zipCode: string, thunkAPI) => {
	try {
		const opportunities = await searchOpportunities(zipCode);
		return opportunities;
	} catch (error) {
		return thunkAPI.rejectWithValue(error);
	}
});

export const volunteerSlice = createSlice({
	name: "volunteer",
	initialState,
	reducers: {
		saveForm: (state : VolunteerState, action: PayloadAction<{ firstName: string; lastName: string; email: string; zip_code: string }>) => {
			const { firstName, lastName, email, zip_code } = action.payload;
			state.firstName = firstName;
			state.lastName = lastName;
			state.email = email;
			state.zip_code = zip_code;
		},
		signUpVolunteer: (state : VolunteerState, action: PayloadAction<{ opportunityId: string; }>) => {
			const { opportunityId } = action.payload;
			state.volunteerId = opportunityId;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(searchVolunteerOpportunities.pending, (state) => {
			state.status = "loading";
			state.error = null;
		});
		builder.addCase(searchVolunteerOpportunities.fulfilled, (state, action) => {
			state.status = "succeeded";
			state.volunteerOpportunities = action.payload;
		});
		builder.addCase(searchVolunteerOpportunities.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.payload as string;
		});
	},
});

// Action creators are generated for each case reducer function
export const { saveForm, signUpVolunteer } = volunteerSlice.actions;

// Selectors
export const getVolunteer = (): ((state: AppState) => VolunteerState) => {
	return (state: AppState) => state.volunteer;
};

export const getVolunteerOpportunities = (): ((state: AppState) => VolunteerOpportunity[]) => {
	return (state: AppState) => state.volunteer.volunteerOpportunities;
};

export const getStatus = (): ((state: AppState) => string) => {
	return (state: AppState) => state.volunteer.status;
};

export const getVolunteerId = (): ((state: AppState) => string | null) => {
	return (state: AppState) => state.volunteer.volunteerId;
};

// Reducers - for updating
export default volunteerSlice.reducer;
