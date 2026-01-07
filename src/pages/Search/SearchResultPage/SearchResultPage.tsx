import useSearchItems from "../../../hooks/useSearchItems";
import { SEARCH_TYPE } from "../../../models/search";
import { useSearchParams } from "react-router";
import LoadingSpinner from "../../../common/components/LoadingSpinner";
import { Box } from "@mui/material";
import ArtistsSection from "./components/ArtistsSection";
import TopResult from "./components/TopResult";
import SongsSection from "./components/SongsSection";
import { Grid } from "@mui/material";
import AlbumsSection from "./components/AlbumsSection";

const SearchResultPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";

  const { data, isLoading } = useSearchItems({
    q: query,
    type: [SEARCH_TYPE.Track, SEARCH_TYPE.Artist, SEARCH_TYPE.Album],
  });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" paddingTop="250px">
        <LoadingSpinner />
      </Box>
    );
  }

  const page = data?.pages[0];

  const tracks = page?.tracks?.items ?? [];
  const artists = page?.artists?.items ?? [];
  const albums = page?.albums?.items ?? [];

  return (
    <div>
      <Grid container spacing={3} px={3}>
        {/* Top Result */}
        <Grid size={{ xs: 12, md: 4 }}>
          <TopResult track={tracks[0]} artist={artists[0]} />
        </Grid>

        {/* Songs */}
        <Grid size={{ xs: 12, md: 8 }}>
          <SongsSection tracks={tracks} />
        </Grid>
      </Grid>
      <ArtistsSection artists={artists} />
      <AlbumsSection albums={albums} />
    </div>
  );
};

export default SearchResultPage;
