import { Box, Typography } from "@mui/material";
import CardGrid from "../../../common/MusicCard/CardGrid";
import Card from "../../../common/MusicCard/Card";
import ErrorMessage from "../../../common/components/ErrorMessage";
import type { SimplifiedAlbum } from "../../../models/album";

type Props = {
  title: string;
  albums: SimplifiedAlbum[];
  error?: Error | null;
};

const TrendingAlbums = ({ title, albums, error }: Props) => {
  if (error) {
    return <ErrorMessage errorMessage="Failed to load albums." />;
  }

  if (albums.length === 0) {
    return (
      <Typography color="rgba(255,255,255,0.5)">
        No albums available.
      </Typography>
    );
  }

  return (
    <Box px={3} mb={6} marginTop="20px">
      <Typography variant="h2" paddingTop="10px" marginBottom="20px">
        {title}
      </Typography>

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
    </Box>
  );
};

export default TrendingAlbums;
