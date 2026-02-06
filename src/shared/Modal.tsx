import React from "react";
import { Modal as MuiModal, Box } from "@mui/material";
import type { BoxProps } from "@mui/material";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  sx?: BoxProps["sx"];
  width?: { xs: number | string; sm?: number | string; md?: number | string; lg?: number | string };
}

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  children,
  sx,
  width = { xs: 350, sm: 700 },
}) => {
  return (
    <MuiModal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: width,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 3,
          borderRadius: 2,
          outline: "none",
          ...sx,
        }}
      >
        {children}
      </Box>
    </MuiModal>
  );
};

export default Modal;
