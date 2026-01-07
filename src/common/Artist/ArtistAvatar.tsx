import { Box } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

type Props = {
  imageUrl?: string;
  size?: number; // 최대 크기 (md 이상)
};

const ArtistAvatar = ({ imageUrl, size = 160 }: Props) => {
  return (
    <Box
      sx={{
        width: {
          xs: size * 0.75,
          sm: size * 0.75,
          md: size,
        },
        height: {
          xs: size * 0.75,
          sm: size * 0.75,
          md: size,
        },
        borderRadius: "50%",
        overflow: "hidden",
        backgroundColor: "#2a2a2a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="artist avatar"
          width="100%"
          height="100%"
          style={{ objectFit: "cover" }}
        />
      ) : (
        <PersonIcon
          sx={{
            fontSize: {
              xs: size * 0.3,
              sm: size * 0.4,
              md: size * 0.4,
            },
            color: "rgba(255,255,255,0.5)",
          }}
        />
      )}
    </Box>
  );
};

export default ArtistAvatar;
