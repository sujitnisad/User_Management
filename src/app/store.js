import { configureStore } from "@reduxjs/toolkit";
import userDetail from "../features/userDetailSlice.js";

export const store = configureStore({
  reducer: {
    app: userDetail,
  },
});
