import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser : (state, action)=>{
      state.value = action.payload
    },
    delUser : (state)=>{
      state.value = {}
    }
    
  },
});

// Action creators are generated for each case reducer function
export const {addUser, delUser} = userSlice.actions;

export default userSlice.reducer;
