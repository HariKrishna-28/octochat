import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: null,
  userImage: null,
  userEmail: null,
  userId: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userName = action.payload.userName;
      state.userImage = action.payload.userImage;
      state.userEmail = action.payload.userEmail;
      state.userId = action.payload.userId;
    },
  },
});

export const { setUserInfo } = userSlice.actions;

export const selectUserName = (state) => state.channel.selectUserName;
export const selectUserImage = (state) => state.channel.selectUserImage;
export const selectUserEmail = (state) => state.channel.selectUserEmail;
export const selectUserId = (state) => state.channel.selectUserId;

export default userSlice.reducer;
