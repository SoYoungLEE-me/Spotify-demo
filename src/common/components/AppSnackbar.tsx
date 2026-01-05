import { Snackbar, Alert } from "@mui/material";

export type SnackbarSeverity = "success" | "error" | "info" | "warning";

interface AppSnackbarProps {
  open: boolean;
  message: string;
  severity?: SnackbarSeverity;
  autoHideDuration?: number;
  onClose: () => void;
}

const AppSnackbar = ({
  open,
  message,
  severity = "success",
  autoHideDuration = 2000,
  onClose,
}: AppSnackbarProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AppSnackbar;
