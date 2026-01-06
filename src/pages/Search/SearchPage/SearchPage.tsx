import useGetCategories from "../../../hooks/useGetCategories";
import LoadingSpinner from "../../../common/components/LoadingSpinner";
import { Box } from "@mui/material";
import ErrorMessage from "../../../common/components/ErrorMessage";
import BrowseCategories from "./components/BrowseCategories";

const SearchPage = () => {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetCategories({ limit: 20 });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" paddingTop="250px">
        <LoadingSpinner />
      </Box>
    );
  }

  if (error) return <ErrorMessage errorMessage={error.message} />;

  const categories = data?.pages.flatMap((page) => page.categories.items) ?? [];
  return (
    <BrowseCategories
      categories={categories}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
    />
  );
};

export default SearchPage;
