import { Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
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
      {/* 헤더 영역 */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        marginBottom="24px"
        borderBottom="1px solid rgba(255,255,255,0.1)"
        paddingBottom="16px"
      >
        <Typography variant="h5" fontWeight={700} color="white">
          곡을 찾아보세요
        </Typography>

        <IconButton
          onClick={onClose}
          sx={{
            color: "rgba(255,255,255,0.7)",
            "&:hover": {
              color: "white",
              bgcolor: "rgba(255,255,255,0.1)",
            },
          }}
        >
          <CloseIcon fontSize="medium" />
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
