import { configureStore } from "@reduxjs/toolkit";
import changeStateSlice from "./Slice/changeStateSlice";
import movieSlice from "./Slice/movieSlice";
import userSlice from "./Slice/userSlice";
import manipulationSlice from "./Slice/manipulationSlice";

export const store = configureStore({
  reducer: {
    change: changeStateSlice,
    movie: movieSlice,
    user: userSlice,
    manipulation: manipulationSlice,
  },
});
