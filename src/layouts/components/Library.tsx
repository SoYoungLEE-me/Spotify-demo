import EmptyPlayList from "./EmptyPlayList";
import LibraryPlaylist from "./LibraryPlaylist";
import useGetCurrentUserPlaylists from "../../hooks/useGetCurrentUserPlaylists";

const Library = () => {
  const { data } = useGetCurrentUserPlaylists({ limit: 10, offset: 0 });

  if (!data || data.items.length === 0) {
    return <EmptyPlayList />;
  }

  return (
    <div>
      {data.items.map((playlist) => (
        <LibraryPlaylist key={playlist.id} playlist={playlist} />
      ))}
    </div>
  );
};

export default Library;
