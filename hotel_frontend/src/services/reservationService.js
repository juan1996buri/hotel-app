import axios from "axios";
const apiServerUrl = import.meta.env.VITE_APP_APIURL;

export const findAllReservation = async () => {
  return await axios.get(`${apiServerUrl}/reservation`);
};
export const createOneReservation = async (room) => {
  return await axios.post(`${apiServerUrl}/reservation`, room);
};
export const deleteOneReservation = async (idReservation) => {
  return await axios.delete(`${apiServerUrl}/reservation/${idReservation}`);
};
export const updateOneReservation = async (roomData) => {
  return await axios.put(
    `${apiServerUrl}/reservation/${roomData.id}`,
    roomData,
  );
};
