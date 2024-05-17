import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";
import UserPage from "./containers/pages/User";
import RoomPage from "./containers/pages/Room";
import HistoryPage from "./containers/pages/History";
function App() {
  const activeMenu = useSelector((state) => state.sidebar.activeMenu);

  return (
    <div>
      <BrowserRouter>
        <div className="flex ">
          {activeMenu && (
            <div
              className={`fixed   h-full z-10  top-0  ${
                activeMenu ? "w-72 " : "w-0"
              }`}
            >
              <Sidebar />
            </div>
          )}

          <div
            className={`bg-[#FAFBFF] relative w-full min-h-screen   ${
              activeMenu && "ml-72"
            }`}
          >
            <div
              className={`  fixed right-0 bg-[#FAFBFF]    ${
                activeMenu ? "left-72" : "left-0"
              }`}
            >
              <Navbar />
            </div>

            <div className="mx-5 pt-16">
              <Routes>
                <Route path="/" element={<UserPage />} />
                <Route path="/rooms" element={<RoomPage />} />
                <Route path="/history" element={<HistoryPage />} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
