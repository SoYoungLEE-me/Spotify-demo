import { Button } from "@mui/material";
import { getSpotifyAuthUrl } from "../../utils/auth";

const LoginButton = () => {
  const login = () => {
    console.log("login clicked");
    getSpotifyAuthUrl();
  };
  return (
    <Button variant="outlined" color="secondary" size="large" onClick={login}>
      Login
    </Button>
  );
};

export default LoginButton;
