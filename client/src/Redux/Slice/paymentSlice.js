import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value : {}
};

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    getPaymentDetails : (state, action)=>{
        state.value = action.payload
    },
    delPayment :(state)=>{
        state.value = {}
    }
  },
});

// Action creators are generated for each case reducer function
export const {getPaymentDetails,delPayment} = paymentSlice.actions;

export default paymentSlice.reducer;