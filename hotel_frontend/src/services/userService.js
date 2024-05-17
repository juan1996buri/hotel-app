import axios from "axios";

const apiServerUrl = import.meta.env.VITE_APP_APIURL;

export const findAllUsers = async () => {
  return await axios.get(`${apiServerUrl}/users`);
};
export const createOneUser = async (room) => {
  return await axios.post(`${apiServerUrl}/users`, room);
};
export const deleteOneUser = async (idUser) => {
  return await axios.delete(`${apiServerUrl}/users/${idUser}`);
};
export const updateOneUser = async (user) => {
  return await axios.put(`${apiServerUrl}/users/${user.id}`, user);
};
