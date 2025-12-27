import { Typography } from "@mui/material";
import useGetNewReleases from "../../../hooks/useGetNewReleases";
import LoadingSpinner from "../../../common/components/LoadingSpinner";
import ErrorMessage from "../../../common/components/ErrorMessage";
import CardGrid from "../../../common/MusicCard/CardGrid";
import Card from "../../../common/MusicCard/Card";

const NewReleases = () => {
  const { data, error, isLoading } = useGetNewReleases();
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }

  const albums = data?.albums.items ?? [];

  return (
    <div>
      <Typography variant="h2" paddingTop="10px" marginBottom="20px">
        New Released Albums
      </Typography>
      {albums.length > 0 ? (
        <CardGrid>
          {albums.slice(0, 6).map((album) => (
            <Card
              key={album.id}
              image={album.images[0].url}
              name={album.name}
              artistName={album.artists.map((a) => a.name).join(", ")}
            />
          ))}
        </CardGrid>
      ) : (
        <Typography variant="h3">No Data</Typography>
      )}
    </div>
  );
};

export default NewReleases;
