import NewReleases from "./components/NewReleases";
import useGetNewReleases from "../../hooks/useGetNewReleases";
import LoadingSpinner from "../../common/components/LoadingSpinner";
import { Box } from "@mui/material";

const HomePage = () => {
  const { data, error, isLoading } = useGetNewReleases();

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" paddingTop="250px">
        <LoadingSpinner />
      </Box>
    );
  }

  return <NewReleases data={data} error={error} />;
};

export default HomePage;
