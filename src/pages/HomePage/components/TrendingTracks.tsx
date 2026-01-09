import {
  Typography,
  Grid,
  Box,
  useMediaQuery,
  Button,
  Stack,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ErrorMessage from "../../../common/components/ErrorMessage";
import type { TrackObject } from "../../../models/track";
import SongRow from "../../../common/TrackRow/SongRow";

type Props = {
  tracks: TrackObject[];
  error?: Error | null;
  currentMarket: string;
  onMarketChange: (market: string) => void;
};

const TrendingTracks = ({
  tracks,
  error,
  currentMarket,
  onMarketChange,
}: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const markets = [
    { code: "US", label: "Global" },
    { code: "KR", label: "Korea" },
    { code: "JP", label: "Japan" },
    { code: "GB", label: "UK" },
  ];

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
    <Box mb={8}>
      <Typography variant="h2" mb={3.5}>
        Trending Tracks
      </Typography>

      <Stack direction="row" spacing={1} mb={3}>
        {markets.map((m) => (
          <Button
            key={m.code}
            variant={currentMarket === m.code ? "contained" : "outlined"}
            onClick={() => onMarketChange(m.code)}
            size="small"
            sx={{
              borderRadius: "20px",
              color: currentMarket === m.code ? "black" : "white",
              backgroundColor:
                currentMarket === m.code ? "white" : "transparent",
              borderColor: "rgba(255,255,255,0.5)",
              "&:hover": {
                borderColor: "white",
                backgroundColor:
                  currentMarket === m.code ? "white" : "rgba(255,255,255,0.1)",
              },
            }}
          >
            {m.label}
          </Button>
        ))}
      </Stack>

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
