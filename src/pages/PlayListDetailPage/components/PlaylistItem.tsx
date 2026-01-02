import { Box, Typography, Avatar, IconButton } from "@mui/material";
import type { PlaylistTrackObject } from "../../../models/playlist";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useState } from "react";
import type { TrackObject } from "../../../models/track";
import type { PlayableItem } from "../../../models/playlist";

interface PlaylistItemProps {
  item: PlaylistTrackObject;
  index: number;
}

const isTrackObject = (track: PlayableItem): track is TrackObject => {
  return track.type === "track";
};

const PlaylistItem = ({ item, index }: PlaylistItemProps) => {
  const track = item.track;
  const [isHovered, setIsHovered] = useState(false);

  const isTrack = isTrackObject(track);

  const imageUrl = isTrack
    ? track.album?.images?.[0]?.url
    : track.images?.[0]?.url;

  const subText = isTrack
    ? track.artists?.map((a) => a.name).join(", ")
    : track.show?.name;

  const contextName = isTrack ? track.album?.name : track.show?.name;

  return (
    <Box
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        display: "grid",
        gridTemplateColumns: "50px 4fr 2fr",
        alignItems: "center",
        padding: "8px 16px",
        borderRadius: "8px",
        transition: "background-color 0.2s ease",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.1)",
        },
      }}
    >
      <Box display="flex" justifyContent="center" alignItems="center">
        {isHovered ? (
          <IconButton size="small" sx={{ color: "white", padding: 0 }}>
            <PlayArrowIcon fontSize="small" />
          </IconButton>
        ) : (
          <Typography color="text.secondary" fontSize={14} fontWeight={500}>
            {index + 1}
          </Typography>
        )}
      </Box>

      <Box display="flex" alignItems="center" gap={2} overflow="hidden">
        <Avatar
          variant="rounded"
          src={imageUrl}
          alt={track.name}
          sx={{ width: 40, height: 40, boxShadow: 1 }}
        />

        <Box display="flex" flexDirection="column" overflow="hidden">
          <Typography
            color={isHovered ? "primary.main" : "text.primary"}
            fontWeight={500}
            noWrap
          >
            {track.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            noWrap
            fontSize={13}
          >
            {subText}
          </Typography>
        </Box>
      </Box>

      <Box overflow="hidden" display={{ xs: "none", md: "block" }}>
        <Typography variant="body2" color="text.secondary" noWrap fontSize={14}>
          {contextName}
        </Typography>
      </Box>
    </Box>
  );
};

export default PlaylistItem;
