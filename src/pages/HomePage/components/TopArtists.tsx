import { Box, Typography } from "@mui/material";
import CardGrid from "../../../common/MusicCard/CardGrid";
import ArtistCard from "../../../common/Artist/ArtistCard";
import type { Artist } from "../../../models/artist";
import ErrorMessage from "../../../common/components/ErrorMessage";

type Props = {
  artists: Artist[];
  error?: Error | null;
};

const TopArtists = ({ artists, error }: Props) => {
  if (error) {
    return <ErrorMessage errorMessage="Failed to load albums." />;
  }

  if (artists.length === 0) {
    return (
      <Typography color="rgba(255,255,255,0.5)" px={3} mt={2}>
        No artists available.
      </Typography>
    );
  }

  return (
    <div>
      <Box px={3} mb={6}>
        <Typography
          variant="h5"
          sx={{ fontWeight: 800, mb: 2, letterSpacing: "-0.02em" }}
        >
          Top Artists
        </Typography>

        <CardGrid>
          {artists.slice(0, 6).map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </CardGrid>
      </Box>
    </div>
  );
};

export default TopArtists;
