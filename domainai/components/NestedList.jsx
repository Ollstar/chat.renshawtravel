import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import { ExpandMore, ExpandLess, ChevronRight, ChevronLeft } from '@mui/icons-material';
import ChatIcon from '@mui/icons-material/Chat';
import { Divider, TextField, Toolbar } from '@mui/material';
import PsychologyIcon from '@mui/icons-material/Psychology';
import { Box } from '@mui/material';
import { useState } from 'react';
import { Dialog } from '@mui/material';

import { Button } from '@mui/material';

export default function NestedList({ onSubmit, setMessageInput, handleDrawerClose, prependageMessage, setPrependageMessage }) {
  const [open, setOpen] = React.useState({});
  const [modalOpen, setModalOpen] = React.useState(false);
  const [message, setMessage] = useState(prependageMessage);

  const data = [    {      group: "Booking",      entries: [        {          entryPoint: "flight booking",          questions: [            "What airlines do you offer for flight booking?",            "How do I check the flight availability?",            "Can I book a multi-city flight?",            "Is it possible to book a flight with a layover?"          ]
        },
        {
          entryPoint: "hotel booking",
          questions: [
            "What hotels do you offer for booking?",
            "How do I check the room availability?",
            "Can I book a room with a specific view?",
            "Do you offer any packages with flight and hotel booking?"
          ]
        },
        {
          entryPoint: "package booking",
          questions: [
            "What packages do you offer for booking?",
            "Can I customize the package?",
            "Do you offer any all-inclusive packages?",
            "What is included in the package?"
          ]
        },
        {
          entryPoint: "rental car booking",
          questions: [
            "What rental car companies do you offer for booking?",
            "How do I check the car availability?",
            "Can I add a GPS or a child car seat?",
            "Do you offer any discounts or promotions for rental car booking?"
          ]
        }
      ]
    },
    {
      group: "Support",
      entries: [
        {
          entryPoint: "flight changes and cancellations",
          questions: [
            "What is your policy for flight changes and cancellations?",
            "How do I make a change or cancellation?",
            "Is there a fee for making changes or cancellations?",
            "Can I change my flight itinerary online?"
          ]
        },
        {
          entryPoint: "hotel changes and cancellations",
          questions: [
            "What is your policy for hotel changes and cancellations?",
            "How do I make a change or cancellation?",
            "Is there a fee for making changes or cancellations?",
            "Can I change my hotel reservation online?"
          ]
        }
      ]
    },
    {
      group: "Miscellaneous",
      entries: [
        {
          entryPoint: "travel insurance",
          questions: [
            "Do you offer travel insurance?",
            "What does the travel insurance cover?",
            "How do I purchase travel insurance?",
            "Can I purchase travel insurance after booking my trip?"
          ]
        },
        {
          entryPoint: "passport and visa",
          questions: [
            "What is the process for obtaining a passport or visa?",
            "Do you offer assistance with obtaining a passport or visa?",
            "How long does it take to obtain a passport or visa?",
            "What is the cost for obtaining a passport or visa?"
          ]
        }
      ]
    }
  ];

  const handleModalClose = (buttonState) => {

    if (buttonState === "Save") {
      setPrependageMessage(prependageMessage);
      setMessage(prependageMessage);
      setTimeout(() => {
        onSubmit(e, "Change");
      }, 100);    }
    setModalOpen(false);


  };

  const handleBrainClick = (message) => {
    setMessage(message);
    setModalOpen(true);
    setOpen({})
  };
  const handleClick = (entryPoint) => {
    setOpen({
      ...open,
      [entryPoint]: !open[entryPoint]
    });

  };

  const handleQuestionClick = (entryPoints, question, e) => {
    const message = `For ${entryPoints}. ${question}`;
    setMessageInput(message);
    setTimeout(() => {
      onSubmit(e, message);
    }, 100);
    setOpen({});
    handleDrawerClose();
  };

  return (
    <>
      <Dialog
        fullWidth

        open={modalOpen}
        scroll="paper"
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box

          sx={{}}
          bgcolor="background.paper" >



          <Box padding={2}>
            <ListSubheader sx={{ fontFamily: "poppins" }} component="div" id="modal-header">
              Training Message
            </ListSubheader>
            <TextField
              id="filled-multiline-static"
              fullWidth
              multiline
              rows={10}
              InputProps={{style: { fontFamily: "poppins"}}}
              variant="outlined"
              value={prependageMessage}
              onChange={(e) => setPrependageMessage(e.target.value)}
              onKeyDown={(e) => {

                if (e.key === "Enter") {
                  handleModalClose(e, "Save");
                }
              }}

            />


          </Box>
        </Box>
        <Toolbar sx={{ justifyContent: "flex-end" }}>
          <Button sx={{ fontFamily: "poppins" }} variant="contained" onClick={(e) => handleModalClose(e, "Save")}>Save</Button>
          <Button sx={{ fontFamily: "poppins" }} onClick={() => handleModalClose("Cancel")}>Cancel</Button>

        </Toolbar>
      </Dialog>
      <List
        component="nav"
        sx={{ maxWidth: 240, bgcolor: 'background.paper' }}
        aria-labelledby="nested-list-subheader"

      >
        <ListSubheader sx={{ fontFamily: "poppins", marginTop: 4 }} component="div" id="nested-list-subheader">
          Quick Questions
        </ListSubheader>
        {data.map((group, groupIndex) => (

          <React.Fragment key={groupIndex}>

            <ListItemButton onClick={() => handleClick(group.group)}>
              <ListItemIcon>
                {open[group.group] ? <ExpandLess /> : <ExpandMore />}
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ fontFamily: "poppins" }} primary={group.group} />
            </ListItemButton>
            <Collapse in={open[group.group]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {group.entries.map((entry, entryIndex) => (
                  <React.Fragment key={entryIndex}>
                    <ListItemButton onClick={() => handleClick(entry.entryPoint)}>
                      <ListItemIcon>
                        {open[entry.entryPoint] ? <ChevronLeft /> : <ChevronRight />}
                      </ListItemIcon>
                      <ListItemText primaryTypographyProps={{ fontFamily: "poppins", fontSize: 12 }} primary={entry.entryPoint} />
                    </ListItemButton>
                    <Collapse in={open[entry.entryPoint]} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {entry.questions.map((question, questionIndex) => (
                          <ListItemButton
                            key={questionIndex}

                            onClick={() => handleQuestionClick(entry.entryPoint, question)}
                          >
                            <ListItemIcon>
                              <ChatIcon />
                            </ListItemIcon>
                            <ListItemText primaryTypographyProps={{ fontFamily: "poppins", fontSize: 10 }} primary={question} />
                          </ListItemButton>
                        ))}
                      </List>
                    </Collapse>
                  </React.Fragment>
                ))}

              </List>
            </Collapse>
          </React.Fragment>
        ))}
        <Divider />
        <ListSubheader sx={{ fontFamily: "poppins", marginTop: 4 }} component="div" id="nested-list-subheader">
          Admin
        </ListSubheader>
        <ListItemButton onClick={() => handleBrainClick(prependageMessage)}>
          <ListItemIcon>
            <PsychologyIcon />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ fontFamily: "poppins" }} primary="Training Message" />
        </ListItemButton>

      </List>


    </>
  );
};
