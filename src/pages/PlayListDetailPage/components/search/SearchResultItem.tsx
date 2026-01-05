import { Box, Button, Typography } from "@mui/material";

type Track = {
  id: string;
  name: string;
  artist: string;
  albumUrl?: string;
};

const SearchResultItem = ({ track }: { track: Track }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      padding="8px 12px"
      borderRadius="6px"
      sx={{
        transition: "background-color 0.2s",
        "&:hover": {
          backgroundColor: "rgba(255,255,255,0.05)",
          "& .add-btn": {
            borderColor: "white",
            color: "white",
          },
        },
        cursor: "default",
      }}
    >
      <Box display="flex" alignItems="center" gap={2} minWidth={0} flex={1}>
        <Box
          width={48}
          height={48}
          flexShrink={0}
          borderRadius="4px"
          bgcolor="#333"
          overflow="hidden"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="caption" color="rgba(255,255,255,0.3)">
            IMG
          </Typography>
        </Box>

        <Box minWidth={0} display="flex" flexDirection="column">
          <Typography
            fontWeight={600}
            noWrap
            sx={{ color: "white", fontSize: "1rem" }}
          >
            {track.name}
          </Typography>
          <Typography
            variant="body2"
            noWrap
            sx={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}
          >
            {track.artist}
          </Typography>
        </Box>
      </Box>

      <Button size="small">Add</Button>
    </Box>
  );
};

export default SearchResultItem;
