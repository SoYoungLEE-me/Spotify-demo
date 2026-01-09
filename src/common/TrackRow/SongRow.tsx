import { Box, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import type { TrackObject } from "../../models/track";
import PlaylistSelectMenu from "../components/PlaylistSelectMenu";
import useGetCurrentUserPlaylists from "../../hooks/useGetCurrentUserPlaylists";
import AppSnackbar from "../components/AppSnackbar";
import { useState } from "react";
import useAddItemsToPlaylist from "../../hooks/useAddItemsToPlaylist";

type Props = {
  track: TrackObject;
};

const SongRow = ({ track }: Props) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "info"
  >("success");

  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(
    null
  );

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGetCurrentUserPlaylists({ limit: 10 });

  const playlists = data?.pages.flatMap((page) => page.items) ?? [];

  const imageUrl = track.album?.images?.[0]?.url;
  const artistName = track.artists?.[0]?.name ?? "Unknown Artist";
  const accessToken = localStorage.getItem("access_token");
  const isLoggedIn = Boolean(accessToken);

  const handleAddClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!accessToken) {
      setSnackbarMessage("Please log in to add songs to a playlist.");
      setSnackbarSeverity("info");
      setSnackbarOpen(true);
      return;
    }

    setAnchorEl(e.currentTarget);
  };

  const { mutate: addItems } = useAddItemsToPlaylist(selectedPlaylistId!);
  const handleAddItems = (playlistId: string) => {
    if (!track.uri) return;

    setSelectedPlaylistId(playlistId);

    addItems(
      { uris: [track.uri] },
      {
        onSuccess: () => {
          setSnackbarMessage("Added to playlist.");
          setSnackbarSeverity("success");
          setSnackbarOpen(true);
          setAnchorEl(null);
        },
        onError: () => {
          setSnackbarMessage("Failed to add song.");
          setSnackbarSeverity("error");
          setSnackbarOpen(true);
        },
      }
    );
  };

  return (
    <>
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
          onClick={handleAddClick}
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
      {isLoggedIn && (
        <PlaylistSelectMenu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          playlists={playlists}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
          onSelect={(playlistId) => {
            handleAddItems(playlistId);
          }}
        />
      )}
      <AppSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={() => setSnackbarOpen(false)}
      />
    </>
  );
};

export default SongRow;
