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
        placeholder="Search for songs or artists (Type at least two characters)"
        onChange={(e) => onChange(e.target.value)}
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

/*
    InputBase는 MUI 컴포넌트라서
    onChange의 이벤트 타입이 내부적으로 이미 정의돼 있음.

    onChange?: React.ChangeEventHandler<
      HTMLInputElement | HTMLTextAreaElement
    >

    그래서 e는 자동으로
    React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    로 타입 추론됨.

    → 별도의 타입 명시 없이도 e.target.value를
      안전하게 사용할 수 있음.
  */
