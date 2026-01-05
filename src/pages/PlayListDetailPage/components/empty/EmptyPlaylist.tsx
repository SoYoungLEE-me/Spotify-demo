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
      <Typography fontWeight={600}>
        아직 이 플레이리스트에 곡이 없어요
      </Typography>
      <Typography variant="body2">검색해서 곡을 추가해보세요</Typography>
    </Box>
  );
};

export default EmptyPlaylist;
