import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
} from "@mui/x-data-grid";
import { UserService } from "services/UserService";
import { User, NewUser } from "types/UserResponse";
import CustomTypography from "component/atoms/CustomTypography";
import { ChangeEvent, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CustomLink from "component/atoms/CustomLink";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import "./index.scss";
import { toastMessage } from "component/molecules/toast/index";

export const ListUser = () => {
  const [state, setState] = useState<User[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [newUser, setNewUser] = useState<NewUser>({
    username: "",
    password: "",
    name: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleFormInputChange = (
    event:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent
  ) => {
    const inputName = event.target.name;
    const inputChangeValue = event.target.value;
    setNewUser({
      ...newUser,
      [inputName]: inputChangeValue,
    });
  };

  const selectFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(event.target.files);
  };
  const handleAddUser = () => {
    if (selectedFiles != null) {
      const files = Array.from(selectedFiles);
      // eslint-disable-next-line array-callback-return
      files.map((file) => {
        UserService.AddUser(
          file,
          newUser.name,
          newUser.username,
          newUser.password
        )
          .then((res) => {
            if (res.status === 200) {
              setState(res.data);
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
      });
    }
  };

  return (
    <>
      <CustomTypography>Danh sách người dùng</CustomTypography>
      <Button
        startIcon={<AddIcon />}
        variant="contained"
        onClick={handleClickOpen}>
        Thêm người dùng
      </Button>
      <DataGrid
        sx={{ width: "100%", height: 350, marginTop: 2, padding: 2 }}
        columns={columns}
        rows={state}
        // checkboxSelection
        getRowId={(row) => row.id}
        // onRowSelectionModelChange={handleSelectionChange}
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
            onChange={selectFiles}
          />
          <TextField
            autoFocus
            margin="dense"
            name="username"
            label="Tên người dùng"
            type="email"
            fullWidth
            variant="standard"
            onChange={handleFormInputChange}
          />
          <FormControl
            fullWidth
            sx={{ m: 1, width: "25ch" }}
            variant="standard">
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              name="password"
              fullWidth
              onChange={handleFormInputChange}
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            onChange={handleFormInputChange}
            label="Họ và tên"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            Thoát
          </Button>
          <Button onClick={handleAddUser} variant="contained">
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
