import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ServiceLocationState {
  nameToId: Record<string, string>;
  idToName: Record<string, string>;
}

const initialState: ServiceLocationState = {
  nameToId: {},
  idToName: {},
};

const serviceLocationSlice = createSlice({
  name: 'serviceLocation',
  initialState,
  reducers: {
    setServiceLocationInfo: (
      state,
      action: PayloadAction<{ locationName: string; locationId: string }[]>
    ) => {
      const nameToId: Record<string, string> = {};
      const idToName: Record<string, string> = {};

      action.payload.forEach(({ locationName, locationId }) => {
        nameToId[locationName] = locationId;
        idToName[locationId] = locationName;
      });

      state.nameToId = nameToId;
      state.idToName = idToName;
    },
    clearServiceLocationInfo: (state) => {
      state.nameToId = {};
      state.idToName = {};
    },
  },
});

export const { setServiceLocationInfo, clearServiceLocationInfo } = serviceLocationSlice.actions;
export default serviceLocationSlice.reducer;