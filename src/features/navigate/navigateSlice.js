import { createSlice } from "@reduxjs/toolkit";

const navigateSlice = createSlice({
    initialState: {
        location: '/'
    },
    name: 'navigate',
    reducers: {
        goto: (state, action) => {
            state.location = action.payload.location;
        }
    }
});
const { reducer } = navigateSlice;
export default reducer;
export const { goto } = navigateSlice.actions;
export const getLocation = state => state.navigate.location;