import { useParams } from "react-router";
import { Box } from "@mui/material";
import useGetPlaylist from "../../hooks/useGetPlaylist";
import useGetPlaylistItems from "../../hooks/useGetPlaylistItems";
import LoadingSpinner from "../../common/components/LoadingSpinner";
import ErrorMessage from "../../common/components/ErrorMessage";
import PlaylistHeader from "./components/header/PlaylistHeader";
import PlaylistItemsContainer from "./components/list/PlaylistItemsContainer";
import AuthErrorFallback from "../../common/components/AuthErrorFallback";
import EmptyPlaylist from "./components/empty/EmptyPlaylist";
import AddTrackButton from "./components/actions/AddTrackButton";
import { useState, useCallback } from "react";
import SearchOverlay from "./components/search/SearchOverlay";
import useChangePlaylistsDetails from "../../hooks/useChangePlaylistDetails";

const PlayListDetailPage = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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

  const { mutate: changeDetails } = useChangePlaylistsDetails(id!);

  const handleSubmitTitle = useCallback(
    (title: string) => {
      if (!playlist) return;

      const nextTitle = title.trim();
      if (!nextTitle || nextTitle === playlist.name) return;

      changeDetails({ name: nextTitle });
    },
    [playlist, changeDetails]
  );

  const isLoading = isPlaylistLoading || isPlaylistItemsLoading;
  const error = playlistError || playlistItemsError;

  const accessToken = localStorage.getItem("access_token");

  if (!accessToken) {
    return <AuthErrorFallback />;
  }

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" paddingTop="300px">
        <LoadingSpinner />
      </Box>
    );
  }

  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }

  if (!playlist || !playlistItems) {
    return <ErrorMessage errorMessage="Playlist not found" />;
  }

  const totalTracks = playlistItems.pages[0]?.total ?? 0;

  return (
    <Box display="flex" flexDirection="column" height="100vh" overflow="hidden">
      {isSearchOpen && <SearchOverlay onClose={() => setIsSearchOpen(false)} />}

      <PlaylistHeader playlist={playlist} onSubmitTitle={handleSubmitTitle} />
      <Box padding="10px 16px" display="flex" justifyContent="flex-end">
        <AddTrackButton onClick={() => setIsSearchOpen((prev) => !prev)} />
      </Box>
      <Box marginTop="10px" flex={1} minHeight={0} overflow="hidden">
        <Box
          height="100%"
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
          {totalTracks === 0 ? (
            <EmptyPlaylist />
          ) : (
            <PlaylistItemsContainer
              playlistItems={playlistItems}
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default PlayListDetailPage;
