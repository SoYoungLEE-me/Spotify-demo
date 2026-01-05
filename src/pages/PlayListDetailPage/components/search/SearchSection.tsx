import { Box, Typography } from "@mui/material";
import { useState } from "react";
import SearchInput from "./SearchInput";
import SearchResultList from "./SearchResultList";

const SearchSection = () => {
  const [query, setQuery] = useState("");

  return (
    <Box display="flex" flexDirection="column" gap={3} height="100%">
      <SearchInput value={query} onChange={setQuery} />

      {/* 결과 영역 */}
      <Box
        flex={1}
        minHeight={0}
        overflow="auto"
        sx={{
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(255,255,255,0.2) transparent",
          "&::-webkit-scrollbar": { width: "6px" },
          "&::-webkit-scrollbar-track": { background: "transparent" },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(255,255,255,0.2)",
            borderRadius: "3px",
          },
          "&:hover::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(255,255,255,0.3)",
          },
        }}
      >
        {query.trim().length === 0 ? (
          <Box
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography color="rgba(255,255,255,0.4)" fontWeight={500}>
              찾고 싶은 곡이나 아티스트를 검색하세요
            </Typography>
          </Box>
        ) : (
          <SearchResultList />
        )}
      </Box>
    </Box>
  );
};

export default SearchSection;
