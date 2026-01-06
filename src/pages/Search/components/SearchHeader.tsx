import { Box, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Close";

type Props = {
  value: string;
  onChange: (v: string) => void;
};

const SearchHeader = ({ value, onChange }: Props) => {
  return (
    <Box px="20px">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "rgba(255,255,255,0.12)",
          borderRadius: "50px",
          padding: "8px 20px",
          transition: "all 0.2s ease",
          border: "2px solid transparent",
          "&:focus-within": {
            backgroundColor: "rgba(255,255,255,0.15)",
            borderColor: "white",
          },
        }}
      >
        <SearchIcon sx={{ color: "white", mr: 2, fontSize: "1.8rem" }} />

        <InputBase
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="What would you like to listen to?"
          fullWidth
          sx={{
            color: "white",
            fontSize: "0.9rem",
            fontWeight: 500,
            "& input::placeholder": {
              color: "rgba(255,255,255,0.5)",
              opacity: 1,
            },
          }}
        />

        {value && (
          <ClearIcon
            sx={{
              color: "rgba(255,255,255,0.5)",
              cursor: "pointer",
              "&:hover": { color: "white" },
            }}
            onClick={() => onChange("")}
          />
        )}
      </Box>
    </Box>
  );
};

export default SearchHeader;
