import React from "react";
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import CircularProgress from '@mui/material/CircularProgress';

function SubmitButton({ loading, onSubmit }) {
  return (
    <>
    <IconButton disables= {loading} color="black" onClick={onSubmit}>

      {loading ? 
        <CircularProgress size={24} />
      : 
        <SendIcon />
      }
    </IconButton>
    </>
  );
}

export default SubmitButton;
