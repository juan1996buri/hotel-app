import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import ModalFormRoom from "./ModalFormRoom";
import AlertConfirmation, {
  TypeStatusAlert,
} from "../../../components/AlertConfirmation";
import { useDispatch, useSelector } from "react-redux";
import {
  setOneDeleteRoom,
  setOneRoom,
  setOneUpdateRoom,
  setRoomList,
} from "../../../redux/slices/roomsSlice";
import {
  createOneRoom,
  deleteOneRoom,
  findAllRoom,
  finishRent,
  updateOneRoom,
} from "../../../services/roomService";
import { findAllUsers } from "../../../services/userService";
import { setUserList } from "../../../redux/slices/usersSlice";
import { useSnackbar } from "notistack";
import DeleteIcon from "@mui/icons-material/Delete";

const RoomPage = () => {
  const dispath = useDispatch();
  const { roomList } = useSelector((state) => state.rooms);
  const [openModalForm, setOpenModalForm] = useState(false);
  const [openModalAlert, setOpenModalAlert] = useState(false);
  const [statusAlert, setStatusAlert] = useState(TypeStatusAlert.CREATE);
  const [currentUser, setCurrentUser] = useState({
    id: "",
    username: "",
    idCard: "",
  });
  const [openModalFinish, setOpenModalFinish] = useState(false);

  const [edit, setEdit] = useState(false);
  const [roomData, setRoomData] = useState({
    id: "",
    roomNumber: "",
    status: "",
    reservation: null,
  });
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const findAll = async () => {
      try {
        const response = await findAllRoom();
        if (response?.status === 200) {
          if (response.data.statusCode == 200) {
            dispath(setRoomList(response.data.data));
          }
        }
      } catch (error) {
        enqueueSnackbar(`${error?.message}`, {
          variant: "error",
        });
      }
    };
    findAll();
  }, [dispath, enqueueSnackbar]);

  useEffect(() => {
    const findAllUserServer = async () => {
      try {
        const response = await findAllUsers();
        if (response?.status === 200) {
          if (response.data.statusCode == 200) {
            dispath(setUserList(response.data.data));
          } else {
            throw Error();
          }
        }
      } catch (error) {
        enqueueSnackbar(`${error?.message}`, {
          variant: "error",
        });
      }
    };
    findAllUserServer();
  }, [dispath, enqueueSnackbar]);
  return (
    <div>
      <AlertConfirmation
        open={openModalFinish}
        handleAction={async () => {
          try {
            const response = await finishRent({
              ...roomData,
              status: "DISPONIBLE",
              idReservation: roomData?.reservation?.id,
            });
            if (response.status === 200) {
              if (response.data.statusCode === 200) {
                dispath(
                  setOneUpdateRoom({
                    ...roomData,
                    status: "DISPONIBLE",
                    reservation: null,
                  }),
                );
                enqueueSnackbar(`${response?.data?.message}`, {
                  variant: "success",
                });
              } else if (response.data.statusCode === 404) {
                enqueueSnackbar(`${response?.data?.message}`, {
                  variant: "warning",
                });
              }
            }
            setOpenModalFinish(false);
            setOpenModalForm(false);
          } catch (error) {
            setOpenModalFinish(false);
            enqueueSnackbar(`${error?.message}`, {
              variant: "error",
            });
          }
        }}
        setOpen={setOpenModalFinish}
        status={TypeStatusAlert.FINISH}
      />
      <AlertConfirmation
        handleAction={async () => {
          try {
            if (statusAlert === TypeStatusAlert.DELETE) {
              const response = await deleteOneRoom(roomData.id);
              if (response.status === 200) {
                if (response.data.statusCode == 200) {
                  dispath(setOneDeleteRoom(roomData));
                  enqueueSnackbar(`${response?.data?.message}`, {
                    variant: "success",
                  });
                } else if (response.data.statusCode === 404) {
                  enqueueSnackbar(`${response?.data?.message}`, {
                    variant: "warning",
                  });
                } else {
                  enqueueSnackbar(`${response?.data?.message}`, {
                    variant: "error",
                  });
                }
              }
            } else {
              if (edit) {
                if (roomData?.reservation === null) {
                  const response = await updateOneRoom({
                    roomNumber: roomData?.roomNumber,
                    status: currentUser?.id === "" ? "DISPONIBLE" : "OCUPADO",
                    idUser: currentUser?.id,
                    idRoom: roomData?.id,
                    id: roomData?.id,
                  });

                  if (response.status === 200) {
                    if (response.data.statusCode === 200) {
                      dispath(
                        setOneUpdateRoom({
                          ...roomData,
                          status:
                            currentUser?.id === "" ? "DISPONIBLE" : "OCUPADO",
                          reservation: {
                            ...response?.data?.data,
                            user: { ...currentUser },
                          },
                        }),
                      );
                    }
                  }

                  enqueueSnackbar(`${response?.data?.message}`, {
                    variant: "success",
                  });
                } else {
                  const response = await updateOneRoom({
                    roomNumber: roomData.roomNumber,
                    status: roomData.status,
                    idUser: currentUser.id,
                    idRoom: roomData.id,
                    id: roomData.id,
                    idReservation: roomData.reservation.id,
                  });

                  if (response.status === 200) {
                    if (response.data.statusCode === 200) {
                      dispath(
                        setOneUpdateRoom({
                          ...roomData,
                          reservation: {
                            ...roomData.reservation,
                            user: { ...currentUser },
                          },
                        }),
                      );
                      enqueueSnackbar(`${response?.data?.message}`, {
                        variant: "success",
                      });
                    }
                  }
                }
              } else {
                const response = await createOneRoom({
                  ...roomData,
                  status: "DISPONIBLE",
                });

                if (response.status === 201) {
                  if (response.data.statusCode === 200) {
                    dispath(
                      setOneRoom({
                        ...roomData,
                        id: response.data.data.id,
                        status: "DISPONIBLE",
                      }),
                    );
                    enqueueSnackbar(`${response?.data?.message}`, {
                      variant: "success",
                    });
                  } else if (response.data.statusCode === 404) {
                    enqueueSnackbar(`${response?.data?.message}`, {
                      variant: "warning",
                    });
                  } else {
                    enqueueSnackbar(`${response?.data?.message}`, {
                      variant: "error",
                    });
                  }
                }
              }
            }

            setOpenModalForm(false);
            setOpenModalAlert(false);
          } catch (error) {
            enqueueSnackbar(`${error?.message}`, {
              variant: "error",
            });
          }
        }}
        open={openModalAlert}
        setOpen={setOpenModalAlert}
        status={statusAlert}
      />
      <ModalFormRoom
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        edit={edit}
        handleSave={() => {
          setOpenModalAlert(true);
        }}
        open={openModalForm}
        roomData={roomData}
        setOpen={setOpenModalForm}
        setRoomData={setRoomData}
        handleFinish={() => {
          setStatusAlert(TypeStatusAlert.FINISH);
          setOpenModalFinish(true);
        }}
      />
      <dialog open={true}>
        <div className=""></div>
      </dialog>

      <Button
        handleAction={() => {
          setOpenModalForm(true);
          setEdit(false);
          setRoomData({ reservation: null });
          setStatusAlert(TypeStatusAlert.CREATE);
        }}
        title={"Agregar"}
      />

      <ul className="grid grid-cols-3 gap-4">
        {roomList?.map((item, index) => {
          let bgColorCard = "bg-green-300";
          if (item.status === "DISPONIBLE") {
            bgColorCard = "bg-[#EEEEEE]";
          }
          return (
            <li
              onClick={() => {
                if (item?.reservation?.user === undefined) {
                  setCurrentUser({
                    id: "",
                    username: "",
                    idCard: "",
                  });
                } else {
                  setCurrentUser(item?.reservation?.user);
                }
                setRoomData(item);
                setEdit(true);
                setOpenModalForm(true);
                setStatusAlert(TypeStatusAlert.EDIT);
                setCurrentUser(item.reservation.user);
              }}
              key={index}
              className={`h-24 border-b-[2px]  flex flex-col items-center justify-center ${bgColorCard}  relative z-10 cursor-pointer`}
            >
              <div
                className="absolute top-0 right-0 z-[9999] bg-white rounded-full p-1 "
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenModalAlert(true);
                  setRoomData(item);
                  setStatusAlert(TypeStatusAlert.DELETE);
                }}
              >
                <DeleteIcon color="warning" />
              </div>
              <div> Nº {item.roomNumber}</div>
              <div> {item.status}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RoomPage;
