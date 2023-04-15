import { Box } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import { Playground } from "component/organisms/SideMenu/Menu";
import { useState } from "react";

const RootLayout = () => {
  const [auth, setAuth] = useState(false);

  if (auth) {
    return (
      <Box
        component="div"
        className={"main-app"}
        sx={{
          flexDirection: "row",
          display: "flex",
          flex: 1,
          height: "100vh",
        }}>
        <Playground />
        <Box
          id={"main-view"}
          sx={{ height: "100%", flex: 1, overflow: "auto" }}>
          <Outlet />
        </Box>
      </Box>
    );
  } else {
    return <Navigate to="/login" />;
  }
};

export default RootLayout;
