import { useParams } from "react-router";
import { Box } from "@mui/material";
import useGetPlaylist from "../../hooks/useGetPlaylist";
import useGetPlaylistItems from "../../hooks/useGetPlaylistItems";
import LoadingSpinner from "../../common/components/LoadingSpinner";
import ErrorMessage from "../../common/components/ErrorMessage";
import PlaylistHeader from "./components/PlaylistHeader";
import PlaylistItemsContainer from "./components/PlaylistItemsContainer";
import AuthErrorFallback from "../../common/components/AuthErrorFallback";

const PlayListDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: playlist,
    isLoading: isPlaylistLoading,
    error: playlistError,
  } = useGetPlaylist({
    playlist_id: id!,
  });

  const {
    data: playlistItems,
    isLoading: isPlaylistItemsLoading,
    error: playlistItemsError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetPlaylistItems({
    playlist_id: id!,
    limit: 15,
  });

  const isLoading = isPlaylistLoading || isPlaylistItemsLoading;
  const error = playlistError || playlistItemsError;

  const accessToken = localStorage.getItem("access_token");

  if (!accessToken) {
    return <AuthErrorFallback />;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }

  if (!playlist || !playlistItems) {
    return <ErrorMessage errorMessage="Playlist not found" />;
  }

  return (
    <Box display="flex" flexDirection="column" height="100vh" overflow="hidden">
      <PlaylistHeader playlist={playlist} />

      <Box
        marginTop="10px"
        flex={1}
        minHeight={0}
        overflow="auto"
        sx={{
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(255,255,255,0.25) transparent",

          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(255,255,255,0.25)",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-button": {
            display: "none",
          },
          "&::-webkit-scrollbar-corner": {
            background: "transparent",
          },
          "&:hover::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(255,255,255,0.4)",
          },
        }}
      >
        <PlaylistItemsContainer
          playlistItems={playlistItems}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </Box>
    </Box>
  );
};

export default PlayListDetailPage;
