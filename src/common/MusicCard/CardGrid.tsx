import Grid from "@mui/material/Grid";
import type { ReactNode } from "react";

type CardGridProps = {
  children: ReactNode;
};

const CardGrid = ({ children }: CardGridProps) => {
  const items = Array.isArray(children) ? children : [children];
  return (
    <Grid container spacing={2}>
      {items.map((child, index) => (
        <Grid key={index} size={{ xs: 6, sm: 4, md: 2 }}>
          {child}
        </Grid>
      ))}
    </Grid>
  );
};

export default CardGrid;
