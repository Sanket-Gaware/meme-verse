import { configureStore } from "@reduxjs/toolkit";
import memeReducer from "./memeSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  //persis configuration
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, memeReducer); //wrapping memereducr with perist reducer

const store = configureStore({
  reducer: {
    meme: persistedReducer, //using persisted reducer instead of memereducer like normal redux store
  }, 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializability check for redux-persist
    }),
});

export const persister = persistStore(store); //creating persister

export default store;
