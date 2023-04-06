import { Box, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const ListMenu = () => {
  return (
    <Box padding={1}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Link to="/contact">Contact Page chưa có j đâu </Link>
        <Link to="/counter">Counter Redux Toolkit</Link>
      </Box>
      <Box>
        <div style={{ padding: "16px 24px", color: "#44596e" }}>
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
      </Box>
    </Box>
  );
};
