import React from "react";
import Sidebar from "../Components/Sidebar";
import { Outlet } from "react-router-dom";

export default function MainWrapper() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 w-full">
      <Sidebar />
      <div className="col-span-9 p-1">
        <Outlet />
      </div>
    </div>
  );
}
