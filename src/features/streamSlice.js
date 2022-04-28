import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  streamId: null,
  streamName: null,
  innerStreamId: null,
  ownerEmail: null,
};

export const streamSlice = createSlice({
  name: "stream",
  initialState,
  reducers: {
    setStreamInfo: (state, action) => {
      state.streamId = action.payload.streamId;
      state.streamName = action.payload.streamName;
      state.innerStreamId = action.payload.innerStreamId;
      state.ownerEmail = action.payload.ownerEmail;
    },
  },
});

export const { setStreamInfo } = streamSlice.actions;

export const selectStreamId = (state) => state.stream.streamId;
export const selectStreamName = (state) => state.stream.streamName;
export const selectInnerStreamId = (state) => state.stream.innerStreamId;
export const ownerEmail = (state) => state.stream.ownerEmail;

export default streamSlice.reducer;
