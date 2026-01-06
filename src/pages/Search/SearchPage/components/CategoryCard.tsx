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
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
        "&:hover": {
          transform: "translateY(-6px)",
          "& .category-img": {
            transform: "rotate(25deg) scale(1.1) translateX(-5px)", // 이미지 더 회전하고 커짐
          },
        },
      }}
    >
      <Typography fontWeight={700} color="white" sx={{ fontSize: "1.25rem" }}>
        {category.name}
      </Typography>

      {imageUrl && (
        <Box
          className="category-img"
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
            boxShadow: "-4px 4px 12px rgba(0,0,0,0.3)",
            borderRadius: "8px",
            transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        />
      )}
    </Box>
  );
};

export default CategoryCard;
