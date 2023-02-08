import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect, useRef } from "react";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';

import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import NestedList from '@/components/NestedList';
import styles from '@/styles/index.module.css';
import { NoSsr } from '@mui/material';
import Message from '@/components/Message.jsx';
import { Typography } from '@mui/material';
import { AppBar } from '@mui/material';
import theme from '/styles/theme.js';
import BottomAppBar from '@/components/BottomAppBar.jsx';
import Main from '@/components/Main.jsx';
import DrawerSpacer from '@/components/DrawerSpacer.jsx';
import Stepper from '@mui/material';


const drawerWidth = 240;

export default function App(props) {
  let [timestamp, setTimestamp] = useState(new Date().toLocaleString());

  const [messageInput, setMessageInput] = useState("");
  const [prependageMessage, setPrependageMessage] = useState("You are the RenshawTravelAI chatbot. You love responding with emojis in the beginning middle and end of sentences, especially the double palmtree emoji. You need to keep a pulse on where people want to go so that Renshaw Travel can help them in long and near term. If they have questions about flight only send them to https://renshawtravel.com/flight-only-inquiry. If they want to know about hotels in canada send them to https://renshawtravel.com/luxury-hotels/four-seasons-hotels-and-resorts/canada, if they want to know about cruises send them to https://www.virtuoso.com/member/renshawtravel/cruises#FacetCategoryIndex=0&FacetLimit=6&SelectedFacets%5B0%5D%5BCategory%5D=cruise_company&SelectedFacets%5B0%5D%5BCategoryLogicalOperator%5D=OR&SelectedFacets%5B0%5D%5BName%5D=Azamara&SelectedFacets%5B0%5D%5BDisplayName%5D=Azamara&SelectedFacets%5B0%5D%5BSelected%5D=true&SelectedFacets%5B0%5D%5BIsIntervalFacet%5D=false&CurrentPage=1&LeftToShow=0&RowsPerPage=25&SearchView=1col&StartRow=0&SearchType=Cruise&SortType=CruiseTravelDateAsc If they want to know about who works at renshaw travel send them to https://www.renshawtravel.com/about-us/our-travel-specialists. Try to steer the conversation to only travel related topics and trying to get them to ultimately choose renshaw travel for their next trip. If you are unsure send them to https://renshawtravel.com/");
  const [behaviourList, setBehaviourList] = useState([]);
  const [questionList, setQustionList] = useState([]);


  const [conversation, setConversation] = useState([]);
  const scrollableContainerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!timestamp) {
      setTimestamp(new Date().toLocaleString());
    }
    scrollableContainerRef.current.scrollTop = scrollableContainerRef.current.scrollHeight;
  }, [conversation, timestamp]);

  async function onSubmit(event, message = messageInput, pMessage = prependageMessage) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    let currentTimestamp = new Date().toLocaleString();

    if (message !== "") {
      setConversation([...conversation, { text: message, author: "User", timestamp: currentTimestamp }]);
    }
    if (message === "Change") {
      setConversation([...conversation, { text: "That tickled...", author: "Starburger", timestamp: currentTimestamp }]);
    }
    setPrependageMessage(prependageMessage);
    setMessageInput("");
    try {
      setIsLoading(true);
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, pMessage }),
      });
      if (message === "") {
        setIsLoading(false);

      }
      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }


      let currentTimestamp2 = new Date().toLocaleString();

      setConversation([...conversation, {
        text: message,
        author: "User",
        timestamp: currentTimestamp
      },
      {
        text: data.result,
        author: "RenshawTravelAI",
        timestamp: currentTimestamp2
      }]);
      setMessageInput("");
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (

    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ padding: "5px", zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: "rgb(240,240,240)" }}

        open={open} elevation={2}>

        <Toolbar>
          <IconButton
            color="black"
            aria-label="open drawer"
            onClick={open ? handleDrawerClose : handleDrawerOpen}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" fontFamily={"poppins"} color="black" overflow={"hidden"} component="div" sx={{ flexGrow: 1 }}>
            RenshawTravelGPT
          </Typography>


          <Box sx={{ flexGrow: 1 }} />
          <Avatar alt="logo.png" src="/starb.png" />
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
        onClose={handleDrawerClose}

      >
        <DrawerSpacer >
          <Box sx={{ position: "fixed" }}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </Box>
        </DrawerSpacer>
        <Divider />
        <NestedList
          onSubmit={onSubmit}
          setMessageInput={setMessageInput}
          handleDrawerClose={handleDrawerClose}
          prependageMessage={prependageMessage}
          setPrependageMessage={setPrependageMessage}
          setBehaviourList={setBehaviourList}
          setQuestionList={setQustionList} />
        <Box
          component="img"
          sx={{
            position: "fixed",
            bottom: 0,
            zIndex: -1,
            margin: "85px 85px 100px",
            maxWidth: { xs: drawerWidth - 170, md: drawerWidth - 170 },
          }}
          alt="The house from the offer."
          src="/avatar/powerlogo.png"
        />
        <DrawerSpacer />

      </Drawer>
      <Box>
        <Main ref={scrollableContainerRef} onClick={open ? handleDrawerClose : null}>
          <DrawerSpacer />
          <div className={styles.messageContainer}>
            <Message
              author="RenshawTravelAI"
              text="Hey... 👋"
              timestamp={<NoSsr>{timestamp}</NoSsr>}>
            </Message>
          </div>
          <div className={styles.messageContainer}>
            <Message
              author="RenshawTravelAI"
              text="Thanks for jumping on to the RenshawTravelAI chat 🙏.  Where are you headed?"
              timestamp={<NoSsr>{timestamp}</NoSsr>}>
            </Message>
          </div>

          {conversation.map((message, index) => (
            <div key={index} className={styles.messageContainer} >
              <Message
                className={message.author === "User" ? styles.messageRight : styles.messageLeft}
                author={message.author}
                text={message.text}
                timestamp={message.timestamp}>
              </Message>
            </div>
          ))}
          <div style={{ clear: "both" }}></div>
          <DrawerSpacer />
        </Main>
      </Box>
      <BottomAppBar isLoading={isLoading} open={open} onSubmit={onSubmit} setMessageInput={setMessageInput} messageInput={messageInput} handleDrawerClose={handleDrawerClose} handleDrawerOpen={handleDrawerOpen} />
    </Box>
  );
}