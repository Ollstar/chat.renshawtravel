import React from 'react';
import { AppBar, Toolbar, TextField, InputAdornment, IconButton, CircularProgress, Typography, Link } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import styles from "styles/index.module.css";






const BottomAppBar = ({ open, onSubmit, setMessageInput, messageInput, isLoading, handleDrawerClose, handleDrawerOpen }) => {
    return (
      <React.Fragment>
        <AppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1, bottom: "0", top: "auto", padding: "5px", backgroundColor: "rgb(240,240,240)" }}>
          <Toolbar>
  
            <TextField
              id="outlined-basic"
              label="Enter message..."
              variant="outlined"
              value={messageInput}
              color='primary'
              disabled={isLoading || open}
              onSubmit={onSubmit}
              onClick={open ? handleDrawerClose :  null}
              InputLabelProps={{                style: { fontFamily:"poppins" },
            }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
     <IconButton
              color="primary"
              aria-label="sendMessage"
              disabled={isLoading || open}
              onClick={onSubmit}
            >
              {isLoading ? <CircularProgress size={24} /> : <SendIcon />}
            </IconButton>
                  </InputAdornment>
                ),
              }}            
              sx={{ width: "100%", backgroundColor: "white" }}
              onChange={e => setMessageInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') onSubmit(e) }}
            />
            
  
          </Toolbar>
          <footer>
            <Typography variant="body2" fontSize={8} fontFamily={"poppins"} color="text.secondary" align="center">
              {'Powered by '}
              <Link color="inherit" href="https://rivaltech.com/">
                Rival
              </Link>{' '}
              {new Date().getFullYear()}
              {'.'}
            </Typography>
          </footer>
        </AppBar>
      </React.Fragment>
    );
  }
  export default BottomAppBar;
