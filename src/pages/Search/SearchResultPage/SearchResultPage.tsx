import useSearchItems from "../../../hooks/useSearchItems";
import { SEARCH_TYPE } from "../../../models/search";
import { useSearchParams } from "react-router";
import LoadingSpinner from "../../../common/components/LoadingSpinner";
import { Box, Typography } from "@mui/material";
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

  const hasNoResults =
    tracks.length === 0 && artists.length === 0 && albums.length === 0;

  return (
    <div>
      <Grid container spacing={3} px={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <TopResult track={tracks[0]} artist={artists[0]} />
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <SongsSection tracks={tracks} />
        </Grid>
      </Grid>
      <ArtistsSection artists={artists} />
      <AlbumsSection albums={albums} />

      {hasNoResults && (
        <Box
          height="60vh"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
        >
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
            No results found
          </Typography>

          <Typography variant="body2" color="text.secondary">
            We couldn’t find anything for
          </Typography>

          <Typography variant="body2" sx={{ fontWeight: 600, mt: 0.5 }}>
            “{query}”
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default SearchResultPage;
