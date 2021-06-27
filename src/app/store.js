import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../features/root/rootSlice';
import navigateReducer from '../features/navigate/navigateSlice';

export const store = configureStore({
  reducer: {
    root: rootReducer,
    navigate: navigateReducer
  },
});
