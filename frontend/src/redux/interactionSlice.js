import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  interactions: [],
  loading: false,
  error: null,
};

const interactionSlice = createSlice({
  name: "interaction",
  initialState,

  reducers: {
    setInteractions: (state, action) => {
      state.interactions = action.payload;
    },

    addInteraction: (state, action) => {
      state.interactions.push(action.payload);
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setInteractions,
  addInteraction,
  setLoading,
  setError,
  clearError,
} = interactionSlice.actions;

export default interactionSlice.reducer;