import { Box, Typography } from "@mui/material";
import CardGrid from "../../../common/MusicCard/CardGrid";
import Card from "../../../common/MusicCard/Card";
import type { GetNewReleasesResponse } from "../../../models/album";
import ErrorMessage from "../../../common/components/ErrorMessage";

type Props = {
  data?: GetNewReleasesResponse;
  error?: Error | null;
};

const NewReleases = ({ data, error }: Props) => {
  if (error) {
    return <ErrorMessage errorMessage="Failed to load new releases." />;
  }

  const albums = data?.albums.items ?? [];

  if (albums.length === 0) {
    return (
      <Typography color="rgba(255,255,255,0.5)">
        No new releases available.
      </Typography>
    );
  }

  return (
    <Box px={3} mb={6}>
      <Typography variant="h2" paddingTop="10px" marginBottom="20px">
        New Released Albums
      </Typography>

      {albums.length > 0 ? (
        <CardGrid>
          {albums.slice(0, 6).map((album) => (
            <Card
              key={album.id}
              image={album.images[0]?.url}
              name={album.name}
              artistName={album.artists.map((a) => a.name).join(", ")}
            />
          ))}
        </CardGrid>
      ) : (
        <Typography>No albums found</Typography>
      )}
    </Box>
  );
};

export default NewReleases;
