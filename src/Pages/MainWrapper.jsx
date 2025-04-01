import React from "react";
import Sidebar from "../Components/Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function MainWrapper() {
  const location = useLocation();
  useEffect(() => {
    localStorage.setItem("LastVisitedPath", location.pathname);
  }, [location.pathname]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 w-full">
      <Sidebar />
      <div className="col-span-9 md:p-1 px-3 py-1 md:pb-2 pb-7">
        <Outlet />
      </div>
    </div>
  );
}
