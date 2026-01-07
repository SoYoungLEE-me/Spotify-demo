import { Box, Typography } from "@mui/material";
import type { Artist } from "../../../../models/artist";
import ArtistCard from "../../../../common/Artist/ArtistCard";
import CardGrid from "../../../../common/MusicCard/CardGrid";

type Props = {
  artists: Artist[];
};

const ArtistsSection = ({ artists }: Props) => {
  if (artists.length === 0) return null;

  return (
    <Box px={3} mb={5} marginTop="20px">
      <Typography
        variant="h5"
        sx={{ fontWeight: 800, mb: 2, letterSpacing: "-0.02em" }}
      >
        Artists
      </Typography>

      <CardGrid>
        {artists.slice(0, 6).map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </CardGrid>
    </Box>
  );
};

export default ArtistsSection;
