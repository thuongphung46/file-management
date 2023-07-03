import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  SelectChangeEvent,
  TextField,
  Grid,
} from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
} from "@mui/x-data-grid";
import { ChangeEvent, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CustomTypography from "component/atoms/CustomTypography";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { PlayListRoot } from "types/PlayListResponse";
import { User } from "types/UserResponse";
import { toastMessage } from "component/molecules/toast/index";
import { PlayListService } from "services/PlayListService";
import { UserService } from "services/UserService";
import CustomLink from "component/atoms/CustomLink";

export const PlayList = () => {
  // const { id } = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState<PlayListRoot[]>([]);
  const [listUser, setListUser] = useState<User[]>([]);
  const [open, setOpen] = useState(false);
  const [newPlayList, setNewPlayList] = useState({
    name: "",
    id: "",
  });

  useEffect(() => {
    PlayListService.GetPlayList().then((res) => {
      if (res !== null) {
        setState(res);
        toastMessage("Chọn playList", "success");
      } else {
        //toast
        toastMessage("Không có dữ liệu !", "error");
      }
    });
  }, []);

  useEffect(() => {
    UserService.GetListUser().then((res) => {
      if (res !== null) {
        setListUser(res);
      } else {
        //toast
        toastMessage("Không có dữ liệu !", "error");
      }
    });
  }, []);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Người tạo",
      width: 200,
      renderCell(params) {
        //nếu params.row.creatorId tồn tại trong listUser thì trả về listUser.name
        const creator = listUser.find((item) => item.id === params.row.creator);
        // return <>{creator ? creator.name : params.row.creatorId.name}</>;
        return <>{creator?.name}</>;
      },
    },
    {
      field: "name",
      headerName: "Tên playlist",
      width: 200,
      renderCell(params) {
        return (
          <>
            <CustomLink to="">{params.value}</CustomLink>
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
    PlayListService.DeletePlayList(id as string)
      .then((res) => {
        if (res.status === "ok") {
          toastMessage("Xóa thành công !", "success");
          setState(state.filter((item) => item.id !== id));
        } else {
          toastMessage("Xóa thất bại !", "error");
        }
      })
      .catch((e) => {
        toastMessage("Xóa thất bại !", "error");
      });
  };

  const handleFormInputChange = (
    event:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent
  ) => {
    const inputName = event.target.name;
    const inputChangeValue = event.target.value;
    setNewPlayList({
      ...newPlayList,
      [inputName]: inputChangeValue,
    });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddPlayList = () => {
    if (newPlayList!) {
      PlayListService.AddPlayList(newPlayList.name)
        .then((res) => {
          if (res.status === 200) {
            toastMessage("Thêm thành công !", "success");
            setState([...state, res.data.data]);
          } else {
            toastMessage("Thêm thất bại !", "error");
          }
        })
        .catch((e) => {
          toastMessage("Thêm thất bại !", "error");
        });
    }
  };
  return (
    <Box>
      <CustomTypography>Danh sách playlist</CustomTypography>
      <Button
        startIcon={<AddIcon />}
        variant="contained"
        onClick={handleClickOpen}>
        Thêm playlist
      </Button>
      <DataGrid
        sx={{ width: "100%", height: 500, marginTop: 2, padding: 2 }}
        columns={columns}
        rows={state}
        // checkboxSelection
        getRowId={(row) => row.id}
        onRowClick={(e) => {
          navigate(`/playlist/${e.id}`);
        }}
      />

      <Dialog maxWidth="sm" fullWidth open={open} onClose={handleClose}>
        <DialogTitle></DialogTitle>
        <DialogContent>
          <Grid top={2}>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              onChange={handleFormInputChange}
              label="Tên playlist"
              fullWidth
              variant="standard"
            />
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            Thoát
          </Button>
          <Button onClick={handleAddPlayList} variant="contained">
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
