import {
  Paper,
  BottomNavigation,
  BottomNavigationAction,
  styled,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import { useLocation, useNavigate } from "react-router";

const StyledBottomNav = styled(BottomNavigation)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.divider}`,
  height: "65px",
  "& .MuiBottomNavigationAction-root": {
    color: theme.palette.text.secondary,
  },
  "& .Mui-selected": {
    color: theme.palette.primary.main,
    "& .MuiBottomNavigationAction-label": {
      fontWeight: 700,
    },
  },
}));

const MobileNav = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const getValue = () => {
    if (pathname === "/") return 0;
    if (pathname === "/search") return 1;
    if (pathname.startsWith("/playlist")) return 2;
    return 0;
  };

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: { xs: "block", sm: "none" },
      }}
      elevation={3}
    >
      <StyledBottomNav
        showLabels
        value={getValue()}
        onChange={(_, newValue) => {
          if (newValue === 0) navigate("/");
          if (newValue === 1) navigate("/search");
          if (newValue === 2) navigate("/playlist");
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Search" icon={<SearchIcon />} />
        <BottomNavigationAction label="Playlist" icon={<LibraryMusicIcon />} />
      </StyledBottomNav>
    </Paper>
  );
};

export default MobileNav;
