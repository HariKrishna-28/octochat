import { configureStore } from "@reduxjs/toolkit";
import channelReducer from "../features/channelSlice";
import streamReducer from "../features/streamSlice";

export const store = configureStore({
  reducer: {
    channel: channelReducer,
    stream: streamReducer,
  },
});
