import { Box, Typography } from "@mui/material";
import type { CategoryObject } from "../../../../models/category";

interface Props {
  category: CategoryObject;
}

const getCategoryColor = (id: string) => {
  const s = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);

  const hue = s % 360;
  return `hsl(${hue}, 40%, 50%)`;
};

const CategoryCard = ({ category }: Props) => {
  const bgColor = getCategoryColor(category.id);
  const imageUrl = category.icons?.[0]?.url;

  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: 2,
        bgcolor: bgColor,
        p: 2,
        overflow: "hidden",
        cursor: "pointer",
        height: 180,
      }}
    >
      <Typography fontWeight={700} color="white" sx={{ fontSize: "1.25rem" }}>
        {category.name}
      </Typography>

      {imageUrl && (
        <Box
          component="img"
          src={imageUrl}
          alt={category.name}
          sx={{
            position: "absolute",
            width: 120,
            height: 120,
            right: -10,
            bottom: -5,
            transform: "rotate(15deg)",
          }}
        />
      )}
    </Box>
  );
};

export default CategoryCard;
