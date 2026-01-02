import { useParams } from "react-router";
import useGetPlaylist from "../../hooks/useGetPlaylist";
import useGetPlaylistItems from "../../hooks/useGetPlaylistItems";
import LoadingSpinner from "../../common/components/LoadingSpinner";
import ErrorMessage from "../../common/components/ErrorMessage";
import PlaylistHeader from "./components/PlaylistHeader";
import PlaylistItemsContainer from "./components/PlaylistItemsContainer";
import { PAGE_LIMIT } from "../../configs/commonConfig";

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
  } = useGetPlaylistItems({
    playlist_id: id!,
    limit: PAGE_LIMIT,
  });

  const isLoading = isPlaylistLoading || isPlaylistItemsLoading;

  const error = playlistError || playlistItemsError;

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
    <div>
      <PlaylistHeader playlist={playlist} />
      <PlaylistItemsContainer playlistItems={playlistItems} />
    </div>
  );
};

export default PlayListDetailPage;
