import { styled, Typography, Button, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add"; // 아이콘 추가 권장
import MusicVideoIcon from "@mui/icons-material/MusicVideo";

const FullPageWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "70vh",
  textAlign: "center",
  padding: "24px",
});

const LargeAddButton = styled(Button)({
  backgroundColor: "#fff",
  color: "#000",
  borderRadius: "999px",
  fontWeight: 700,
  padding: "10px 24px",
  fontSize: "0.95rem",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#e5e7eb",
  },
});

interface EmptyPlayListProps {
  onCreatePlaylist: () => void;
}

const EmptyPlayList = ({ onCreatePlaylist }: EmptyPlayListProps) => {
  return (
    <FullPageWrapper>
      <MusicVideoIcon
        sx={{ fontSize: 64, color: "text.disabled", mb: 2, opacity: 0.5 }}
      />

      <Typography variant="h6" fontWeight={700} gutterBottom>
        Create your first playlist
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        mb={4}
        sx={{ maxWidth: "250px" }}
      >
        It's easy, we'll help you.
      </Typography>

      <LargeAddButton
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onCreatePlaylist}
      >
        Create playlist
      </LargeAddButton>
    </FullPageWrapper>
  );
};

export default EmptyPlayList;
