import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}
interface Props {
  name: string;
  calories: string;
  fat: string;
  carbs: string;
}

const Deposits = ({ name, calories, carbs, fat }: Props) => {
  return (
    <React.Fragment>
      <Typography sx={{ marginBottom: 1 }}>{name}</Typography>
      <Typography
        sx={{ fontWeight: "600!important" }}
        component="p"
        variant="h4">
        {calories}
      </Typography>
      <div style={{ display: "flex" }}>
        <Link color="primary" href="#" onClick={preventDefault}>
          {carbs}
        </Link>
        <Typography>{fat}</Typography>
      </div>
    </React.Fragment>
  );
};
export default Deposits;
