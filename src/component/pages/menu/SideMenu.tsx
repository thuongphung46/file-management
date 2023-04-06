import { Colors } from "common/color";
import { MdDashboard, MdMenu } from "react-icons/md";
import { Menu, MenuItem, Sidebar, useProSidebar } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";

export const SideMenu = () => {
  const menuData = [
    {
      key: "DASHBOARD",
      path: "/dashboard",
      name: "Dashboard",
      icon: <MdDashboard />,
    },
  ];
  const { collapseSidebar } = useProSidebar();
  const location = useLocation();

  return (
    <Sidebar
      style={{ overflowY: "auto", height: "100%" }}
      backgroundColor={Colors.primary}>
      <Menu
        menuItemStyles={{
          button: ({ active }) => {
            return {
              backgroundColor: active ? Colors.primaryDark : undefined,
              "&:hover": {
                backgroundColor: Colors.primaryDark,
              },
            };
          },
          icon: { color: Colors.white, fontSize: 20 },
          label: { fontSize: 17, color: Colors.white, fontWeight: "bold" },
        }}>
        <MenuItem
          icon={<MdMenu></MdMenu>}
          component={
            <div
              onClick={() => {
                collapseSidebar();
              }}></div>
          }>
          Pyxis Upgrade
        </MenuItem>
        {menuData.map((x) => {
          return (
            <MenuItem
              active={location.pathname.includes(x.path)}
              icon={x.icon}
              component={<Link to={x.path} />}
              key={x.key}>
              {`${x.name}`}
            </MenuItem>
          );
        })}
      </Menu>
    </Sidebar>
  );
};
