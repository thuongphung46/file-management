import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const availableVersionsSlice = createSlice({
  name: "availableVersions",
  initialState,
  reducers: {
    setAvailableVersionData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setData } = dataSlice.actions;
export const { setAvailableVersionData } = availableVersionsSlice.actions;

const rootReducer = {
  data: dataSlice.reducer,
  availableVersions: availableVersionsSlice.reducer,
};

export default rootReducer;
