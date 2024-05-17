import { useState, useEffect } from "react";
import Button from "../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import {
  setOneDeleteUser,
  setOneUpdateUser,
  setOneUser,
  setUserList,
} from "../../../redux/slices/usersSlice";
import AlertConfirmation, {
  TypeStatusAlert,
} from "../../../components/AlertConfirmation";
import ModalFormUser from "./ModalFormUser";
import {
  createOneUser,
  deleteOneUser,
  findAllUsers,
  updateOneUser,
} from "../../../services/userService";
import { useSnackbar } from "notistack";
const UserPage = () => {
  const dispath = useDispatch();
  const { userList } = useSelector((state) => state.users);
  const [openModalForm, setOpenModalForm] = useState(false);
  const [openModalAlert, setOpenModalAlert] = useState(false);
  const [statusAlert, setStatusAlert] = useState(TypeStatusAlert.CREATE);

  const [edit, setEdit] = useState(false);
  const [userData, setUserData] = useState({
    id: null,
    username: "",
    idCard: "",
  });
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const findAllUserServer = async () => {
      try {
        const response = await findAllUsers();
        if (response?.status === 200) {
          if (response.data.statusCode == 200) {
            dispath(setUserList(response.data.data));
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
    <section>
      <AlertConfirmation
        handleAction={async () => {
          try {
            if (statusAlert === TypeStatusAlert.DELETE) {
              const response = await deleteOneUser(userData?.id);
              if (response.status === 200) {
                if (response.data.statusCode === 200) {
                  dispath(setOneDeleteUser(userData));
                  enqueueSnackbar(`${response.data.message}`, {
                    variant: "success",
                  });
                } else if (response.data.statusCode == 404) {
                  enqueueSnackbar(`${response.data.message}`, {
                    variant: "warning",
                  });
                } else {
                  enqueueSnackbar(`${response.data.message}`, {
                    variant: "error",
                  });
                }
              } else {
                throw Error();
              }
            } else {
              if (edit) {
                const response = await updateOneUser(userData);
                if (response.status === 200) {
                  if (response.data.statusCode === 200) {
                    dispath(setOneUpdateUser(userData));
                    enqueueSnackbar(`${response.data.message}`, {
                      variant: "success",
                    });
                  } else if (response.data.statusCode == 404) {
                    enqueueSnackbar(`${response.data.message}`, {
                      variant: "warning",
                    });
                  } else {
                    enqueueSnackbar(`${response.data.message}`, {
                      variant: "error",
                    });
                  }
                } else {
                  throw Error();
                }
              } else {
                const response = await createOneUser(userData);
                if (response.status === 201) {
                  if (response.data.statusCode == 200) {
                    dispath(setOneUser(response.data.data));
                    enqueueSnackbar(`${response.data.message}`, {
                      variant: "success",
                    });
                  } else {
                    enqueueSnackbar(`${response.data?.message}`, {
                      variant: "error",
                    });
                  }
                } else {
                  throw Error();
                }
              }
            }
          } catch (error) {
            enqueueSnackbar("Se ha producido un error en el servidor", {
              variant: "error",
            });
          }

          setOpenModalForm(false);
          setOpenModalAlert(false);
        }}
        open={openModalAlert}
        setOpen={setOpenModalAlert}
        status={statusAlert}
      />
      <ModalFormUser
        edit={edit}
        handleSave={() => {
          setOpenModalAlert(true);
        }}
        open={openModalForm}
        setOpen={setOpenModalForm}
        setUserData={setUserData}
        userData={userData}
      />
      <Button
        handleAction={() => {
          setOpenModalForm(true);
          setEdit(false);
          setUserData({});
          setStatusAlert(TypeStatusAlert.CREATE);
        }}
        title={"Agregar"}
      />
      <div className=" bg-white rounded-lg p-2 ">
        <div className="flex  text-lg gap-x-1 p-2 text-[#B5B7C0] font-semibold">
          <div className="w-[20%]">Id</div>
          <div className="w-[30%]">Usuario</div>
          <div className="w-[30%]">IdCard</div>
          <div className="w-[30%]">Opciones</div>
        </div>
        <table className="mt-3 text-lg gap-x-1 text-[#292D32] font-normal w-full">
          <tbody>
            {userList.map((item, index) => {
              return (
                <tr
                  key={index}
                  className="flex border-b-[2px] border-[#EEEEEE] px-2 py-4"
                >
                  <td className="w-[20%]">{item.id}</td>
                  <td className="w-[30%]">{item.username}</td>
                  <td className="w-[30%]">{item.idCard}</td>
                  <td className="flex flex-row gap-5 w-[30%]">
                    <button
                      onClick={() => {
                        setOpenModalAlert(true);
                        setStatusAlert(TypeStatusAlert.DELETE);
                        setUserData(item);
                      }}
                    >
                      <DeleteIcon color="error" />
                    </button>
                    <button
                      onClick={() => {
                        setOpenModalForm(true);
                        setUserData(item);
                        setEdit(true);
                        setStatusAlert(TypeStatusAlert.EDIT);
                      }}
                    >
                      <EditIcon color="info" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default UserPage;
