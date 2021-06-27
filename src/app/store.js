import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../features/root/rootSlice';
import navigateReducer from '../features/navigate/navigateSlice';

export const store = configureStore({
  reducer: {
    root: rootReducer,
    navigate: navigateReducer
  },
});

store.subscribe(() => {
  const { location } = store.getState().navigate;
  if (location !== window.location.pathname) {
    window.history.replaceState({}, '', location);
  }
  localStorage.setItem('/', JSON.stringify(store.getState().root));
})