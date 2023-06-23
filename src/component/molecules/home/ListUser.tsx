import { Box, Button } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
  GridRowModes,
  GridRowModesModel,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import { UserService } from "services/UserService";
import { User } from "types/UserResponse";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CustomTypography from "component/atoms/CustomTypography";
import CustomLink from "component/atoms/CustomLink";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

export const ListUser = () => {
  const [state, setState] = useState<User[]>([]);
  const [show, setShow] = useState(false);
  useEffect(() => {
    UserService.GetListUser().then((res) => {
      setState(res);
    });
  }, []);

  const columns: GridColDef[] = [
    {
      field: "avatarUrl",
      headerName: "Avatar",
      width: 200,
      renderCell(params) {
        return (
          <>
            <Avatar alt="Remy Sharp" src={`${params.value}`} />
          </>
        );
      },
    },
    {
      field: "userName",
      headerName: "Họ và tên",
      width: 200,
      renderCell(params) {
        return (
          <>
            <CustomLink to={`/listuser/playlists/${params.id}`}>
              {params.value}
            </CustomLink>
          </>
        );
      },
    },
    {
      field: "password",
      headerName: "Mật khẩu",
      width: 100,
      renderCell(params) {
        return (
          <>
            <div> {show ? params.value : "******"}</div>

            <Button
              sx={{ float: "right" }}
              onClick={() => setShow(!show)}
              startIcon={<RemoveRedEyeIcon />}
            />
          </>
        );
      },
    },
    {
      field: "followersCount",
      headerName: "Số follow",
      width: 100,
    },
    {
      field: "createdAt",
      headerName: "ngày tạo",
      width: 100,
      renderCell(params) {
        return (
          <>{new Date(params.value as string).toLocaleDateString("vi-VN")}</>
        );
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const handleDeleteClick = (id: GridRowId) => () => {
    setState(state.filter((row) => row.id !== id));
  };

  return (
    <>
      <CustomTypography>Danh sách người dùng</CustomTypography>
      <Button sx={{ margin: 1 }} variant="contained" startIcon={<AddIcon />}>
        Thêm Người dùng
      </Button>
      <DataGrid
        sx={{ width: "100%", height: 350, marginTop: 2, padding: 2 }}
        columns={columns}
        rows={state}
        // checkboxSelection
        getRowId={(row) => row.id}
        // onRowSelectionModelChange={handleSelectionChange}
      />
    </>
  );
};
