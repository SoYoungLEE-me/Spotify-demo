import { Box, Typography, Chip } from "@mui/material";
import type { TrackObject } from "../../../../models/track";
import type { Artist } from "../../../../models/artist";
import ArtistAvatar from "../../../../common/Artist/ArtistAvatar";
import PlayButton from "../../../../common/MusicCard/PlayButton";

type Props = {
  track?: TrackObject;
  artist?: Artist;
};

const TopResult = ({ track, artist }: Props) => {
  if (!track && !artist) return null;

  const imageUrl = track
    ? track.album?.images?.[0]?.url
    : artist?.images?.[0]?.url;

  const title = track?.name ?? artist?.name ?? "Unknown";
  const subtitle = track
    ? track.artists?.[0]?.name ?? "Unknown Artist"
    : "Artist";

  return (
    <Box px={3} mb={5}>
      <Typography
        variant="h5"
        sx={{ fontWeight: 800, mb: 2, letterSpacing: "-0.02em" }}
      >
        Top result
      </Typography>

      <Box
        sx={{
          position: "relative",
          borderRadius: "12px",
          padding: "24px",
          maxWidth: 360,
          cursor: "pointer",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
          transition: "all 0.3s ease",
          "&:hover": {
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.14), rgba(255,255,255,0.04))",
            "& .play-button": {
              opacity: 1,
              transform: "translateY(0)",
            },
          },
        }}
      >
        <Chip
          label="Top result"
          size="small"
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            backgroundColor: "rgba(244,63,94,0.25)",
            color: "#FFD1D1",
            fontSize: "0.65rem",
            fontWeight: 700,
          }}
        />

        <Box mb={3} sx={{ width: "fit-content" }}>
          {imageUrl ? (
            <Box
              component="img"
              src={imageUrl}
              alt={title}
              sx={{
                width: 120,
                height: 120,
                objectFit: "cover",
                borderRadius: track ? "8px" : "50%",
                boxShadow: "0 12px 32px rgba(0,0,0,0.6)",
              }}
            />
          ) : (
            <ArtistAvatar size={120} />
          )}
        </Box>

        <Typography
          variant="subtitle2"
          sx={{
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            fontWeight: 700,
            color: "text.secondary",
            mb: 0.5,
          }}
        >
          {track ? "Song" : "Artist"}
        </Typography>

        <Typography
          variant="h4"
          sx={{
            fontWeight: 900,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            mb: 1,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="body2"
          sx={{ color: "rgba(255,255,255,0.7)", fontWeight: 500 }}
        >
          {subtitle}
        </Typography>

        <Box
          className="play-button"
          sx={{
            position: "absolute",
            right: 24,
            bottom: 24,
            opacity: 0,
            transform: "translateY(10px)",
            transition: "all 0.3s ease",
          }}
        >
          <PlayButton />
        </Box>
      </Box>
    </Box>
  );
};

export default TopResult;
