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
    },
    updateUser :(state, action)=>{
      state.value = action.payload
    } 
    
  },
});

// Action creators are generated for each case reducer function
export const {addUser, delUser,updateUser} = userSlice.actions;

export default userSlice.reducer;
