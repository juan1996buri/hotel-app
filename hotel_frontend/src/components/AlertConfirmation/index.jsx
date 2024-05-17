/* eslint-disable react-refresh/only-export-components */
import { Dialog, DialogActions, DialogContent } from "@mui/material";
import React from "react";
import Button from "../Button";
export const TypeStatusAlert = {
  EDIT: "edit",
  CREATE: "create",
  DELETE: "delete",
  FINISH: "finish",
};
const AlertConfirmation = ({ status, open, setOpen, handleAction }) => {
  let title = "Esta seguro de que quiere eliminar este item";
  if (status === TypeStatusAlert.CREATE) {
    title = "Esta seguro de crear este item";
  }
  if (status === TypeStatusAlert.EDIT) {
    title = "Esta seguro de editar este item";
  }
  if (status === TypeStatusAlert.FINISH) {
    title = "Esta seguro de concluir con la acción";
  }
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent className="flex flex-col gap-y-3 ">
        <h2 className="text-center font-bold py-5 text-lg">{title} </h2>
      </DialogContent>
      <DialogActions>
        <Button
          secondaryColor={true}
          handleAction={() => setOpen(false)}
          title={"Cancelar"}
        />
        <Button handleAction={handleAction} title={"Continuar"} />
      </DialogActions>
    </Dialog>
  );
};

export default AlertConfirmation;
