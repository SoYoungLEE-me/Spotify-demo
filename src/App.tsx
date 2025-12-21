import React from "react";
import { Suspense } from "react";
import "./App.css";
import { Routes, Route } from "react-router";
import LoadingSpinner from "./common/components/LoadingSpinner";
const AppLayout = React.lazy(() => import("./layouts/AppLayout"));
const HomePage = React.lazy(() => import("./pages/HomePage/HomePage"));
const SearchPage = React.lazy(() => import("./pages/SearchPage/SearchPage"));
const SearchResultPage = React.lazy(
  () => import("./pages/SearchResultPage/SearchResultPage")
);
const PlayListDetailPage = React.lazy(
  () => import("./pages/PlayListDetailPage/PlayListDetailPage")
);
const PlayListPage = React.lazy(
  () => import("./pages/PlayListPage/PlayListPage")
);

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
  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/search/:keyword" element={<SearchResultPage />} />
            <Route path="/playlist/:id" element={<PlayListDetailPage />} />
            <Route path="/playlist" element={<PlayListPage />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
