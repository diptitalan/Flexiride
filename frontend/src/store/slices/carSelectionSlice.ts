import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CarInfo {
  selectedCarId: string| number;
}

interface CarSelectedState {
  carInfo: CarInfo | null;
}

const initialState: CarSelectedState = {
  carInfo: null
};

const carSelectionSlice = createSlice({
  name: 'selectedCar',
  initialState,
  reducers: {
    setSelectedCar: (state, action: PayloadAction<CarInfo>) => {
      state.carInfo = action.payload;
    },
    clearSelectedCar: (state) => {
      state.carInfo = null;
    },
  },
});

export const { setSelectedCar, clearSelectedCar } = carSelectionSlice.actions;
export default carSelectionSlice.reducer;