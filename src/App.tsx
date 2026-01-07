import React, { useEffect } from "react";
import { Suspense } from "react";
import "./App.css";
import { Routes, Route } from "react-router";
import { Box, Typography } from "@mui/material";
const AppLayout = React.lazy(() => import("./layouts/AppLayout"));
const HomePage = React.lazy(() => import("./pages/HomePage/HomePage"));
const SearchPage = React.lazy(
  () => import("./pages/Search/SearchPage/SearchPage")
);

const PlayListDetailPage = React.lazy(
  () => import("./pages/PlayListDetailPage/PlayListDetailPage")
);
const PlayListPage = React.lazy(
  () => import("./pages/PlayListPage/PlayListPage")
);

import useExchangeToken from "./hooks/useExchangeToken";
const SearchLayout = React.lazy(() => import("./pages/Search/SearchLayout"));
//lazy-loading
// 일반적으로 모든 코드를 한 번에 로드하지 않고,
// 사용자가 필요한 시점에 해당 코드만 "지연해서(lazy) 로드" 하는 것

//sideBar
//1. HomePage /
//2. searchPage /search
//3.SearchResultPage /search/:id
//4. PlayListDetailPage /playlist/:id
//5.모바일 버전(PlayListPage) /playlist

function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  const codeVerifier = localStorage.getItem("code_verifier");
  const { mutate: exchangeToken } = useExchangeToken();

  useEffect(() => {
    if (code && codeVerifier) {
      exchangeToken({ code, codeVerifier });
    }
  }, [code, codeVerifier, exchangeToken]);

  return (
    <div>
      <Suspense
        fallback={
          <Box
            height="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography
              fontSize="1.4rem"
              fontWeight={700}
              color="white"
              sx={{ letterSpacing: "-0.02em" }}
            >
              YourMusic
            </Typography>
          </Box>
        }
      >
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/callback" element={<HomePage />} />
            <Route path="/search" element={<SearchLayout />}>
              <Route index element={<SearchPage />} />
            </Route>
            <Route path="/playlist/:id" element={<PlayListDetailPage />} />
            <Route path="/playlist" element={<PlayListPage />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
