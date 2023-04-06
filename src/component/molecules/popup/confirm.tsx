import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Colors } from "common/color";
import CustomButton from "component/atoms/CustomButton";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  height: 120,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: "0 0px 8px #000000c2",
  borderRadius: 1,
  p: 4,
  padding: 2,
};
interface Props {
  onClose?: () => void;
  onAccept?: () => void;
  onOpen: boolean;
  content?: string;
}

export default function ConfirmModal({
  onClose,
  onOpen,
  content,
  onAccept,
}: Props) {
  return (
    <div>
      <Modal
        open={onOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            fontSize={16}
            component="h2"
          >
            {content}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "right",
              marginTop: 4,
            }}
          >
            <CustomButton variant={"contained"} onClick={onAccept}>
              yes
            </CustomButton>
            <CustomButton
              sx={{
                marginLeft: 1,
                color: "black",
                background: Colors.buttonCancel,
                ["&:hover"]: {
                  backgroundColor: Colors.buttonCancel,
                  borderColor: Colors.buttonCancel,
                },
              }}
              variant={"contained"}
              onClick={onClose}
            >
              cancel
            </CustomButton>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
