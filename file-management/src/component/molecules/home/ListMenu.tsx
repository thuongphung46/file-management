import { Box, Container } from "@mui/material";
import { Link } from "react-router-dom";

export const ListMenu = () => {
  return (
    <Container>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Link to="/contact">Contact Page</Link>
        <Link to="/counter">Counter Redux Toolkit</Link>
      </Box>
    </Container>
  );
};
