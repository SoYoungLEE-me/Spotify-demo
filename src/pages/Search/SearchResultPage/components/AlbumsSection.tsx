import { Box, Typography } from "@mui/material";
import type { SimplifiedAlbum } from "../../../../models/album";
import CardGrid from "../../../../common/MusicCard/CardGrid";
import Card from "../../../../common/MusicCard/Card";

type Props = {
  albums: SimplifiedAlbum[];
};

const AlbumsSection = ({ albums }: Props) => {
  if (albums.length === 0) return null;

  return (
    <Box px={3} mb={6} marginTop="20px">
      <Typography
        variant="h5"
        sx={{ fontWeight: 800, mb: 2, letterSpacing: "-0.02em" }}
      >
        Albums
      </Typography>

      <CardGrid>
        {albums.slice(0, 6).map((album) => (
          <Card
            key={album.id}
            image={album.images?.[0]?.url}
            name={album.name}
            artistName={album.artists.map((a) => a.name).join(", ")}
          />
        ))}
      </CardGrid>
    </Box>
  );
};

export default AlbumsSection;
