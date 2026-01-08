import { Box, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";

type Props = {
  defaultValue: string;
  onSearch: (v: string) => void;
};

const SearchHeader = ({ defaultValue, onSearch }: Props) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleSearch = () => {
    onSearch(value.trim());
  };

  return (
    <Box px="20px">
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "rgba(255,255,255,0.12)",
          borderRadius: "50px",
          padding: "8px 20px",
          border: "2px solid transparent",
          "&:focus-within": {
            backgroundColor: "rgba(255,255,255,0.15)",
            borderColor: "white",
          },
        }}
      >
        <SearchIcon
          sx={{ color: "white", mr: 2, fontSize: "1.8rem", cursor: "pointer" }}
          onClick={handleSearch}
        />

        <InputBase
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="What would you like to listen to?"
          fullWidth
          sx={{
            color: "white",
            fontSize: "0.9rem",
            fontWeight: 500,
          }}
        />

        {value && (
          <ClearIcon
            sx={{ cursor: "pointer" }}
            onClick={() => {
              setValue("");
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default SearchHeader;
