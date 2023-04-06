import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { styled } from "@mui/material";
import { Colors } from "common/color";

interface Props {
  columns: GridColDef[];
  rows: GridRowsProp;
  sx?: any;
  getRowId: (row: any) => any;
}

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  "&.MuiDataGrid-root .MuiDataGrid-cell:focus": {
    outline: "none",
  },
  "&.MuiDataGrid-root .MuiDataGrid-headers:focus": {
    outline: "none",
  },
  ".MuiDataGrid-columnSeparator": {
    display: "none",
  },
  // "&.MuiDataGrid-root": {
  //   border: "none",
  // },
  "& .MuiDataGrid-virtualScrollerRenderZone": {
    "& .MuiDataGrid-row": {
      backgroundColor: "#F9F9F9",
      "&:nth-of-type(even)": { backgroundColor: "#F3F8FF" },
    },
  },
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: Colors.grey,
    color: Colors.black,
    fontSize: "0.875rem",
    textAlign: "left",
    fontWeight: 500,
  },
}));

const CustomDataGrid: React.FC<Props> = ({ columns, rows, sx, getRowId }) => {
  return (
    <StyledDataGrid
      columns={columns}
      rows={rows}
      sx={sx}
      getRowId={getRowId}
      // ...other table setup props
    />
  );
};

export default CustomDataGrid;
