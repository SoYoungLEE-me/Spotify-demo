import { Box, Typography } from "@mui/material";
import type { SimplifiedPlaylistObject } from "../../models/playlist";

interface LibraryPlaylistProps {
  playlist: SimplifiedPlaylistObject;
}

const LibraryPlaylist = ({ playlist }: LibraryPlaylistProps) => {
  const imageUrl = playlist.images?.[0]?.url;

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={2}
      px={1}
      py={0.5}
      borderRadius="6px"
      sx={{
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "rgba(255,255,255,0.08)",
        },
      }}
    >
      <Box
        width={48}
        height={48}
        flexShrink={0}
        sx={{
          backgroundColor: "#333",
          borderRadius: "4px",
          overflow: "hidden",
        }}
      >
        {imageUrl && (
          <img
            src={imageUrl}
            alt={playlist.name}
            width="48"
            height="48"
            style={{ objectFit: "cover" }}
          />
        )}
      </Box>

      <Box minWidth={0} overflow="hidden" flex={1}>
        <Typography variant="body2" noWrap title={playlist.name}>
          {playlist.name}
        </Typography>

        <Typography variant="caption" color="text.secondary" noWrap>
          {playlist.owner?.display_name ?? "Unknown"} ·{" "}
          {playlist.tracks?.total ?? 0}곡
        </Typography>
      </Box>
    </Box>
  );
};

export default LibraryPlaylist;
