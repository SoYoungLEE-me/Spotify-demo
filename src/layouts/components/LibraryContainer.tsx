import LibraryHead from "./LibraryHead";
import Library from "./Library";
import EmptyPlayList from "./EmptyPlayList";
import useCreatePlaylist from "../../hooks/useCreatePlaylist";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import { getSpotifyAuthUrl } from "../../utils/auth";

const LibraryContainer = () => {
  const { mutate: createPlaylist } = useCreatePlaylist();
  const { data: userProfile } = useGetCurrentUserProfile();

  const handleCreatePlaylist = () => {
    if (userProfile) {
      createPlaylist({ name: "나의 플레이 리스트" });
    } else {
      getSpotifyAuthUrl();
    }
  };

  return (
    <>
      <LibraryHead onCreatePlaylist={handleCreatePlaylist} />
      <Library
        renderEmpty={() => (
          <EmptyPlayList onCreatePlaylist={handleCreatePlaylist} />
        )}
      />
    </>
  );
};

export default LibraryContainer;
