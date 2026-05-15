import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";

function Layout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex">

      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <main
        className={`
          w-full min-h-screen bg-gray-100 p-6
          transition-all duration-300
          ${collapsed ? "ml-17" : "ml-64"}
        `}
      >
        <Outlet />
      </main>

    </div>
  );
}

export default Layout;