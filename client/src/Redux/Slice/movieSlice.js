import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value : []
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    getMovies : (state, action)=>{
        state.value = action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const {getMovies} = movieSlice.actions;

export default movieSlice.reducer;
