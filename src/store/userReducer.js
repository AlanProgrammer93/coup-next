import { createSlice } from "@reduxjs/toolkit";

let username = null
/* const token = localStorage.getItem('token') ? localStorage.getItem('token') : null
if (token) {
    currentUser(token)
        .then(res => {
            localStorage.setItem('token', res.data.token)
            username = res.data.username
        })
        .catch(err => console.log(err));
}   */

const initialState = {
    user: username,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateUser(state, action) {
            state.user = action.payload;
        },
    },
});

export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
