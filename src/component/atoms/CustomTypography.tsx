import { styled, TypographyProps } from "@mui/material";
import { Colors } from "common/color";
import Typography from "@mui/material/Typography";

const StyledComponent = styled(Typography)(({ theme }) => ({
  color: Colors.primaryDark,
  marginBottom: 16,
  fontWeight: 900,
  fontSize: "1.5rem",
}));

const CustomTypography = ({ children }: TypographyProps) => {
  return <StyledComponent>{children}</StyledComponent>;
};

export default CustomTypography;
