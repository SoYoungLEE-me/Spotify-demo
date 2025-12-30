import { Box, Typography } from "@mui/material";
import type { SimplifiedPlaylistObject } from "../../models/playlist";

interface LibraryPlaylistProps {
  playlist: SimplifiedPlaylistObject;
  isActive: boolean;
  onClick: (id: string) => void;
}

const LibraryPlaylist = ({
  playlist,
  isActive,
  onClick,
}: LibraryPlaylistProps) => {
  const imageUrl = playlist.images?.[0]?.url;

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={2}
      px={1}
      py={0.5}
      borderRadius="6px"
      onClick={() => onClick(playlist.id!)}
      sx={(theme) => ({
        cursor: "pointer",
        color: "inherit",

        "&:hover": {
          backgroundColor: theme.palette.action.hover,
        },

        "&:active": {
          backgroundColor: theme.palette.action.hover,
          transform: "scale(0.985)",
        },

        ...(isActive && {
          backgroundColor: theme.palette.action.selected,
        }),
      })}
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
