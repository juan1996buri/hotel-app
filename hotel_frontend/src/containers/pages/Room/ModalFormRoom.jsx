import {
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useState } from "react";
import InputText from "../../../components/InputText";
import Button from "../../../components/Button";
import { useSelector } from "react-redux";

const ModalFormRoom = ({
  open,
  setOpen,
  roomData,
  setRoomData,
  edit,
  handleSave,
  currentUser,
  setCurrentUser,
  handleFinish,
}) => {
  const { userList } = useSelector((state) => state.users);
  const [activeError, setActiveError] = useState(false);

  const onChangeRoomData = (e) => {
    const { value, name } = e.target;

    if (name === "roomNumber") {
      if (/^\d*$/.test(value)) {
        setRoomData((prevUserData) => ({
          ...prevUserData,
          [name]: value,
        }));
      }
    } else {
      setRoomData((prevUserData) => ({
        ...prevUserData,
        [name]: value,
      }));
    }
  };
  let disableEvent = false;
  if (!edit) {
    disableEvent = false;
  } else {
    disableEvent = roomData?.reservation !== null ? true : false;
  }

  const detailUserComponent = () => {
    if (!edit) {
      return;
    }
    return (
      <div className="flex flex-col gap-y-3">
        <h2 className="text-center font-bold py-5 text-lg">
          Habitacion Ocupada
        </h2>
        <InputText
          disable={true}
          value={roomData?.reservation?.createDate}
          name={"createDate"}
          placeholder={"dd/mm/yy"}
          title={"Fecha registro"}
          onChange={(e) => {
            onChangeRoomData(e);
          }}
        />
        <InputText
          disable={true}
          value={currentUser?.username}
          name={"Estado"}
          placeholder={"Estado"}
          title={"Userename"}
          onChange={(e) => {
            onChangeRoomData(e);
          }}
        />
        <InputText
          disable={true}
          value={currentUser?.idCard}
          name={"Estado"}
          placeholder={"Estado"}
          title={"Identificacón"}
          onChange={(e) => {
            onChangeRoomData(e);
          }}
        />
      </div>
    );
  };

  return (
    <Dialog
      open={open}
      onClose={() => {}}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent className="flex flex-col gap-y-3">
        <h2 className="text-center font-bold py-5 text-lg">
          {!edit ? "Agregar habitacion" : "Editar habitacion"}
        </h2>

        <InputText
          disable={false}
          value={roomData?.roomNumber || ""}
          name={"roomNumber"}
          placeholder={" Nº Habitación"}
          title={" Nº Habitación"}
          onChange={(e) => {
            onChangeRoomData(e);
          }}
          error={
            (activeError && roomData?.roomNumber === undefined) ||
            roomData?.roomNumber === ""
          }
        />

        {edit && (
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Usuario</InputLabel>
            <Select
              defaultValue={null}
              value={userList?.find((item) => item.id === currentUser?.id)}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
              onChange={(e) => {
                setCurrentUser({ ...e.target.value });
              }}
            >
              {userList?.map((item, index) => {
                return (
                  <MenuItem key={index} value={item}>
                    {item.idCard} - {item.username}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        )}

        {detailUserComponent()}

        {disableEvent && (
          <InputText
            disable={disableEvent}
            value={roomData?.status}
            name={"status"}
            placeholder={"Estado"}
            title={"Estado"}
            onChange={(e) => {
              onChangeRoomData(e);
            }}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button
          secondaryColor={true}
          handleAction={() => {
            setOpen(false);
            setActiveError(false);
          }}
          title={"Cancelar"}
        />
        <Button
          handleAction={() => {
            if (
              roomData?.roomNumber === undefined ||
              roomData?.roomNumber === ""
            ) {
              setActiveError(true);
            } else {
              handleSave();
            }
          }}
          title={"Guardar"}
          thirdColor={true}
        />

        {edit && roomData?.reservation?.user !== undefined && (
          <Button handleAction={handleFinish} title={"Finalizar"} />
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ModalFormRoom;
