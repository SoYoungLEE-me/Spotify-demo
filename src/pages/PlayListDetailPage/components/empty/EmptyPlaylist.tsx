// components/EmptyPlaylist.tsx
import { Box, Typography } from "@mui/material";

const EmptyPlaylist = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
      color="text.secondary"
    >
      <Typography fontWeight={700}>
        There are no songs in this playlist yet
      </Typography>
      <Typography variant="body2" marginTop="10px">
        Search for songs to add to your playlist
      </Typography>
    </Box>
  );
};

export default EmptyPlaylist;
