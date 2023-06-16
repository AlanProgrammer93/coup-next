import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    game: null,
};

export const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        updateGame(state, action) {
            state.game = action.payload;
        },
    },
});

export const { updateGame } = gameSlice.actions;

export default gameSlice.reducer;
