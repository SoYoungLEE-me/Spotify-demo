import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

const ProfileMenu = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: user } = useGetCurrentUserProfile();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear(); // access_token 제거
    queryClient.clear();
    window.location.reload(); // 상태 초기화
    navigate("/");
  };

  if (!user) return null;

  return (
    <>
      <IconButton onClick={handleOpen}>
        <Avatar src={user.images?.[0]?.url} alt={user.display_name} />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem disabled>{user.display_name}</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default ProfileMenu;
