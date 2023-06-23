import { Box, Button } from "@mui/material";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { SongService } from "services/SongService";
import { User } from "types/UserResponse";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CustomTypography from "component/atoms/CustomTypography";
import CustomLink from "component/atoms/CustomLink";
import { useParams } from "react-router-dom";

interface Song {
  id: number;
  name: string;
  category: any;
  url: string;
  thumbnailUrl: string;
  creatorId: any;
  createdAt: string;
  downloadCount: number;
  listenedCount: number;
}

export const SongList = () => {
  const { id } = useParams();
  const [state, setState] = useState<Song[]>([]);
  const [show, setShow] = useState(false);
  useEffect(() => {
    SongService.GetAllSongById(id).then((res) => {
      if (res.status === "OK") {
        setState(res.data);
      }
    });
  }, [id]);

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Tên nhạc",
      width: 200,
    },
    {
      field: "category",
      headerName: "Thể loại",
      width: 100,
    },
    {
      field: "url",
      headerName: "file",
      width: 100,
      renderCell(params) {
        console.log(params);
        return (
          <>
            <audio controls src="test">
              Your browser does not support the
              <code>audio</code> element.
            </audio>
          </>
        );
      },
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
    <>
      <CustomTypography>Danh sách nhạc</CustomTypography>
      <Button sx={{ margin: 1 }} variant="contained" startIcon={<AddIcon />}>
        Thêm nhạc
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
