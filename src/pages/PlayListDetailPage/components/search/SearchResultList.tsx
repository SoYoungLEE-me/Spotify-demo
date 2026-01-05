import { Box } from "@mui/material";
import SearchResultItem from "./SearchResultItem";
import type { TrackObject } from "../../../../models/track";
interface SearchResultListProps {
  tracks: TrackObject[];
  fetchNextPage: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
}

const SearchResultList = ({
  tracks,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: SearchResultListProps) => {
  return (
    <Box display="flex" flexDirection="column" gap={1}>
      {tracks.map((track) => (
        <SearchResultItem key={track.id} track={track} />
      ))}

      {isFetchingNextPage && (
        <Box padding="12px" textAlign="center" color="rgba(255,255,255,0.4)">
          Load more...
        </Box>
      )}
      {hasNextPage && !isFetchingNextPage && (
        <Box
          padding="12px"
          textAlign="center"
          sx={{ cursor: "pointer", opacity: 0.6 }}
          onClick={fetchNextPage}
        >
          Show more
        </Box>
      )}
    </Box>
  );
};

export default SearchResultList;
