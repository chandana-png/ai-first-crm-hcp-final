import { createSlice } from "@reduxjs/toolkit";

const interactionSlice = createSlice({
  name: "interaction",
  initialState: {
    interactions: [],
    loading: false,
  },
  reducers: {
    setInteractions: (state, action) => {
      state.interactions = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setInteractions, setLoading } =
  interactionSlice.actions;

export default interactionSlice.reducer;