import { configureStore } from "@reduxjs/toolkit";
import memeReducer from "./memeSlice";

const store = configureStore({
  reducer: {
    meme: memeReducer,
  },
});

export default store;
