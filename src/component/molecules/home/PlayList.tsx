import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  SelectChangeEvent,
  TextField,
  MenuItem,
  Grid,
  InputLabel,
} from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
} from "@mui/x-data-grid";
import Select from "@mui/material/Select";
import { ChangeEvent, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CustomTypography from "component/atoms/CustomTypography";
import { useNavigate, useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { PlayListRoot } from "types/PlayListResponse";
import { toastMessage } from "component/molecules/toast/index";
import { PlayListService } from "services/PlayListService";
import CustomLink from "component/atoms/CustomLink";

export const PlayList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState<PlayListRoot[]>([]);
  const [open, setOpen] = useState(false);
  const [newPlayList, setNewPlayList] = useState({
    name: "",
    id: "",
  });

  useEffect(() => {
    PlayListService.GetPlayList().then((res) => {
      setState(res);
    });
  }, [id]);

  const columns: GridColDef[] = [
    {
      field: "",
      headerName: "Người tạo",
      width: 200,
      renderCell(params) {
        //nếu params.row.creatorId tồn tại trong state.creatorId.id thì trả về state.creatorId.na
        const creator = state.find(
          (item) => item.creatorId.id === params.row.creatorId
        );
        return (
          <>{creator ? creator?.creatorId.name : params.row.creatorId.name}</>
        );
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
      PlayListService.AddPlayList(newPlayList.id, newPlayList.name)
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
            <FormControl fullWidth size={"small"}>
              <InputLabel id="demo-simple-select-readonly-label">
                Chọn người tạo
              </InputLabel>
              <Select
                label="chọn người tạo"
                //   disabled={form_state === FORM_STATE.EDIT}
                onChange={handleFormInputChange}
                name="id"
                value={newPlayList.id}>
                {state.map((data, index) => (
                  <MenuItem
                    key={`${data.id}-${index}`}
                    value={data.creatorId.id}>
                    {data.creatorId.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
