import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../Stores/songStore";
import { removeSongFromPlaylist } from "../Slices/playlistSlice";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface RemoveSongButtonProps {
  playlistId: number;
  songId: number;
}

const RemoveSongButton: React.FC<RemoveSongButtonProps> = ({ playlistId, songId }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleRemoveSong = () => {
    dispatch(removeSongFromPlaylist({ playlistId, songId }));
  };

  return (
    <IconButton onClick={handleRemoveSong} color="error">
      <DeleteIcon />
    </IconButton>
  );
};

export default RemoveSongButton;
