import * as React from "react";
import { Grid, Fade, Modal, Box, DialogTitle, IconButton } from "@mui/material";
import CustomButton from "component/atoms/CustomButton";
import { FaRegWindowClose } from "react-icons/fa";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "60%",
  minHeight: "calc(100% - 100px)",
  bgcolor: "background.paper",
  border: "2px solid #fff",
  boxShadow: 24,
  zIndex: 50,
  p: 4,
};
interface page {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  title: string;
}
export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 0 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <FaRegWindowClose />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

const TransitionsModal = (props: page) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { children, title, icon } = props;
  return (
    <Box>
      <Grid sx={{ marginLeft: 4, marginTop: 4 }}>
        <CustomButton startIcon={icon} variant="contained" onClick={handleOpen}>
          {title}
        </CustomButton>
      </Grid>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box sx={style}>
            <BootstrapDialogTitle
              id="customized-dialog-title"
              onClose={handleClose}
            />
            {children}
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};
export { TransitionsModal };
