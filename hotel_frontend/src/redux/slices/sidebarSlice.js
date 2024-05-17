import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    screenSize: undefined,
    activeMenu: false,
  },
  reducers: {
    setScreenSize: (state, action) => {
      state.screenSize = action.payload;
    },
    setActiveMenu: (state, action) => {
      state.activeMenu = action.payload;
    },
  },
});

export const { setScreenSize, setActiveMenu } = sidebarSlice.actions;

export default sidebarSlice.reducer;
