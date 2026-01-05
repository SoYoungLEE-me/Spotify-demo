import { Outlet, useLocation } from "react-router";
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
  boxSizing: "border-box",
  overflow: "hidden",
});

const Sidebar = styled("div")(({ theme }) => ({
  width: "250px",
  display: "flex",
  flexShrink: 0,
  flexGrow: 0,
  flexDirection: "column",
  height: "100%",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const MainContainer = styled(Box)(({ theme }) => ({
  borderRadius: "8px",
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  flex: 1,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  minWidth: 0,
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
  const location = useLocation();

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

      <MainContainer padding="20px">
        <Navbar />

        <Box
          component="main"
          sx={{
            flex: 1,
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Outlet key={location.pathname} />
        </Box>
      </MainContainer>
    </Layout>
  );
};

export default AppLayout;

/*
  sidebar에서 주의점:
  flex 레이아웃에서 자식은 min-height: auto면 내용만큼 늘아게 됨. overflow가 안 생김
  그래서 height를 위에서 고정하고 min-height: 0; 이렇게 해줘야 크기가 고정되고 overflow가 생겨 스크롤이 생길 수 있음
*/

/*
  1. location.pathname 이란?
  - 현재 브라우저 주소창의 '경로(path)' 부분을 의미한다.
  - 예) http://localhost:3000/playlist/1
        → location.pathname === "/playlist/1"

  2. 문제 상황 (기본 동작)
  - React는 성능 최적화를 위해
    "라우트 파라미터만 바뀌고, 컴포넌트 타입이 같으면"
    기존 컴포넌트를 재사용한다.
  - 따라서 /playlist/1 → /playlist/2 로 이동해도
    PlayListDetailPage 컴포넌트는 언마운트되지 않고,
    내부 useState 값(검색 오버레이 열림 등)이 그대로 유지된다.

  3. 해결 원리 (key를 이용한 수명 제어)
  - React는 엘리먼트의 key 값이 변경되면
    "이건 완전히 다른 컴포넌트"라고 판단한다.
  - 기존 컴포넌트를 파괴(unmount)하고,
    새 컴포넌트를 다시 생성(remount)한다.

  4. 결과
  - key={location.pathname} 을 사용하면
    주소(path)가 바뀔 때마다 key 값도 함께 변경된다.
  - 그 결과 PlayListDetailPage가 강제로 remount 되고,
    모든 로컬 상태(useState)가 깨끗하게 초기화된다.
  - 이를 통해 플레이리스트 이동 시
    검색 오버레이가 자동으로 닫히는 문제를 해결할 수 있다.
*/
