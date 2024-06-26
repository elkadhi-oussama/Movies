import { configureStore } from "@reduxjs/toolkit";
import changeStateSlice from "./Slice/changeStateSlice";
export const store = configureStore({
  reducer: {
    change: changeStateSlice,
  },
});
