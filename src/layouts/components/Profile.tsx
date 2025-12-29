import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";

const Profile = () => {
  const { data: userProfile } = useGetCurrentUserProfile();

  const imageUrl = userProfile?.images?.[0]?.url;

  return (
    <Avatar
      src={imageUrl}
      alt={userProfile?.display_name ?? "user"}
      sx={{
        width: 50,
        height: 50,
        bgcolor: "grey.700",
        cursor: "pointer",
      }}
    >
      <PersonIcon sx={{ fontSize: 32 }} />
    </Avatar>
  );
};

export default Profile;
