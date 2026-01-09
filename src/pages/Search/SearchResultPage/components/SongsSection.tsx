import { Box, Typography } from "@mui/material";
import type { TrackObject } from "../../../../models/track";
import SongRow from "../../../../common/TrackRow/SongRow";

type Props = {
  tracks: TrackObject[];
};

const SongsSection = ({ tracks }: Props) => {
  if (tracks.length === 0) return null;

  return (
    <Box px={3} mb={5}>
      <Typography
        variant="h5"
        sx={{ fontWeight: 800, mb: 2, letterSpacing: "-0.02em" }}
      >
        Songs
      </Typography>

      <Box display="flex" flexDirection="column" gap={0.5}>
        {tracks.slice(0, 5).map((track) => (
          <SongRow key={track.id} track={track} />
        ))}
      </Box>
    </Box>
  );
};

export default SongsSection;
