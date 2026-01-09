import NewReleases from "./components/NewReleases";
import useGetNewReleases from "../../hooks/useGetNewReleases";
import LoadingSpinner from "../../common/components/LoadingSpinner";
import { Box } from "@mui/material";
import type { TrackObject } from "../../models/track";
import TrendingTracks from "./components/TrendingTracks";
import useSearchItems from "../../hooks/useSearchItems";
import { SEARCH_TYPE } from "../../models/search";
import type { SimplifiedAlbum } from "../../models/album";
import TrendingAlbums from "./components/TrendingAlbums";
import { useState } from "react";
import TopArtists from "./components/TopArtists";
import type { Artist } from "../../models/artist";

const HomePage = () => {
  const [market, setMarket] = useState("US");

  const {
    data: newAlbum,
    error: newAlbumError,
    isLoading: isNewAlbumLoading,
  } = useGetNewReleases();

  const currentYear = new Date().getFullYear();
  const lastYear = currentYear - 1;

  const dynamicYearQuery = `year:${lastYear}-${currentYear}`;

  const {
    data: TrendingTrackData,
    error: TrendingTrackError,
    isLoading: isTrendingTrackLoading,
  } = useSearchItems({
    q: dynamicYearQuery,
    type: [SEARCH_TYPE.Track],
    market: market,
    limit: 20,
  });

  const {
    data: KPopTrendingData,
    error: KPopError,
    isLoading: isKPopLoading,
  } = useSearchItems({
    q: dynamicYearQuery,
    type: [SEARCH_TYPE.Album],
    market: "KR",
    limit: 10,
  });

  const {
    data: GlobalPopTrendingData,
    error: GlobalPopError,
    isLoading: isKGlobalPopLoading,
  } = useSearchItems({
    q: dynamicYearQuery,
    type: [SEARCH_TYPE.Album],
    market: "US",
    limit: 10,
  });

  const {
    data: TopArtistsData,
    error: TopArtistsError,
    isLoading: isTopArtistsLoading,
  } = useSearchItems({
    q: "genre:pop",
    type: [SEARCH_TYPE.Artist],
    limit: 10,
  });

  const Top_Artists: Artist[] =
    TopArtistsData?.pages.flatMap((p) => p.artists?.items ?? []) ?? [];

  const GlobalPopAlbums: SimplifiedAlbum[] =
    GlobalPopTrendingData?.pages.flatMap((p) => p.albums?.items ?? []) ?? [];

  const KPopTrendingAlbums: SimplifiedAlbum[] =
    KPopTrendingData?.pages.flatMap((p) => p.albums?.items ?? []) ?? [];

  const trendingTracks: TrackObject[] =
    TrendingTrackData?.pages.flatMap((p) => p.tracks?.items ?? []) ?? [];

  const isLoading =
    isNewAlbumLoading ||
    isTrendingTrackLoading ||
    isKPopLoading ||
    isKGlobalPopLoading ||
    isTopArtistsLoading;

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" paddingTop="250px">
        <LoadingSpinner />
      </Box>
    );
  }

  return (
    <>
      <TrendingTracks
        tracks={trendingTracks}
        error={TrendingTrackError}
        currentMarket={market}
        onMarketChange={setMarket}
      />
      <TopArtists artists={Top_Artists} error={TopArtistsError} />
      <NewReleases data={newAlbum} error={newAlbumError} />
      <TrendingAlbums
        title="Global Trending Albums"
        albums={GlobalPopAlbums}
        error={GlobalPopError}
      />
      <TrendingAlbums
        title="Korean Trending Albums"
        albums={KPopTrendingAlbums}
        error={KPopError}
      />
    </>
  );
};

export default HomePage;
