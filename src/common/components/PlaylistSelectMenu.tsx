import { useEffect } from "react";
import {
  Menu,
  MenuItem,
  ListItemText,
  Box,
  CircularProgress,
} from "@mui/material";
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
  const { ref, inView } = useInView({
    threshold: 0,
  });

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
      PaperProps={{
        sx: {
          width: 260,
          maxHeight: 320,
          backgroundColor: "#1e1e1e",
          borderRadius: "10px",

          overflowY: "auto",

          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      }}
    >
      {playlists.length === 0 && (
        <MenuItem disabled>
          <ListItemText
            primary="플레이리스트가 없습니다"
            primaryTypographyProps={{ fontSize: 14 }}
          />
        </MenuItem>
      )}

      {playlists.map((playlist) => (
        <MenuItem
          key={playlist.id}
          onClick={(e) => {
            e.stopPropagation();
            if (!playlist.id) return;
            onSelect(playlist.id);
            onClose();
          }}
        >
          <ListItemText
            primary={playlist.name}
            primaryTypographyProps={{
              noWrap: true,
              fontSize: 14,
            }}
          />
        </MenuItem>
      ))}

      {hasNextPage && (
        <Box ref={ref} display="flex" justifyContent="center" py={1}>
          {isFetchingNextPage && <CircularProgress size={18} />}
        </Box>
      )}
    </Menu>
  );
};

export default PlaylistSelectMenu;
