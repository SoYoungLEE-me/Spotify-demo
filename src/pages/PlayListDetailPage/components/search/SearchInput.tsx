import { Box, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Close";

type Props = {
  value: string;
  onChange: (v: string) => void;
};

const SearchInput = ({ value, onChange }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.1)",
        borderRadius: "20px",
        padding: "8px 12px",
        transition: "background-color 0.2s",
        "&:focus-within": {
          backgroundColor: "rgba(255,255,255,0.15)",
          border: "1px solid rgba(255,255,255,0.3)",
        },
        border: "1px solid transparent",
      }}
    >
      <SearchIcon sx={{ color: "rgba(255,255,255,0.5)", mr: 1 }} />

      <InputBase
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="노래 또는 아티스트 검색"
        fullWidth
        autoFocus
        sx={{
          color: "white",
          fontSize: "0.95rem",
          "& input::placeholder": {
            color: "rgba(255,255,255,0.4)",
            opacity: 1,
          },
        }}
      />

      {value && (
        <ClearIcon
          fontSize="small"
          sx={{
            color: "rgba(255,255,255,0.5)",
            cursor: "pointer",
            "&:hover": { color: "white" },
          }}
          onClick={() => onChange("")}
        />
      )}
    </Box>
  );
};

export default SearchInput;
