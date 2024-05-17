import axios from "axios";
const apiServerUrl = import.meta.env.VITE_APP_APIURL;

export const findAllRoom = async () => {
  return await axios.get(`${apiServerUrl}/rooms`);
};
export const createOneRoom = async (room) => {
  return await axios.post(`${apiServerUrl}/rooms`, room);
};
export const deleteOneRoom = async (idRoom) => {
  return await axios.delete(`${apiServerUrl}/rooms/${idRoom}`);
};
export const updateOneRoom = async (roomData) => {
  return await axios.put(`${apiServerUrl}/rooms/${roomData?.id}`, roomData);
};
export const finishRent = async (roomData) => {
  return await axios.put(
    `${apiServerUrl}/rooms/finish/${roomData?.id}`,
    roomData,
  );
};
