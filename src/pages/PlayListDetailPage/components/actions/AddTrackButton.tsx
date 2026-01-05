import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface Props {
  onClick: () => void;
}

const AddTrackButton = ({ onClick }: Props) => {
  return (
    <Button size="small" startIcon={<AddIcon />} onClick={onClick}>
      곡 추가하기
    </Button>
  );
};

export default AddTrackButton;
