import { Avatar, Button } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
} from "@mui/x-data-grid";
import { SongService } from "services/SongService";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CustomTypography from "component/atoms/CustomTypography";
import { useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

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
  useEffect(() => {
    SongService.GetAllSong().then((res) => {
      setState(res);
    });
  }, [id]);

  const columns: GridColDef[] = [
    {
      field: "thumbnailUrl",
      headerName: "hình ảnh",
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
      width: 300,
      renderCell(params) {
        return (
          <>
            <audio controls src={`${params.value}`}>
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
