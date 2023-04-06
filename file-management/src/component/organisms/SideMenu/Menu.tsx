import React from "react";
import {
  SubMenu,
  Sidebar,
  useProSidebar,
  menuClasses,
  MenuItem,
  Menu,
  MenuItemStyles,
} from "react-pro-sidebar";
import { Typography, Switch, Badge } from "@mui/material";
import DiamondIcon from "@mui/icons-material/Diamond";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import Brightness6Icon from "@mui/icons-material/Brightness6";
import BarChartIcon from "@mui/icons-material/BarChart";
// import { BarChart } from "./icons/BarChart";
// import { Global } from "./icons/Global";
// import { InkBottle } from "./icons/InkBottle";
// import { Book } from "./icons/Book";
// import { Calendar } from "./icons/Calendar";
// import { ShoppingCart } from "./icons/ShoppingCart";
// import { Service } from "./icons/Service";
// import { SidebarFooter } from "./components/SidebarFooter";
// import { Badge } from "./components/Badge";

// import { PackageBadges } from "./components/PackageBadges";
// import { Switch } from "./components/Switch";
import { SidebarHeader } from "component/organisms/SlidebarHeader";
import { Link, useLocation } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
type Theme = "light" | "dark";

const themes = {
  light: {
    sidebar: {
      backgroundColor: "#ffffff",
      color: "#607489",
    },
    menu: {
      menuContent: "#fbfcfd",
      icon: "#0098e5",
      hover: {
        backgroundColor: "#c5e4ff",
        color: "#44596e",
      },
      disabled: {
        color: "#9fb6cf",
      },
    },
  },
  dark: {
    sidebar: {
      backgroundColor: "#0b2948",
      color: "#8ba1b7",
    },
    menu: {
      menuContent: "#082440",
      icon: "#59d0ff",
      hover: {
        backgroundColor: "#00458b",
        color: "#b6c8d9",
      },
      disabled: {
        color: "#3e5e7e",
      },
    },
  },
};

