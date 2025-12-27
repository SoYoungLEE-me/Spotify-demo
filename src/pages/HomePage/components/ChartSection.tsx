import { Typography } from "@mui/material";
import { useGetChartPlaylist } from "../../../hooks/useGetChartPlaylist";
import LoadingSpinner from "../../../common/components/LoadingSpinner";
import ErrorMessage from "../../../common/components/ErrorMessage";
import CardGrid from "../../../common/MusicCard/CardGrid";
import Card from "../../../common/MusicCard/Card";

interface ChartSectionProps {
  title: string;
  playlistId: string;
}

const ChartSection = ({ title, playlistId }: ChartSectionProps) => {
  const { data, error, isLoading } = useGetChartPlaylist(playlistId);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage errorMessage={error.message} />;

  const items = data?.items ?? [];

  console.log(items);

  return (
    <div style={{ marginBottom: "40px" }}>
      <Typography variant="h2" paddingTop="10px" marginBottom="20px">
        {title}
      </Typography>

      {items.length > 0 ? (
        <CardGrid>
          {items.map((item) => {
            const track = item.track;

            if (!track || track.type !== "track") return null;

            const imageUrl = track.album?.images?.[0]?.url ?? "";
            const artistNames =
              track.artists?.map((a) => a.name).join(", ") ?? "";

            return (
              <Card
                key={track.id}
                image={imageUrl}
                name={track.name ?? ""}
                artistName={artistNames}
              />
            );
          })}
        </CardGrid>
      ) : (
        <Typography variant="h3">No Data</Typography>
      )}
    </div>
  );
};

export default ChartSection;
