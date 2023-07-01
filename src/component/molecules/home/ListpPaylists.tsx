import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { UserService } from "services/UserService";
import { Playlist } from "types/UserResponse";
import { useEffect, useState } from "react";
import CustomTypography from "component/atoms/CustomTypography";
import CustomLink from "component/atoms/CustomLink";
import { useParams } from "react-router-dom";
//list playlist of user
export const ListPlaylist = () => {
  const { id } = useParams();
  const [state, setState] = useState<Playlist[]>([]);
  useEffect(() => {
    UserService.GetUserById(id).then((res) => {
      if (res.status === "OK") {
        setState(res.data.playlists);
      }
    });
  }, [id]);

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Song",
      width: 200,
    },
    {
      field: "creatorId",
      headerName: "Thể loại",
      width: 100,
      renderCell(params) {
        return (
          <>
            <div>{params.value}</div>
          </>
        );
      },
    },
    {
      field: "favorite",
      headerName: "Yêu thích",
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
  ];

  return (
    <Box marginTop={4}>
      <CustomTypography>Danh sách nhạc trong play list</CustomTypography>

      <DataGrid
        sx={{ width: "100%", height: 500, marginTop: 2, padding: 2 }}
        columns={columns}
        rows={state}
        getRowId={(row) => row.id}
      />
    </Box>
  );
};
