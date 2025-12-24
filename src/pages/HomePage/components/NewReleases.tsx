import { Typography } from "@mui/material";
import useGetNewReleases from "../../../hooks/useGetNewReleases";

const NewReleases = () => {
  const { data, error, isLoading } = useGetNewReleases();
  console.log("ddd", data);
  return (
    <div>
      <Typography variant="h2" paddingTop="10px">
        New Released Albums
      </Typography>
    </div>
  );
};

export default NewReleases;
