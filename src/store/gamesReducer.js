import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    games: [],
};

export const gamesSlice = createSlice({
    name: "games",
    initialState,
    reducers: {
        updateGames(state, action) {
            console.log("Set Games ", action.payload);
            state.games = action.payload;
        },
    },
});

export const { updateGames } = gamesSlice.actions;

export default gamesSlice.reducer;
