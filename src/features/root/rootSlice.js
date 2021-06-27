import { createSlice } from '@reduxjs/toolkit';

export function getDirectory(root, path) {
  const levels = path.split('/').filter(_ => _);
  let dir = root;
  for (let level of levels)
    dir = dir['folders'][level];
  return dir;
}
const initialState = {
  name: 'root',
  size: null,
  creator: null,
  date: null,
  files: {
    "index.html": {
      name: 'index.html',
      size: '542kb',
      creator: 'Ankur',
      date: new Date().toLocaleDateString()
    },
    "index.js": {
      name: 'index.js',
      size: '1024kb',
      creator: 'Anurag',
      date: new Date().toLocaleDateString()
    }
  },
  folders: {
    "docs": {
      name: 'docs',
      size: '542kb',
      creator: 'Ankur',
      date: new Date().toLocaleDateString(),
      files: {
        "c.pdf": {
          name: "c.pdf",
          size: '542kb',
          creator: 'Ankur',
          date: new Date().toLocaleDateString()
        },
        "d.docx": {
          name: "d.docx",
          size: '1024kb',
          creator: 'Anurag',
          date: new Date().toLocaleDateString()
        }
      },
      folders: {
        "work": {
          name: 'work',
          size: '542kb',
          creator: 'Ankur',
          date: new Date().toLocaleDateString(),
          files: {
            "e.pdf": {
              name: "d.docx",
              size: '1024kb',
              creator: 'Anurag',
              date: new Date().toLocaleDateString()
            },
            "f.ts": {
              name: "d.docx",
              size: '1024kb',
              creator: 'Anurag',
              date: new Date().toLocaleDateString()
            }
          },
          folders: {}
        }
      }
    }
  }
};


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
          location,
          name,
          size,
          creator,
          date,
        }
      else
        dir['folders'][name] = {
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
