import NewReleases from "./components/NewReleases";
import useGetNewReleases from "../../hooks/useGetNewReleases";
import LoadingSpinner from "../../common/components/LoadingSpinner";
import { Box } from "@mui/material";
import type { TrackObject } from "../../models/track";
import TrendingTracks from "./components/TrendingTracks";
import useSearchItems from "../../hooks/useSearchItems";
import { SEARCH_TYPE } from "../../models/search";

const HomePage = () => {
  const {
    data: newAlbum,
    error: newAlbumError,
    isLoading: isNewAlbumLoading,
  } = useGetNewReleases();

  const currentYear = new Date().getFullYear();
  const lastYear = currentYear - 1;

  const dynamicYearQuery = `year:${lastYear}-${currentYear}`;

  const {
    data: TrendingData,
    error: TrendingError,
    isLoading: isTrendingLoading,
  } = useSearchItems({
    q: dynamicYearQuery,
    type: [SEARCH_TYPE.Track],
    market: "US",
    limit: 20,
  });

  const trendingTracks: TrackObject[] =
    TrendingData?.pages.flatMap((p) => p.tracks?.items ?? []) ?? [];

  const isLoading = isNewAlbumLoading || isTrendingLoading;

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" paddingTop="250px">
        <LoadingSpinner />
      </Box>
    );
  }

  return (
    <>
      <TrendingTracks tracks={trendingTracks} error={TrendingError} />
      <NewReleases data={newAlbum} error={newAlbumError} />
    </>
  );
};

export default HomePage;
