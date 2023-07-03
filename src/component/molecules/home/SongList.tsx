import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  SelectChangeEvent,
  TextField,
  InputLabel,
  FormControl,
  MenuItem,
} from "@mui/material";
import Select from "@mui/material/Select";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import { ChangeEvent, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CustomTypography from "component/atoms/CustomTypography";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { Song, NewSong } from "types/SongResponse";
import { toastMessage } from "component/molecules/toast/index";
import { SongService } from "services/SongService";
import "./index.scss";
import { Categories } from "services/categories_service";

interface IProps {
  // databases: UpgradeableDatabase[];
  onDatabaseSelectionChange: (proceedDatabase: string[]) => void;
}
interface Categories {
  id: string;
  name: string;
}

export const SongList = ({ onDatabaseSelectionChange }: IProps) => {
  const [state, setState] = useState<Song[]>([]);
  const [categaries, setCategaries] = useState<Categories[]>([]);
  const [image, setImage] = useState<FileList | null>(null);
  const [song, setSong] = useState<FileList | null>(null);
  const [open, setOpen] = useState(false);
  const [newSong, setNewSong] = useState<NewSong>({
    name: "",
    category: "",
    creator: "",
  });
  useEffect(() => {
    SongService.GetAllSong().then((res) => {
      setState(res);
    });
  }, []);

  useEffect(() => {
    Categories.GetAll().then((res) => {
      setCategaries(res);
    });
  }, []);

  const columns: GridColDef[] = [
    {
      field: "thumbnailUrl",
      headerName: "Hình ảnh",
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
      field: "url",
      headerName: "File",
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
      headerName: "Ngày tạo",
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
    SongService.DeleteSong(id as string)
      .then((res) => {
        if (res.status === "ok") {
          toastMessage("Xóa Thành công !", "success");
          setState(state.filter((row) => row.id !== id));
        } else {
          toastMessage("Xóa Thất bại !", "error");
        }
      })
      .catch((e) => {
        toastMessage("Xóa Thất bại !", "error");
      });
  };

  const handleFormInputChange = (
    event:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent
  ) => {
    const inputName = event.target.name;
    const inputChangeValue = event.target.value;
    setNewSong({
      ...newSong,
      [inputName]: inputChangeValue,
    });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const selectSong = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSong(event.target.files);
  };
  const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImage(event.target.files);
  };

  const handleAddSong = () => {
    if (song != null && image != null) {
      //upload file
      SongService.UploadSong(image[0], song[0], newSong.name, newSong.category)
        .then((res) => {
          if (res.status === 200) {
            setState([...state, res.data.data]);
            toastMessage("Thêm Thành công !", "success");
          } else {
            toastMessage("Thêm Thất bại !", "error");
          }
        })
        .catch((e) => {
          if (e.response.data.status === "fales") {
            toastMessage("Tên người dùng tồn tại  !", "error");
          } else {
            toastMessage("Thêm Thất bại !", "error");
          }
        });
    }
  };

  const handleSelectionChange = (row: GridRowSelectionModel) => {
    onDatabaseSelectionChange(row as string[]);
  };
  return (
    <Box>
      <CustomTypography>Danh sách nhạc</CustomTypography>
      <Button
        startIcon={<AddIcon />}
        variant="contained"
        onClick={handleClickOpen}>
        Thêm Nhạc
      </Button>
      <DataGrid
        sx={{ width: "100%", height: 500, marginTop: 2, padding: 2 }}
        columns={columns}
        rows={state}
        checkboxSelection
        getRowId={(row) => row.id}
        onRowSelectionModelChange={handleSelectionChange}
      />

      <Dialog maxWidth="sm" fullWidth open={open} onClose={handleClose}>
        <DialogTitle></DialogTitle>
        <DialogContent>
          <input
            accept="image/*"
            className="custom-file-input"
            name="image"
            multiple
            type="file"
            onChange={selectImage}
          />
          <input
            accept="audio/mp3"
            className="custom-file-input-song"
            name="song"
            multiple
            type="file"
            onChange={selectSong}
          />
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Tên nhạc"
            fullWidth
            variant="standard"
            onChange={handleFormInputChange}
          />
          <FormControl fullWidth size={"small"}>
            <InputLabel id="demo-simple-select-readonly-label">
              Chọn thể loại
            </InputLabel>
            <Select
              label="Thể loại"
              //   disabled={form_state === FORM_STATE.EDIT}
              onChange={handleFormInputChange}
              name="category"
              // value={newPlayList.id}
            >
              {categaries.map((data, index) => (
                <MenuItem key={`${data.id}-${index}`} value={data.id}>
                  {data.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            Thoát
          </Button>
          <Button onClick={handleAddSong} variant="contained">
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
