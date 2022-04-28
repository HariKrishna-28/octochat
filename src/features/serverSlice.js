import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  streamId: null,
  streamName: null,
};

export const serverSlice = createSlice({
  name: "server",
  initialState,
  reducers: {
    setServerInfo: (state, action) => {
      state.serverId = action.payload.serverId;
      state.serverName = action.payload.serverName;
    },
  },
});

export const { setServerInfo } = serverSlice.actions;

export const selectserverId = (state) => state.server.serverId;
export const selectserverName = (state) => state.server.serverName;

export default serverSlice.reducer;
