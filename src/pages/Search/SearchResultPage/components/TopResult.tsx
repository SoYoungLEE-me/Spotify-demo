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

  let imageUrl: string | undefined;
  let title: string;
  let typeLabel: string;
  let secondaryText: string;

  if (track) {
    imageUrl = track.album?.images?.[0]?.url;
    title = track.name ?? "Unknown Title";
    typeLabel = "Song";
    secondaryText = track.artists?.[0]?.name ?? "Unknown Artist";
  } else {
    imageUrl = artist?.images?.[0]?.url;
    title = artist?.name ?? "Unknown Artist";
    typeLabel = "Artist";
    secondaryText = "Artist";
  }

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
          backgroundColor: "#181818",
          borderRadius: "12px",
          padding: "24px",
          maxWidth: 360,
          cursor: "pointer",
          transition: "all 0.3s ease",
          "&:hover": {
            color: "primary.main",
            backgroundColor: "rgba(255,255,255,0.08)",
            "& .play-button": {
              opacity: 1,
              transform: "translateY(0)",
            },
          },
        }}
      >
        <Box mb={3} sx={{ position: "relative" }}>
          {imageUrl ? (
            <Box
              component="img"
              src={imageUrl}
              alt={title}
              sx={{
                width: 100,
                height: 100,
                objectFit: "cover",
                borderRadius: track ? "8px" : "50%",
                boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
              }}
            />
          ) : (
            <ArtistAvatar size={100} />
          )}
        </Box>

        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            fontSize: "2rem",
            mb: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Chip
            label={typeLabel}
            size="small"
            sx={{
              backgroundColor: "#000",
              color: "#fff",
              fontWeight: 700,
              fontSize: "0.7rem",
            }}
          />
          <Typography
            variant="body2"
            sx={{ color: "rgba(255,255,255,0.7)", fontWeight: 500 }}
          >
            {secondaryText}
          </Typography>
        </Box>
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
