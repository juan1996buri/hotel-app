import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    userList: [],
  },
  reducers: {
    setUserList: (state, action) => {
      state.userList = action.payload;
    },
    setOneUser: (state, action) => {
      state.userList = [action.payload, ...state.userList];
    },
    setOneDeleteUser: (state, action) => {
      state.userList = state.userList.filter(
        (item) => item.id !== action.payload.id,
      );
    },
    setOneUpdateUser: (state, action) => {
      const currentPosition = state.userList.findIndex(
        (item) => item.id === action.payload.id,
      );
      state.userList[currentPosition] = action.payload;
    },
  },
});
export const { setOneDeleteUser, setOneUpdateUser, setOneUser, setUserList } =
  usersSlice.actions;
export default usersSlice.reducer;
