// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import FilterInfo from '../../types/FilterInfo';

// interface FilterState {
//   filterInfo: FilterInfo;
// }

// const defaultFilters: FilterInfo = {
//   pickupLocation: '',
//   dropoffLocation: '',
//   pickupDateTime: '',
//   dropoffDateTime: '',
//   category: '',
//   gearBoxType: '',
//   engineType: '',
//   minPrice: 54,
//   maxPrice: 400,
// };

// const initialState: FilterState = {
//   filterInfo: defaultFilters,
// };

// const filterSlice = createSlice({
//   name: 'filters',
//   initialState,
//   reducers: {
//     setFilter: (
//       state,
//       action: PayloadAction<FilterInfo>
//     ) => {
//     state.filterInfo = action.payload
//       // localStorage.setItem('filterInfo', JSON.stringify(state.filterInfo));
//     },
//     setAllFilters: (state, action: PayloadAction<FilterInfo>) => {
//       state.filterInfo = action.payload;
//       // localStorage.setItem('filterInfo', JSON.stringify(state.filterInfo));
//     },
//     resetFilters: (state) => {
//       state.filterInfo = defaultFilters;
//       // localStorage.setItem('filterInfo', JSON.stringify(defaultFilters));
//     },
//   },
// });

// export const { setFilter, setAllFilters, resetFilters } = filterSlice.actions;
// export default filterSlice.reducer;



import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import FilterInfo from '../../types/FilterInfo';

interface FilterState {
  filterInfo: FilterInfo;
}

const defaultFilters: FilterInfo = {
  pickupLocation: '',
  dropoffLocation: '',
  pickupDateTime: '',
  dropoffDateTime: '',
  category: '',
  gearBoxType: '',
  engineType: '',
  minPrice: 54,
  maxPrice: 400,
};

const initialState: FilterState = {
  filterInfo: defaultFilters,
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<Partial<FilterInfo>>) => {
      state.filterInfo = {
        ...state.filterInfo,
        ...action.payload,
      };
      // localStorage.setItem('filterInfo', JSON.stringify(state.filterInfo));
    },
    setAllFilters: (state, action: PayloadAction<FilterInfo>) => {
      state.filterInfo = action.payload;
      // localStorage.setItem('filterInfo', JSON.stringify(state.filterInfo));
    },
    resetFilters: (state) => {
      state.filterInfo = defaultFilters;
      // localStorage.setItem('filterInfo', JSON.stringify(defaultFilters));
    },
  },
});

export const { setFilter, setAllFilters, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;
