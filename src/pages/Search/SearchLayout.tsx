import SearchHeader from "./components/SearchHeader";
import { Outlet } from "react-router";
import { Box } from "@mui/material";
import { useState } from "react";

const SearchLayout = () => {
  const [query, setQuery] = useState("");

  return (
    <Box
      sx={{
        bgcolor: "#121212",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        position="sticky"
        top={0}
        zIndex={10}
        bgcolor="#121212"
        pt={2}
        pb={2}
        marginBottom="15px"
      >
        <SearchHeader value={query} onChange={setQuery} />
      </Box>

      <Outlet />
    </Box>
  );
};

export default SearchLayout;
