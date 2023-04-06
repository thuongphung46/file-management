import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

interface Props {
  children: React.ReactNode;
  title: string;
}
function NestedList({ children, title }: Props) {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton onClick={handleClick}>
        {open ? <ExpandLess /> : <ExpandMore />}
        <ListItemText primary={title} />
      </ListItemButton>
      <List
        sx={{
          width: "100%",
          height: "400px",
          overflow: "auto",
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List disablePadding>
            <ListItemButton sx={{ pl: 4, display: "block" }}>
              {children}
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </>
  );
}
export default NestedList;
