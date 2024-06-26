import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
}

export const changeStateSlice = createSlice({
  name: 'change',
  initialState,
  reducers: {
    changeEtat: (state) => {
     
      state.value = !state.value
    }
  },
})

// Action creators are generated for each case reducer function
export const { changeEtat } = changeStateSlice.actions

export default changeStateSlice.reducer