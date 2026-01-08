import { useEffect } from "react";
import {
  Menu,
  MenuItem,
  ListItemText,
  Box,
  CircularProgress,
  Typography,
  ListItemIcon,
  Divider,
} from "@mui/material";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import { useInView } from "react-intersection-observer";
import type { SimplifiedPlaylistObject } from "../../models/playlist";

interface PlaylistSelectMenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  playlists: SimplifiedPlaylistObject[];
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  fetchNextPage?: () => void;
  onSelect: (playlistId: string) => void;
}

const PlaylistSelectMenu = ({
  anchorEl,
  open,
  onClose,
  playlists,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  onSelect,
}: PlaylistSelectMenuProps) => {
  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage?.();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      // 메뉴 위치 살짝 조정
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      PaperProps={{
        sx: {
          width: 280,
          maxHeight: 400,
          backgroundColor: "#242424",
          backgroundImage: "none",
          borderRadius: "12px",
          padding: "4px",
          boxShadow: "0 12px 24px rgba(0,0,0,0.5)",
          overflowY: "auto",

          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      }}
    >
      <Box px={2} py={1.5}>
        <Typography
          variant="subtitle2"
          fontWeight={800}
          color="rgba(255,255,255,0.9)"
        >
          Select a playlist
        </Typography>
      </Box>
      <Divider sx={{ borderColor: "rgba(255,255,255,0.05)", mb: 1 }} />

      {playlists.length === 0 && !isFetchingNextPage && (
        <MenuItem disabled sx={{ py: 2 }}>
          <Typography
            variant="body2"
            color="rgba(255,255,255,0.5)"
            textAlign="center"
            width="100%"
          >
            You don’t have any playlists yet
          </Typography>
        </MenuItem>
      )}

      {playlists.map((playlist) => {
        const imageUrl = playlist.images?.[0]?.url;

        return (
          <MenuItem
            key={playlist.id}
            onClick={(e) => {
              e.stopPropagation();
              if (!playlist.id) return;
              onSelect(playlist.id);
              onClose();
            }}
            sx={{
              borderRadius: "8px",
              margin: "2px 4px",
              padding: "8px 12px",
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.08)",
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: "4px",
                  backgroundColor: "#333",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  marginRight: "10px",
                }}
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={playlist.name}
                    width="100%"
                    height="100%"
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <PlaylistPlayIcon
                    sx={{ color: "rgba(255,255,255,0.4)", fontSize: 20 }}
                  />
                )}
              </Box>
            </ListItemIcon>

            <ListItemText
              primary={playlist.name}
              primaryTypographyProps={{
                fontSize: 14,
                fontWeight: 600,
                noWrap: true,
                color: "rgba(255,255,255,0.9)",
              }}
              secondary={`${playlist.tracks?.total ?? 0}곡`}
              secondaryTypographyProps={{
                fontSize: 12,
                color: "rgba(255,255,255,0.5)",
              }}
            />
          </MenuItem>
        );
      })}

      {hasNextPage && (
        <Box ref={ref} display="flex" justifyContent="center" py={2}>
          <CircularProgress size={20} sx={{ color: "primary.main" }} />
        </Box>
      )}
    </Menu>
  );
};

export default PlaylistSelectMenu;
