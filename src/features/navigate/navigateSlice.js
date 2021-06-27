import { createSlice } from "@reduxjs/toolkit";

const navigateSlice = createSlice({
    initialState: {
        location: window.location.pathname
    },
    name: 'navigate',
    reducers: {
        goto: (state, action) => {
            const { payload } = action;
            const { location } = payload;
            state.location = location.replace(/\/+/g, '/');
            return state;
        }
    }
});
const { reducer } = navigateSlice;
export default reducer;
export const { goto } = navigateSlice.actions;
export const getLocation = state => state.navigate.location;
export const getLevels = state => {
    const location = getLocation(state);
    const levels = location.split('/');
    levels[0] = 'root';
    return levels.filter(_ => _);;
}