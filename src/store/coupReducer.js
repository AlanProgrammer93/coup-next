import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    coup: null,
};

export const coupSlice = createSlice({
    name: "coup",
    initialState,
    reducers: {
        updateCoup(state, action) {
            state.coup = action.payload;
        },
    },
});

export const { updateCoup } = coupSlice.actions;

export default coupSlice.reducer;
