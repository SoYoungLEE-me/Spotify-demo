import { Typography, Grid, Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ErrorMessage from "../../../common/components/ErrorMessage";
import type { TrackObject } from "../../../models/track";
import SongRow from "../../../common/TrackRow/SongRow";

type Props = {
  tracks: TrackObject[];
  error?: Error | null;
};

const TrendingTracks = ({ tracks, error }: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (error) {
    return <ErrorMessage errorMessage="Failed to load trending tracks." />;
  }

  if (tracks.length === 0) {
    return (
      <Typography color="rgba(255,255,255,0.5)">
        No trending tracks available.
      </Typography>
    );
  }

  // 모바일: 5개 / 데스크톱: 10개
  const visibleTracks = isMobile ? tracks.slice(0, 5) : tracks.slice(0, 10);

  // 데스크톱에서만 좌우 분할
  const leftTracks = visibleTracks.slice(0, 5);
  const rightTracks = visibleTracks.slice(5, 10);

  return (
    <Box mb={6}>
      <Typography variant="h2" mb={3}>
        Trending Tracks
      </Typography>

      <Grid container spacing={2}>
        {/* Left column */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box display="flex" flexDirection="column" gap={0.5}>
            {leftTracks.map((track) => (
              <SongRow key={track.id} track={track} />
            ))}
          </Box>
        </Grid>

        {/* Right column (md 이상에서만 표시) */}
        {!isMobile && (
          <Grid size={{ xs: 12, md: 6 }}>
            <Box display="flex" flexDirection="column" gap={0.5}>
              {rightTracks.map((track) => (
                <SongRow key={track.id} track={track} />
              ))}
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default TrendingTracks;
