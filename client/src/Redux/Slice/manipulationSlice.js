import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value : []
};

export const manipulationSlice = createSlice({
  name: "manipulation",
  initialState,
  reducers: {
    addErrors : (state, action)=>{
        state.value = action.payload
    },
    delErrors : (state)=>{
        state.value = []
    },
  },
});

// Action creators are generated for each case reducer function
export const {addErrors,delErrors} = manipulationSlice.actions;

export default manipulationSlice.reducer;
