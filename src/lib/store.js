import { combineSlices, configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './features/api/apiSlice';
const rootReducer = combineSlices(apiSlice);

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(apiSlice.middleware);
    }
  });
};

 