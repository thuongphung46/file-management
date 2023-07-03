import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
} from "@mui/x-data-grid";
import { Categories } from "services/categories_service";
import { ICategories } from "types/UserResponse";
import CustomTypography from "component/atoms/CustomTypography";
import { ChangeEvent, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

import "./index.scss";
import { toastMessage } from "component/molecules/toast/index";

interface Categories {
  id: string;
  name: string;
}
export const ListCategories = () => {
  const [state, setState] = useState<Categories[]>([]);
  const [open, setOpen] = useState(false);
  const [categaries, setCategaries] = useState<ICategories>({
    name: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    Categories.GetAll().then((res) => {
      setState(res);
    });
  }, []);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Id",
      width: 200,
    },
    {
      field: "name",
      headerName: "Tên Categories",
      width: 200,
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
    Categories.DeleteCatogaries(id as string).then((res) => {
      if (res.status === "ok") {
        setState(state.filter((row) => row.id !== id));
        toastMessage("Xóa thành công !", "success");
      } else {
        toastMessage("Xóa thất bại !", "error");
      }
    });
  };
  // const handleUpdate = (id: GridRowId) => () => {
  // UserService.UpdateUser(id as string).then((res) => {
  //   if (res.status === "ok") {
  //     setState(state.filter((row) => row.id !== id));
  //     toastMessage("Xóa thành công !", "success");
  //   } else {
  //     toastMessage("Xóa thất bại !", "error");
  //   }
  // });
  // };

  const handleFormInputChange = (
    event:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent
  ) => {
    const inputName = event.target.name;
    const inputChangeValue = event.target.value;
    setCategaries({
      ...categaries,
      [inputName]: inputChangeValue,
    });
  };
  const handleAddCategaries = () => {
    Categories.Add(categaries.name)
      .then((res) => {
        if (res.status === "ok") {
          setState([...state, res.data]);
          toastMessage("Thêm Thành công !", "success");
        } else {
          toastMessage("Thêm Thất bại !", "error");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Box>
      <CustomTypography>Danh sách thể loại</CustomTypography>
      <Button
        startIcon={<AddIcon />}
        variant="contained"
        onClick={handleClickOpen}>
        Thêm thể loại nhạc
      </Button>
      <DataGrid
        sx={{ width: "100%", height: 500, marginTop: 2, padding: 2 }}
        columns={columns}
        rows={state}
        // checkboxSelection
        getRowId={(row) => row.id}
        // onRowSelectionModelChange={handleSelectionChange}
      />

      <Dialog maxWidth="sm" fullWidth open={open} onClose={handleClose}>
        <DialogTitle></DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Tên categories"
            // type=""
            fullWidth
            variant="standard"
            onChange={handleFormInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            Thoát
          </Button>
          <Button onClick={handleAddCategaries} variant="contained">
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
