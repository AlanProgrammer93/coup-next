import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    action: null,
};

export const actionSlice = createSlice({
    name: "action",
    initialState,
    reducers: {
        updateAction(state, action) {
            console.log("lo que se guarda en actinoSlice: ", action.payload);
            state.action = action.payload;
        },
    },
});

export const { updateAction } = actionSlice.actions;

export default actionSlice.reducer;
