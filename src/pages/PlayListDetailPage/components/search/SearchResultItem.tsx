import { Box, Button, Typography } from "@mui/material";
import type { TrackObject } from "../../../../models/track";
import { useParams } from "react-router";
import useAddItemsToPlaylist from "../../../../hooks/useAddItemsToPlaylist";
import AppSnackbar from "../../../../common/components/AppSnackbar";
import { useState } from "react";
interface SearchResultItemProps {
  track: TrackObject;
}

const SearchResultItem = ({ track }: SearchResultItemProps) => {
  const { id: playlistId } = useParams<{ id: string }>();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [snackSeverity, setSnackSeverity] = useState<"success" | "error">(
    "success"
  );

  const { mutate: addItems, isPending } = useAddItemsToPlaylist(playlistId!);

  const handleAdd = () => {
    if (!track.uri) return;

    addItems(
      {
        uris: [track.uri],
      },
      {
        onSuccess: () => {
          setSnackMessage("Added to playlist");
          setSnackSeverity("success");
          setOpenSnackbar(true);
        },
        onError: () => {
          setSnackMessage("Failed to add track");
          setSnackSeverity("error");
          setOpenSnackbar(true);
        },
      }
    );
  };

  const artistNames =
    track.artists?.map((a) => a.name).join(", ") ?? "Unknown Artist";
  const albumImage = track.album?.images?.[0]?.url;

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      padding="8px 12px"
      borderRadius="6px"
      sx={{
        transition: "background-color 0.2s",
        "&:hover": {
          backgroundColor: "rgba(255,255,255,0.05)",
          "& .add-btn": {
            borderColor: "white",
            color: "white",
          },
        },
        cursor: "default",
      }}
    >
      <Box display="flex" alignItems="center" gap={2} minWidth={0} flex={1}>
        {/* Album Image */}
        <Box
          width={48}
          height={48}
          flexShrink={0}
          borderRadius="4px"
          bgcolor="#333"
          overflow="hidden"
        >
          {albumImage ? (
            <img
              src={albumImage}
              alt={track.name}
              width="100%"
              height="100%"
              style={{ objectFit: "cover" }}
            />
          ) : (
            <Typography variant="caption" color="rgba(255,255,255,0.3)">
              IMG
            </Typography>
          )}
        </Box>

        {/* Text */}
        <Box minWidth={0} display="flex" flexDirection="column">
          <Typography
            fontWeight={600}
            noWrap
            sx={{ color: "white", fontSize: "1rem" }}
          >
            {track.name}
          </Typography>
          <Typography
            variant="body2"
            noWrap
            sx={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}
          >
            {artistNames}
          </Typography>
        </Box>
      </Box>

      <Button size="small" onClick={handleAdd} disabled={isPending}>
        {isPending ? "Adding…" : "Add"}
      </Button>

      <AppSnackbar
        open={openSnackbar}
        message={snackMessage}
        severity={snackSeverity}
        onClose={() => setOpenSnackbar(false)}
      />
    </Box>
  );
};

export default SearchResultItem;
