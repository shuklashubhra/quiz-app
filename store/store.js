import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { rootReducer } from "./reducers";

// config the store
const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production' || process.env.PUBLIC_URL?.length > 0,
  });

export const wrapper = createWrapper(makeStore);
