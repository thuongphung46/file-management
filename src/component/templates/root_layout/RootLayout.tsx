import { Box } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import { Playground } from "component/organisms/SideMenu/Menu";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { useState } from "react";

const RootLayout = () => {
  const navigate = useNavigate();
  const currentUser = Boolean(localStorage.getItem("access_token"));

  useEffect(() => {
    if (!currentUser) {
      navigate("/listuser");
    }
  }, [currentUser, navigate]);

  if (currentUser) {
    return (
      <div>
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
            padding={4}
            id={"main-view"}
            sx={{ height: "100%", flex: 1, overflow: "auto" }}>
            <Outlet />
          </Box>
        </Box>
      </div>
    );
  } else {
    return <Navigate to="/login" />;
  }
};

export default RootLayout;
