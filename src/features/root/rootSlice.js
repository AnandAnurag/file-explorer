import { createSlice } from '@reduxjs/toolkit';
import defaultJSON from './default.json';

let initialState;
if (!localStorage.getItem('/')) {
  localStorage.setItem('/', JSON.stringify(defaultJSON));
}
initialState = JSON.parse(localStorage.getItem('/'));


const rootSlice = createSlice({
  name: 'root',
  initialState,
  reducers: {
    add: (state, action) => {
      const { payload } = action;
      const { location, name, size, creator, date, type } = payload;
      const dir = getDirectory(state, location);
      if (type === 'file')
        dir['files'][name] = {
          type,
          location,
          name,
          size,
          creator,
          date,
        }
      else
        dir['folders'][name] = {
          type,
          location,
          name,
          size,
          creator,
          date,
          files: {},
          folders: {}
        }
      return state;
    },
    remove: (state, action) => {
      const { payload } = action;
      const { location, name, type } = payload;
      const dir = getDirectory(state, location);
      delete dir[`${type}s`][name];
      return state;
    }
  },
});

const { reducer } = rootSlice;
export default reducer;
export const { add, remove } = rootSlice.actions;
export function getDirectory(root, path) {
  const levels = path.split('/').filter(_ => _);
  let dir = root;
  for (let level of levels)
    dir = dir['folders'][level];
  return dir;
}