// hex to rgba converter
const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const Playground: React.FC = () => {
  const { toggleSidebar, collapseSidebar, broken, collapsed } = useProSidebar();

  const [isRTL, setIsRTL] = React.useState<boolean>(false);
  const [hasImage, setHasImage] = React.useState<boolean>(false);
  const [theme, setTheme] = React.useState<Theme>("light");
  const location = useLocation();
  // handle on RTL change event

  // handle on theme change event
  const handleThemeDark = () => {
    setTheme("dark");
  };
  const handleThemeLight = () => {
    setTheme("light");
  };

  // handle on image change event
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasImage(e.target.checked);
  };

  const menuItemStyles: MenuItemStyles = {
    root: {
      fontSize: "13px",
      fontWeight: 400,
    },
    icon: {
      color: themes[theme].menu.icon,
      [`&.${menuClasses.disabled}`]: {
        color: themes[theme].menu.disabled.color,
      },
    },
    SubMenuExpandIcon: {
      color: "#b6b7b9",
    },
    subMenuContent: ({ level }: any) => ({
      backgroundColor:
        level === 0
          ? hexToRgba(
              themes[theme].menu.menuContent,
              hasImage && !collapsed ? 0.4 : 1
            )
          : "transparent",
    }),
    button: {
      [`&.${menuClasses.disabled}`]: {
        color: themes[theme].menu.disabled.color,
      },
      "&:hover": {
        backgroundColor: hexToRgba(
          themes[theme].menu.hover.backgroundColor,
          hasImage ? 0.8 : 1
        ),
        color: themes[theme].menu.hover.color,
      },
    },
    label: ({ open }: any) => ({
      fontWeight: open ? 600 : undefined,
    }),
  };

  const menuData = [
    {
      key: "DASHBOARD",
      path: "/dashboard",
      name: "Dashboard",
      icon: <MdDashboard />,
    },
    {
      key: "HOME",
      path: "/",
      name: "Home",
      icon: <MdDashboard />,
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        direction: isRTL ? "rtl" : "ltr",
      }}>
      <Sidebar
        image="https://user-images.githubusercontent.com/25878302/144499035-2911184c-76d3-4611-86e7-bc4e8ff84ff5.jpg"
        rtl={isRTL}
        breakPoint="lg"
        backgroundColor={hexToRgba(
          themes[theme].sidebar.backgroundColor,
          hasImage ? 0.9 : 1
        )}
        rootStyles={{
          color: themes[theme].sidebar.color,
        }}>
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <SidebarHeader
            onClick={() => collapseSidebar()}
            style={{ marginBottom: "24px", marginTop: "16px" }}
          />
          <div style={{ flex: 1, marginBottom: "32px" }}>
            <div style={{ padding: "0 24px", marginBottom: "8px" }}>
              <Typography
                variant="body2"
                fontWeight={600}
                style={{
                  opacity: collapsed ? 0 : 0.7,
                  letterSpacing: "0.5px",
                }}>
                General
              </Typography>
            </div>
            <Menu menuItemStyles={menuItemStyles}>
              <SubMenu
                label="Charts"
                icon={<BarChartIcon />}
                suffix={<Badge badgeContent={4} color="primary"></Badge>}>
                <MenuItem>Pie charts</MenuItem>
                <MenuItem> Line charts</MenuItem>
                <MenuItem> Bar charts</MenuItem>
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
              </SubMenu>
              <SubMenu label="Maps" icon={<TravelExploreIcon />}>
                <MenuItem> Google maps</MenuItem>
                <MenuItem> Open street maps</MenuItem>
              </SubMenu>
              <SubMenu label="Theme" icon={<Brightness6Icon />}>
                <MenuItem onClick={() => handleThemeDark()}>Dark</MenuItem>
                <MenuItem onClick={() => handleThemeLight()}> Light</MenuItem>
              </SubMenu>
              <SubMenu label="Components" icon={<DiamondIcon />}>
                <MenuItem> Grid</MenuItem>
                <MenuItem> Layout</MenuItem>
                <SubMenu label="Forms">
                  <MenuItem> Input</MenuItem>
                  <MenuItem> Select</MenuItem>
                  <SubMenu label="More">
                    <MenuItem> CheckBox</MenuItem>
                    <MenuItem> Radio</MenuItem>
                  </SubMenu>
                </SubMenu>
              </SubMenu>
              <SubMenu label="E-commerce" icon={<AddShoppingCartIcon />}>
                <MenuItem> Product</MenuItem>
                <MenuItem> Orders</MenuItem>
                <MenuItem> Credit card</MenuItem>
              </SubMenu>
            </Menu>

            <div
              style={{
                padding: "0 24px",
                marginBottom: "8px",
                marginTop: "32px",
              }}>
              <Typography
                variant="body2"
                fontWeight={600}
                style={{
                  opacity: collapsed ? 0 : 0.7,
                  letterSpacing: "0.5px",
                }}>
                Extra
              </Typography>
            </div>

            <Menu menuItemStyles={menuItemStyles}>
              <MenuItem
                icon={<CalendarMonthIcon />}
                suffix={
                  <Badge badgeContent={4} color="primary">
                    New
                  </Badge>
                }>
                Calendar
              </MenuItem>
              <MenuItem icon={<LibraryBooksIcon />}>Documentation</MenuItem>
              <MenuItem disabled icon={<BarChartIcon />}>
                Examples
              </MenuItem>
              <MenuItem style={{ marginBottom: 16 }}>
                <Switch
                  id="image"
                  checked={hasImage}
                  onChange={handleImageChange}
                  aria-label="Image"
                />
                Theme
              </MenuItem>
            </Menu>
          </div>
          {/* <SidebarFooter collapsed={collapsed} /> */}
        </div>
      </Sidebar>

      <main>
        <div style={{ padding: "16px 24px", color: "#44596e" }}>
          <div style={{ marginBottom: "16px" }}>
            {broken && (
              <button className="sb-button" onClick={() => toggleSidebar()}>
                Toggle
              </button>
            )}
          </div>
          <div style={{ marginBottom: "48px" }}>
            <Typography variant="h4" fontWeight={600}>
              Todo something edit by Phùng Hoài Thương
            </Typography>
            <Typography variant="body2">
              React Pro Sidebar provides a set of components for creating high
            </Typography>
            {/* <PackageBadges /> */}
          </div>

          <div style={{ padding: "0 8px" }}>
            <div style={{ marginBottom: 16 }}>item1</div>
            <div style={{ marginBottom: 16 }}>text here</div>
          </div>
        </div>
      </main>
    </div>
  );
};
