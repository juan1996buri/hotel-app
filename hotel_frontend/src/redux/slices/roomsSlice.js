import { createSlice } from "@reduxjs/toolkit";

const roomsSlice = createSlice({
  name: "rooms",
  initialState: {
    roomList: [],
  },
  reducers: {
    setRoomList: (state, action) => {
      state.roomList = action.payload;
    },
    setOneRoom: (state, action) => {
      state.roomList = [action.payload, ...state.roomList];
    },
    setOneDeleteRoom: (state, action) => {
      state.roomList = state.roomList.filter(
        (item) => item.id !== action.payload.id,
      );
    },
    setOneUpdateRoom: (state, action) => {
      const currentPosition = state.roomList.findIndex(
        (item) => item.id === action.payload.id,
      );
      state.roomList[currentPosition] = action.payload;
    },
  },
});
export const { setOneDeleteRoom, setOneUpdateRoom, setOneRoom, setRoomList } =
  roomsSlice.actions;
export default roomsSlice.reducer;
