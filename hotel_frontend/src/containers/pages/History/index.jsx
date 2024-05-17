import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { useSnackbar } from "notistack";
import { findAllReservation } from "../../../services/reservationService";

const HistoryPage = () => {
  const dispath = useDispatch();

  const { enqueueSnackbar } = useSnackbar();
  const [reservationList, setReservationList] = useState([]);

  useEffect(() => {
    const findAllReservationServer = async () => {
      try {
        const response = await findAllReservation();
        if (response?.status === 200) {
          if (response.data.statusCode == 200) {
            setReservationList(response.data.data);
          }
        }
      } catch (error) {
        enqueueSnackbar(`${error?.message}`, {
          variant: "error",
        });
      }
    };
    findAllReservationServer();
  }, [dispath, enqueueSnackbar]);

  return (
    <section>
      <div className=" bg-white rounded-lg p-2 ">
        <div className="flex  text-lg gap-x-1 p-2 text-[#B5B7C0] font-semibold">
          <div className="w-[10%]">Id</div>
          <div className="w-[20%]">Usuario</div>
          <div className="w-[20%]"># Habitacion</div>
          <div className="w-[30%]">Fecha inicio</div>
          <div className="w-[30%]">Fecha Fin</div>
        </div>
        <table className="mt-3 text-lg gap-x-1 text-[#292D32] font-normal w-full">
          <tbody>
            {reservationList?.map((item, index) => {
              return (
                <tr
                  key={index}
                  className="flex border-b-[2px] border-[#EEEEEE] px-2 py-4"
                >
                  <td className="w-[10%]">{item.id}</td>
                  <td className="w-[20%]">{item.user.username}</td>
                  <td className="w-[20%]">{item.room.roomNumber}</td>
                  <td className="w-[30%]">{item.createDate}</td>
                  <td className="w-[30%]">{item.endDate}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default HistoryPage;
