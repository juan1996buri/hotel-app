import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setActiveMenu } from "../../redux/slices/sidebarSlice";

// eslint-disable-next-line react-refresh/only-export-components
export const links = [
  {
    title: "Users",
    link: {
      name: "/",
      icon: "x",
    },
  },
  {
    title: "Habitaciones",
    link: {
      name: "/rooms",
      icon: "x",
    },
  },
  {
    title: "Historial",
    link: {
      name: "/history",
      icon: "x",
    },
  },
];

const Sidebar = () => {
  const { activeMenu, screenSize } = useSelector((state) => state.sidebar);
  const dispath = useDispatch();

  const handleCloseSidebar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      dispath(setActiveMenu(false));
    }
  };
  return (
    <div className="h-full  bg-white relative overflow-auto">
      <div className="pt-10">
        <div className="text-start mx-5 font-bold text-2xl">Hotel</div>
      </div>

      <div className=" flex flex-col gap-3 mx-2 mt-10 ">
        {links.map((item, index) => {
          return (
            <NavLink
              onClick={() => handleCloseSidebar()}
              to={`${item.link.name}`}
              key={index}
              className={({ isActive }) =>
                isActive
                  ? "  text-lg rounded-lg bg-[#5932EA] text-white"
                  : "  text-lg rounded-lg text-[#9197B3] "
              }
            >
              <div className="flex flex-row gap-x-2  rounded-md p-2 hover:bg-blue-600 hover:text-white font-semibold">
                <div>{item.link.icon}</div>
                <div>{item.title}</div>
              </div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
