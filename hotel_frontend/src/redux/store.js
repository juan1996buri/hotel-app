import { configureStore } from "@reduxjs/toolkit";
import sidebarReduce from "./slices/sidebarSlice";
import usersReduce from "./slices/usersSlice";
import roomsReduce from "./slices/roomsSlice";
const store = configureStore({
  reducer: {
    sidebar: sidebarReduce,
    users: usersReduce,
    rooms: roomsReduce,
  },
});

export default store;
