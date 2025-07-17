import { combineSlices, configureStore } from '@reduxjs/toolkit'
const rootReducer = combineSlices();
export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
     middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat();
    }
  })
}