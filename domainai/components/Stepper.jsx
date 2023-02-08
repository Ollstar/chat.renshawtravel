import { Stepper, Step, StepLabel, StepContent, Button, Typography, TextField , Radio, FormControlLabel } from '@mui/material';
import { useState } from 'react';

function TraitSelector(props) {
  const [selectedTrait, setSelectedTrait] = useState('');
  const traitOptions = ['Fun', 'Non-repetitive', 'Short', 'Longwinded', 'Hyper-accurate', 'Friendly', 'Standoffish'];

  return (
    <>
      {traitOptions.map(trait => (
        <FormControlLabel
          control={<Radio />}
          label={trait}
          value={trait}
          checked={selectedTrait === trait}
          onChange={() => setSelectedTrait(trait)}
        />
      ))}
    </>
  );
}

function MessageStep(props) {
  const [message, setMessage] = useState('');

  return (
    <TextField
      value={message}
      onChange={(event) => setMessage(event.target.value)}
      label="Type your message"
      fullWidth
    />
  );
}

function BlackAndWhiteStep(props) {
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState([]);

  return (
    <>
      <Typography>Select specific questions:</Typography>
      {/* Add the logic to select specific questions */}
      <Typography>Select specific responses:</Typography>
      {/* Add the logic to select specific responses */}
    </>
  );
}

function CustomStepper(props) {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    'Select a behavior trait',
    'Type a message',
    'Choose specific questions and responses'
  ];

  return (
    <Stepper nonLinear activeStep={activeStep} orientation="vertical">
      {steps.map((label, index) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
          <StepContent>
            {index === 0 && <TraitSelector />}
            {index === 1 && <MessageStep />}
            {index === 2 && <BlackAndWhiteStep />}
            <div>
              {activeStep !== 0 && (
                <Button onClick={() => setActiveStep(activeStep - 1)}>Back</Button>
              )}
              {activeStep !== steps.length - 1 && (
                <Button onClick={() => setActiveStep(activeStep + 1)}>Next</Button>
              )}
            </div>
          </StepContent>
        </Step>
      ))}
    </Stepper>
  );
}

export default CustomStepper;
