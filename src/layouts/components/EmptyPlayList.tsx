import { styled, Typography, Button, Card } from "@mui/material";

const EmptyContainer = styled(Card)({
  backgroundColor: "rgba(255,255,255,0.05)",
  padding: "20px",
  borderRadius: "8px",
  margin: "12px",
});

const AddButton = styled(Button)({
  backgroundColor: "#fff",
  color: "#000",
  borderRadius: "999px",
  fontWeight: 700,
  "&:hover": {
    backgroundColor: "#e5e7eb",
  },
});

interface EmptyPlayListProps {
  onCreatePlaylist: () => void;
}

const EmptyPlayList = ({ onCreatePlaylist }: EmptyPlayListProps) => {
  return (
    <EmptyContainer>
      <Typography
        sx={{
          fontSize: "0.9rem",
          fontWeight: 700,
        }}
        mb={1}
      >
        Create your first playlist
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>
        It's easy, we'll help you
      </Typography>
      <AddButton variant="contained" onClick={onCreatePlaylist}>
        Create Playlist
      </AddButton>
    </EmptyContainer>
  );
};

export default EmptyPlayList;
