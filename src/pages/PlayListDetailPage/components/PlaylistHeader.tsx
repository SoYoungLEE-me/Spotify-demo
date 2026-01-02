import { Box, Typography } from "@mui/material";
import type { Playlist } from "../../../models/playlist";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";

interface PlaylistHeaderProps {
  playlist: Playlist;
}

const PlaylistHeader = ({ playlist }: PlaylistHeaderProps) => {
  const imageUrl = playlist.images?.[0]?.url;

  return (
    <Box
      position="relative"
      sx={{
        marginTop: { xs: "16px", md: "35px" },
        marginX: { xs: "12px", md: "24px" },
        borderRadius: { xs: "20px", md: "32px" },
        padding: { xs: "24px 20px", md: "48px 32px 32px" },
        overflow: "hidden",
        background: "linear-gradient(to bottom, #2c3e50, #121212)",
        boxShadow: "0 4px 60px rgba(0,0,0,0.5)",
        minHeight: { xs: "auto", md: "340px" },
      }}
    >
      {imageUrl && (
        <Box
          position="absolute"
          top={-100}
          left={-100}
          right={-100}
          bottom={-100}
          sx={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(60px) brightness(0.6)",
            opacity: 0.7,
            zIndex: 0,
            transform: "scale(1.2)",
          }}
        />
      )}

      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        sx={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)",
          zIndex: 1,
        }}
      />

      <Box
        position="relative"
        zIndex={2}
        display="flex"
        gap={{ xs: 3, md: 5 }}
        alignItems={{ xs: "center", md: "flex-end" }}
        flexDirection={{ xs: "column", md: "row" }}
        textAlign={{ xs: "center", md: "left" }}
      >
        <Box
          width={{ xs: 160, md: 240 }}
          height={{ xs: 160, md: 240 }}
          flexShrink={0}
          bgcolor="grey.900"
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
            borderRadius: "12px",
            overflow: "hidden",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "scale(1.02) translateY(-5px)",
              boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
            },
          }}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={playlist.name}
              width="100%"
              height="100%"
              style={{ objectFit: "cover" }}
            />
          ) : (
            <AudiotrackIcon
              sx={{ fontSize: { xs: 64, md: 96 }, color: "grey.600" }}
            />
          )}
        </Box>

        <Box display="flex" flexDirection="column" gap={1} width="100%">
          <Typography
            variant="overline"
            fontWeight={700}
            sx={{
              letterSpacing: 2,
              opacity: 0.8,
              display: { xs: "none", md: "block" },
            }}
          >
            {playlist.type}
          </Typography>

          <Typography
            fontWeight={900}
            lineHeight={1}
            sx={{
              fontSize: { xs: "28px", sm: "40px", md: "72px" },
              textShadow: "0 4px 12px rgba(0,0,0,0.5)",
              mb: { xs: 1, md: 2 },
              wordBreak: "keep-all",
            }}
          >
            {playlist.name}
          </Typography>

          {playlist.description && (
            <Typography
              variant="body1"
              color="rgba(255,255,255,0.7)"
              maxWidth={700}
              sx={{
                mb: 1,
                fontSize: { xs: "0.875rem", md: "1rem" },
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {playlist.description}
            </Typography>
          )}

          <Box
            display="flex"
            alignItems="center"
            gap={1}
            justifyContent={{ xs: "center", md: "flex-start" }}
            mt={{ xs: 1, md: 0 }}
          >
            <Typography fontWeight={700} fontSize={{ xs: 14, md: 15 }}>
              {playlist.owner?.display_name}
            </Typography>
            <Box
              component="span"
              sx={{
                width: 4,
                height: 4,
                bgcolor: "white",
                borderRadius: "50%",
              }}
            />
            <Typography
              fontWeight={400}
              fontSize={{ xs: 14, md: 15 }}
              color="rgba(255,255,255,0.8)"
            >
              {playlist.tracks?.total
                ? `${playlist.tracks.total} songs`
                : "No songs"}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PlaylistHeader;
// Atmospheric Background로 배경에 앨범 아트를 흐리게 깔 수 있음
