import Grid from "@mui/material/Grid";
import type { CategoryObject } from "../../../../models/category";
import CategoryCard from "./CategoryCard";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

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
    rootMargin: "200px 0px",
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
      </Grid>
      {hasNextPage && <div ref={ref} style={{ height: 1 }} />}
    </>
  );
};

export default BrowseCategories;
