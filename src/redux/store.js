import cartReducer from "./cartReducer";
import { configureStore } from "@reduxjs/toolkit";
const stripe = require("stripe")(
  "sk_test_51LWR1rCTlhsOX9GfCB4fYnE6KiCYzURl433H95l0QW21R9EZen3AEyrBosVa9WuqgD2Ve3SNK0gg2IG3e5kIswd800q4CnVHSX"
);
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, cartReducer);

export const store = configureStore({
  reducer: {
    cart: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
