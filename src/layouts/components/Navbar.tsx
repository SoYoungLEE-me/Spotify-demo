import { Box } from "@mui/material";
import LoginButton from "../../common/components/LoginButton";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import Profile from "./Profile";
const Navbar = () => {
  const { data: userProfile } = useGetCurrentUserProfile();

  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      alignItems="center"
      height="64px"
      width="100%"
    >
      {userProfile ? <Profile /> : <LoginButton />}
    </Box>
  );
};

export default Navbar;
