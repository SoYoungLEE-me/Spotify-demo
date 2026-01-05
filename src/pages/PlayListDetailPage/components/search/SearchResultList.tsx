import { Box } from "@mui/material";
import SearchResultItem from "./SearchResultItem";

const dummyTracks = [
  {
    id: "1",
    name: "Attention",
    artist: "NewJeans",
  },
  {
    id: "2",
    name: "Super Shy",
    artist: "NewJeans",
  },
  {
    id: "3",
    name: "OMG",
    artist: "NewJeans",
  },
];

const SearchResultList = () => {
  return (
    <Box display="flex" flexDirection="column" gap={1}>
      {dummyTracks.map((track) => (
        <SearchResultItem key={track.id} track={track} />
      ))}
    </Box>
  );
};

export default SearchResultList;
