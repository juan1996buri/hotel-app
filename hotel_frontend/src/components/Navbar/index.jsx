import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveMenu, setScreenSize } from "../../redux/slices/sidebarSlice";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const { activeMenu, screenSize } = useSelector((state) => state.sidebar);
  const dispath = useDispatch();
  useEffect(() => {
    const handleResize = () => dispath(setScreenSize(window.innerWidth));

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [dispath]);

  useEffect(() => {
    if (screenSize <= 900) {
      dispath(setActiveMenu(false));
    } else {
      dispath(setActiveMenu(true));
    }
  }, [dispath, screenSize]);

  return (
    <div className="w-full   flex justify-between px-4   my-4 ">
      <button
        type="button"
        onClick={() => {
          dispath(setActiveMenu(!activeMenu));
        }}
      >
        <MenuIcon />
      </button>
      <input
        placeholder="Buscar"
        className="p-2  placeholder-[#B5B7C0] font-normal text-lg border border-[#B5B7C0] bg-white rounded-lg "
      />
    </div>
  );
};

export default Navbar;
