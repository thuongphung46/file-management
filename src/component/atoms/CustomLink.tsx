import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Colors } from "common/color";

interface CustomLinkProps {
  children: ReactNode;
  to: string;
  [prop: string]: any;
}

const CustomLink = ({ children, to, ...props }: CustomLinkProps) => {
  return (
    <Link
      style={{
        textDecoration: "none",
        fontWeight: "900",
        color: Colors.primary,
      }}
      to={to}
      {...props}
    >
      {children}
    </Link>
  );
};

export default CustomLink;
