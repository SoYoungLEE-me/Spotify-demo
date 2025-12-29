import { Outlet } from "react-router";
import { styled, Box, Typography } from "@mui/material";
import { NavLink } from "react-router";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LibraryHead from "./components/LibraryHead";
import Library from "./components/Library";
import Navbar from "./components/Navbar";

const Layout = styled("div")({
  display: "flex",
  height: "100vh",
  padding: "10px",
  gap: "12px",
});

const Sidebar = styled("div")(({ theme }) => ({
  width: "270px",
  minHeight: 0,
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  borderRadius: "8px",
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  width: "100%",
}));

const NavList = styled("ul")({
  listStyle: "none",
  padding: "16px",
  margin: 0,
  marginTop: "20px",
});

const BaseNavIcon = {
  fontSize: 22,
  transition: "color 0.2s ease",
};

const StyledHomeIcon = styled(HomeIcon)(({ theme }) => ({
  ...BaseNavIcon,
  color: theme.palette.text.secondary,

  ".nav-link:hover &": {
    color: theme.palette.text.primary,
  },

  ".nav-link.active &": {
    color: theme.palette.action.active,
  },
}));

const StyledSearchIcon = styled(SearchIcon)(({ theme }) => ({
  ...BaseNavIcon,
  color: theme.palette.text.secondary,

  ".nav-link:hover &": {
    color: theme.palette.text.primary,
  },

  ".nav-link.active &": {
    color: theme.palette.action.active,
  },
}));

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  gap: "15px",
  marginBottom: "17px",
  color: theme.palette.text.secondary,
  "&:hover": {
    color: theme.palette.text.primary,
  },
  "&.active": {
    color: theme.palette.text.primary,
  },
}));

const AppLayout = () => {
  return (
    <Layout>
      <Sidebar>
        <ContentBox>
          <NavList>
            <StyledNavLink to="/" className="nav-link">
              <StyledHomeIcon />
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: 700,
                  lineHeight: 1,
                }}
              >
                Home
              </Typography>
            </StyledNavLink>

            <StyledNavLink to="/search" className="nav-link">
              <StyledSearchIcon />
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: 700,
                  lineHeight: 1,
                }}
              >
                Search
              </Typography>
            </StyledNavLink>
          </NavList>
        </ContentBox>

        <ContentBox
          sx={{
            flex: 1,
            marginTop: "8px",
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
          }}
        >
          <LibraryHead />
          <Library />
        </ContentBox>
      </Sidebar>

      <ContentBox padding="20px">
        <Navbar />
        <main>
          <Outlet />
        </main>
      </ContentBox>
    </Layout>
  );
};

export default AppLayout;

//sidebar에서 주의점:
//flex 레이아웃에서 자식은 min-height: auto면 내용만큼 늘아게 됨. overflow가 안 생김
//그래서 height를 위에서 고정하고 min-height: 0; 이렇게 해줘야 크기가 고정되고 overflow가 생겨 스크롤이 생길 수 있음
