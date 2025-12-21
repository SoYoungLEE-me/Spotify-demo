import { Outlet } from "react-router";

const AppLayout = () => {
  return (
    <div className="app-layout-wrapper">
      <main>
        SideBar
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
