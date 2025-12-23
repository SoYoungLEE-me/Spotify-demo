import { Box } from "@mui/material";
import LoginButton from "../../common/components/LoginButton";

const Navbar = () => {
  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      alignItems="center"
      height="64px"
      width="100%"
    >
      <LoginButton />
    </Box>
  );
};

export default Navbar;
