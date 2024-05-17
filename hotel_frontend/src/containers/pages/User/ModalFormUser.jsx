import { Dialog, DialogActions, DialogContent } from "@mui/material";
import React, { useState } from "react";
import InputText from "../../../components/InputText";
import Button from "../../../components/Button";

const ModalFormUser = ({
  open,
  setOpen,
  userData,
  setUserData,
  edit,
  handleSave,
}) => {
  const onChangeUserData = (e) => {
    const { value, name } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const [activeError, setActiveError] = useState(false);

  return (
    <Dialog
      open={open}
      onClose={() => {}}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent className="flex flex-col gap-y-3">
        <h2 className="text-center font-bold py-5 text-lg">
          {!edit ? "Agregar usuario" : "Editar Usuario"}
        </h2>
        <InputText
          value={userData.username}
          name={"username"}
          placeholder={"Usuario"}
          title={"Usuario"}
          onChange={(e) => {
            onChangeUserData(e);
          }}
          error={
            (activeError && userData?.username === undefined) ||
            userData?.username === ""
          }
        />
        <InputText
          value={userData.idCard}
          name={"idCard"}
          placeholder={"Identificación"}
          title={"Identificación"}
          onChange={(e) => {
            onChangeUserData(e);
          }}
          error={
            (activeError && userData?.idCard === undefined) ||
            userData?.idCard === ""
          }
        />
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
          typeButton="submit"
          handleAction={() => {
            if (
              userData?.idCard === undefined ||
              userData?.idCard === "" ||
              userData?.username === undefined ||
              userData?.username === ""
            ) {
              setActiveError(true);
            } else {
              handleSave();
            }
          }}
          title={edit ? "Editar" : "Agregar"}
        />
      </DialogActions>
    </Dialog>
  );
};

export default ModalFormUser;
