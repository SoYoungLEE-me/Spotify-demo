import { Box, Typography, Button } from "@mui/material";
import { getSpotifyAuthUrl } from "../../utils/auth";

const AuthErrorFallback = () => {
  const handleLogin = () => {
    localStorage.clear();
    getSpotifyAuthUrl();
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
      gap={2}
    >
      <Typography variant="h6" fontWeight={600}>
        다시 로그인해주세요
      </Typography>

      <Button variant="contained" onClick={handleLogin}>
        Spotify로 로그인
      </Button>
    </Box>
  );
};

export default AuthErrorFallback;
