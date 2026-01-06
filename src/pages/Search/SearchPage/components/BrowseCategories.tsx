import Grid from "@mui/material/Grid";
import type { CategoryObject } from "../../../../models/category";
import CategoryCard from "./CategoryCard";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Skeleton, Box } from "@mui/material";
interface Props {
  categories: CategoryObject[];
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
}

const BrowseCategories = ({
  categories,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: Props) => {
  const { ref, inView } = useInView({
    root: document.getElementById("scrollable-container"),
    rootMargin: "1200px 0px",
    threshold: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage?.();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <>
      <Grid container spacing={3} padding={3}>
        {categories.map((category) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={category.id}>
            <CategoryCard category={category} />
          </Grid>
        ))}
        {isFetchingNextPage &&
          Array.from(new Array(6)).map((_, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={`skeleton-${index}`}>
              <Box
                sx={{
                  position: "relative",
                  borderRadius: 4,
                  overflow: "hidden",
                  height: 180,
                }}
              >
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height="100%"
                  animation="wave"
                />
              </Box>
            </Grid>
          ))}
      </Grid>
      <div ref={ref} style={{ height: 20, background: "transparent" }} />
    </>
  );
};

export default BrowseCategories;
