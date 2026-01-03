import { styled, Typography, Box, Button } from "@mui/material";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import AddIcon from "@mui/icons-material/Add";
import useCreatePlaylist from "../../hooks/useCreatePlaylist";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import { getSpotifyAuthUrl } from "../../utils/auth";

const Head = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "16px",
  color: theme.palette.text.primary,
}));

const HeadIcon = styled(LibraryMusicIcon)(({ theme }) => ({
  transition: "color 0.2s ease",
  color: theme.palette.text.secondary,

  ".head:hover &": {
    color: theme.palette.action.active,
  },
}));

const LibraryHead = () => {
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
    <Head>
      <Box display="flex" gap="12px" alignItems="center" className="head">
        <HeadIcon />
        <Typography fontWeight={700}>Your Library</Typography>
      </Box>
      <Button size="small">
        <AddIcon onClick={handleCreatePlaylist} />
      </Button>
    </Head>
  );
};

export default LibraryHead;
