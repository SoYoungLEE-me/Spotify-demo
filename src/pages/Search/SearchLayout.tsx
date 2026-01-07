import SearchHeader from "./components/SearchHeader";
import { useSearchParams } from "react-router";
import { Box } from "@mui/material";
import SearchPage from "./SearchPage/SearchPage";
import SearchResultPage from "./SearchResultPage/SearchResultPage";

const SearchLayout = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";

  return (
    <>
      <Box top={0} zIndex={10} pt={2} pb={2} marginBottom="30px">
        <SearchHeader
          defaultValue={query}
          onSearch={(value) => {
            setSearchParams(value ? { q: value } : {});
          }}
        />
      </Box>

      {!query && <SearchPage />}

      {query && <SearchResultPage />}
    </>
  );
};

export default SearchLayout;
