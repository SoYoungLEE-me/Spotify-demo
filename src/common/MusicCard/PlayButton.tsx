import { IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const PlayButton = () => {
  return (
    <IconButton
      className="play-button"
      sx={{
        position: "absolute",
        bottom: 12,
        right: 12,
        width: 40,
        height: 40,
        backgroundColor: "primary.main",
        color: "#fff",
        opacity: 0,
        transform: "translateY(8px)",
        transition: "all 0.2s ease",
        "&:hover": {
          backgroundColor: "#FB7185",
        },
      }}
    >
      <PlayArrowIcon />
    </IconButton>
  );
};

export default PlayButton;
