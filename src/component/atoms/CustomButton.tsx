import { Button, ButtonProps, styled } from "@mui/material";
import React from "react";
import { Link, To } from "react-router-dom";

const StyledButton = styled(Button)(({ theme }) => ({
  lineHeight: "normal",
  padding: "6px 16px",
  fontSize: " 0.875rem",
}));

interface CustomButtonProps extends ButtonProps {
  to?: To;
  icon?: React.ReactNode;
  variant?: "text" | "outlined" | "contained";
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning"
    | undefined;
}

const CustomButton = ({
  to = "",
  children,
  icon,
  variant,
  color,
  ...rest
}: CustomButtonProps): JSX.Element => {
  return (
    <Link to={to} style={{ textDecoration: "none" }}>
      <StyledButton color={color} variant={variant} startIcon={icon} {...rest}>
        {children}
      </StyledButton>
    </Link>
  );
};

export default CustomButton;
