import { Box } from "@mui/material";
import LoginButton from "../../common/components/LoginButton";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import ProfileMenu from "./ProfileMenu";

const Navbar = () => {
  const { data: userProfile } = useGetCurrentUserProfile();

  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      alignItems="center"
      height="60px"
      width="100%"
    >
      {userProfile ? <ProfileMenu /> : <LoginButton />}
    </Box>
  );
};

export default Navbar;
