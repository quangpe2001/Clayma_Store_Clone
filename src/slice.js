import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hasLogged: false,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setLogged: (state, action) => {
      console.log(action.payload);
      state.hasLogged = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLogged } = counterSlice.actions;

export default counterSlice.reducer;
