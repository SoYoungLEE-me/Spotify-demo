import { Box, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import type { TrackObject } from "../../../../models/track";

type Props = {
  track: TrackObject;
};

const SongRow = ({ track }: Props) => {
  const imageUrl = track.album?.images?.[0]?.url;
  const artistName = track.artists?.[0]?.name ?? "Unknown Artist";

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: 2,
        padding: "8px 12px",
        borderRadius: "10px",
        cursor: "pointer",
        transition: "background-color 0.15s ease, box-shadow 0.15s ease",

        "&:hover": {
          backgroundColor: "rgba(255,255,255,0.08)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.25)",

          "& .add-button": {
            opacity: 1,
          },
        },
      }}
    >
      <Box
        sx={{
          width: 40,
          height: 40,
          flexShrink: 0,
          borderRadius: "4px",
          overflow: "hidden",
          backgroundColor: "#2a2a2a",
        }}
      >
        {imageUrl && (
          <img
            src={imageUrl}
            alt={track.name}
            width="100%"
            height="100%"
            style={{ objectFit: "cover" }}
          />
        )}
      </Box>

      <Box sx={{ minWidth: 0 }}>
        <Typography fontWeight={500} noWrap>
          {track.name ?? "Unknown Title"}
        </Typography>

        <Typography variant="body2" color="rgba(255,255,255,0.6)" noWrap>
          {artistName}
        </Typography>
      </Box>

      <IconButton
        className="add-button"
        sx={{
          marginLeft: "auto",
          opacity: 0,
          transition: "opacity 0.15s ease, background-color 0.15s ease",
          color: "text.secondary",

          "&:hover": {
            color: "primary.main",
            backgroundColor: "action.selected",
          },
        }}
      >
        <AddIcon />
      </IconButton>
    </Box>
  );
};

export default SongRow;
