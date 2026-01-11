import {
  Box,
  CircularProgress,
  Button,
  Typography,
  styled,
} from "@mui/material";
import PlaylistItem from "./components/PlaylistItem";
import useGetCurrentUserPlaylists from "../../hooks/useGetCurrentUserPlaylists";
import EmptyPlayList from "./components/EmptyPlaylist";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import AddIcon from "@mui/icons-material/Add";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import useCreatePlaylist from "../../hooks/useCreatePlaylist";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import { getSpotifyAuthUrl } from "../../utils/auth";

const HeadIcon = styled(LibraryMusicIcon)(({ theme }) => ({
  transition: "color 0.2s ease",
  color: theme.palette.text.secondary,

  ".head:hover &": {
    color: theme.palette.action.active,
  },
}));

const PlayListPage = () => {
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState<string | null>(null);

  const { ref, inView } = useInView({
    threshold: 0,
  });
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGetCurrentUserPlaylists({
      limit: 10,
    });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const playlists = data?.pages.flatMap((page) => page.items) ?? [];

  const { mutate: createPlaylist } = useCreatePlaylist();
  const { data: userProfile } = useGetCurrentUserProfile();

  const handleCreatePlaylist = () => {
    if (userProfile) {
      createPlaylist({ name: "나의 플레이 리스트" });
    } else {
      getSpotifyAuthUrl();
    }
  };

  if (!data || playlists.length === 0) {
    return <EmptyPlayList onCreatePlaylist={handleCreatePlaylist} />;
  }

  const handleClick = (id: string) => {
    setActiveId(id);
    navigate(`/playlist/${id}`);
  };

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px={2}
        py={1}
        mt={3}
      >
        <Box display="flex" gap="12px" alignItems="center" className="head">
          <HeadIcon />
          <Typography variant="h6" fontWeight={700}>
            Your Library
          </Typography>
        </Box>
        <Button
          variant="text"
          startIcon={<AddIcon />}
          onClick={handleCreatePlaylist}
          sx={{
            fontWeight: 700,
            textTransform: "none",
            padding: "5px 12px",
          }}
        >
          Create
        </Button>
      </Box>
      <Box
        flex={1}
        overflow="auto"
        p={2}
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(150px, 1fr))"
        gap={2}
        sx={{
          overflowY: "auto",

          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {playlists.map((playlist) => (
          <PlaylistItem
            key={playlist.id}
            playlist={playlist}
            isActive={playlist.id === activeId}
            onClick={handleClick}
          />
        ))}

        {hasNextPage && (
          <Box
            ref={ref}
            gridColumn="1 / -1"
            display="flex"
            justifyContent="center"
            py={4}
          >
            <CircularProgress size={24} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PlayListPage;
