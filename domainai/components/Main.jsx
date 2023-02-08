import React from 'react';
import { styled } from '@mui/material/styles';


const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  padding: "10px",
  position: "absolute",
  backgroundColor: "white",
  overflow: "scroll",
  bottom: "0",
  top: "0",
  marginLeft: `-${drawerWidth}px`,
  marginBottom: "56px",


  ...(open && {
    marginRight: `+${drawerWidth}px`,
  }),
}));

export default Main;

