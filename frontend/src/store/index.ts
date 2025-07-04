import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import carSelectionReducer from './slices/carSelectionSlice';
import serviceLocationReducer from './slices/serviceLocationSlice';
import filterInfoReducer from './slices/filterSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    selectedCar: carSelectionReducer,
    serviceLocation: serviceLocationReducer,
    appliedFilterInfo: filterInfoReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
