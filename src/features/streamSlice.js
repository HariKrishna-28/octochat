import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  streamId: null,
  streamName: null,
};

export const streamSlice = createSlice({
  name: "stream",
  initialState,
  reducers: {
    setStreamInfo: (state, action) => {
      state.streamId = action.payload.streamId;
      state.streamName = action.payload.streamName;
    },
  },
});

export const { setStreamInfo } = streamSlice.actions;

export const selectStreamId = (state) => state.stream.streamId;
export const selectStreamName = (state) => state.stream.streamName;

export default streamSlice.reducer;
