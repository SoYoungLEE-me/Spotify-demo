import { Box, Typography } from "@mui/material";
import type { SimplifiedPlaylistObject } from "../../../models/playlist";

interface PlaylistItemProps {
  playlist: SimplifiedPlaylistObject;
  isActive: boolean;
  onClick: (id: string) => void;
}

const PlaylistItem = ({ playlist, isActive, onClick }: PlaylistItemProps) => {
  const imageUrl = playlist.images?.[0]?.url;

  return (
    <Box
      onClick={() => onClick(playlist.id!)}
      sx={() => ({
        cursor: "pointer",
        display: "flex",
        flexDirection: "column", // 세로 배치
        gap: 1,
        borderRadius: "8px",
        transition: "all 0.2s",
        ...(isActive && { backgroundColor: "action.selected" }),
        "&:active": { transform: "scale(0.95)" },
      })}
    >
      <Box
        sx={{
          width: "100%",
          aspectRatio: "1/1",
          backgroundColor: "#282828",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={playlist.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="100%"
          >
            <Typography color="text.disabled">No Image</Typography>
          </Box>
        )}
      </Box>

      <Box px={0.5}>
        <Typography variant="subtitle2" noWrap fontWeight="bold">
          {playlist.name}
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          noWrap
          display="block"
        >
          {playlist.owner?.display_name}
        </Typography>
      </Box>
    </Box>
  );
};

export default PlaylistItem;
