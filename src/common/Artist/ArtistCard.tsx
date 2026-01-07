import { Box, Typography } from "@mui/material";
import type { Artist } from "../../models/artist";
import ArtistAvatar from "./ArtistAvatar";

type Props = {
  artist: Artist;
  onClick?: () => void;
};

const ArtistCard = ({ artist, onClick }: Props) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
        cursor: onClick ? "pointer" : "default",
        padding: "12px",
        borderRadius: "12px",
        transition: "background-color 0.2s ease, transform 0.2s ease",

        "&:hover": onClick
          ? {
              backgroundColor: "rgba(255,255,255,0.06)",
              transform: "translateY(-2px)",
            }
          : undefined,

        "&:hover .artist-avatar": {
          transform: "scale(1.05)",
        },
      }}
    >
      <Box
        className="artist-avatar"
        sx={{
          transition: "transform 0.2s ease",
        }}
      >
        <ArtistAvatar imageUrl={artist.images?.[0]?.url} size={160} />
      </Box>

      <Typography
        className="artist-name"
        fontWeight={600}
        noWrap
        maxWidth={160}
      >
        {artist.name}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        Artist
      </Typography>
    </Box>
  );
};

export default ArtistCard;
