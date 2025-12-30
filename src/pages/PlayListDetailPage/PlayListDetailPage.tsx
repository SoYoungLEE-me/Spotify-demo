import { useParams } from "react-router";
import useGetPlaylist from "../../hooks/useGetPlaylist";
import LoadingSpinner from "../../common/components/LoadingSpinner";
import ErrorMessage from "../../common/components/ErrorMessage";
import PlaylistHeader from "./components/PlaylistHeader";

const PlayListDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useGetPlaylist({
    playlist_id: id!,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }

  console.log(data);

  if (!data) {
    return <ErrorMessage errorMessage="Playlist not found" />;
  }
  return (
    <div>
      <PlaylistHeader playlist={data} />
    </div>
  );
};

export default PlayListDetailPage;
