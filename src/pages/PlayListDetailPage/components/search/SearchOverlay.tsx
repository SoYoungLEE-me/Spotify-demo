import { Box, IconButton } from "@mui/material";
import SearchSection from "./SearchSection";

type Props = {
  onClose: () => void;
};

const SearchOverlay = ({ onClose }: Props) => {
  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      zIndex={20}
      sx={{
        bgcolor: "rgba(18, 18, 18, 0.95)",
        backdropFilter: "blur(10px)",
        transition: "opacity 0.2s ease",
      }}
      display="flex"
      flexDirection="column"
      padding="24px"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
        marginBottom="10px"
      >
        <IconButton
          onClick={onClose}
          sx={{
            display: "flex",
            gap: "6px",
            px: "10px",
            py: "6px",
            borderRadius: "999px",
            color: "rgba(255,255,255,0.7)",
            fontSize: "0.85rem",
            "&:hover": {
              color: "white",
              bgcolor: "rgba(255,255,255,0.12)",
            },
          }}
        >
          Close
        </IconButton>
      </Box>

      {/* 검색 UI 영역 */}
      <Box flex={1} minHeight={0} overflow="hidden">
        <SearchSection />
      </Box>
    </Box>
  );
};

export default SearchOverlay;
