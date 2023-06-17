import { Box, Grid, Paper } from "@mui/material";
import Chart from "component/molecules/chart/Chart";
import Deposits from "component/molecules/chart/Deposits";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { UserService } from "services/UserService";
import { User } from "types/user";
import { useEffect, useState } from "react";

const data = [
  {
    id: 1,
    name: "Total Users",
    calories: "44,278",
    carbs: "5%",
    fat: "Last week",
  },
  {
    id: 2,
    name: "Total Profit",
    calories: "67,987",
    carbs: "0.75%",
    fat: "Last 6 days",
  },
  {
    id: 3,
    name: "Total Expenses",
    calories: "$76,965",
    carbs: "0.9%",
    fat: "Last 9 days",
  },
  {
    id: 4,
    name: "Total Cost",
    calories: "$59,765",
    carbs: "0.6%",
    fat: "Last year",
  },
];

export const ListUser = () => {
  const [state, setState] = useState<User[]>([]);

  useEffect(() => {
    UserService.GetListUser().then((res) => {
      setState(res);
    });
  }, []);

  useEffect(() => {
    console.log(state);
  }, [state]);

  const columns: GridColDef[] = [
    {
      field: "userName",
      headerName: "Họ và tên",
      width: 300,
    },
    {
      field: "password",
      headerName: "Mật khẩu",
      width: 300,
    },
    {
      field: "followersCount",
      headerName: "Số follow",
      width: 300,
    },
    {
      field: "createdAt",
      headerName: "ngày tạo",
      width: 300,
      renderCell(params) {
        return <>{new Date(params.value as string).toLocaleDateString()}</>;
      },
    },
  ];

  return (
    <>
      <DataGrid
        sx={{ width: "100%", height: 350, marginTop: "70px", padding: "20px" }}
        columns={columns}
        rows={state}
        checkboxSelection
        getRowId={(row) => row.id}
        // onRowSelectionModelChange={handleSelectionChange}
      />
    </>
  );
};
