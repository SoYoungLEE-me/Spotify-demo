import {
  Card as MuiCard,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

import PlayButton from "./PlayButton";

interface CardProps {
  name: string;
  image: string;
  artistName: string;
}

const Card = ({ image, name, artistName }: CardProps) => {
  return (
    <MuiCard
      sx={{
        position: "relative",
        backgroundColor: "background.paper",
        cursor: "pointer",
        transition: "background-color 0.2s ease",
        "&:hover": {
          backgroundColor: "rgba(255,255,255,0.04)",
          ".play-button": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          image={image}
          alt={name}
          sx={{
            aspectRatio: "1 / 1",
            borderRadius: 1,
          }}
        />
        <PlayButton />
      </Box>
      <CardContent>
        <Typography
          variant="body2"
          fontWeight={600}
          color="text.primary"
          noWrap
        >
          {name}
        </Typography>
        <Typography variant="caption" color="text.secondary" noWrap>
          {artistName}
        </Typography>
      </CardContent>
    </MuiCard>
  );
};

export default Card;
