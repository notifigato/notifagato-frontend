'use client';

import { Alert, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import {
  isValidAddressPolkadotAddress,
  sendTransfer,
} from 'entities/polcadot/api';
import { sendMessage } from 'entities/wallets/api';
import {
  Box,
  Button,
  LoadingButton,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from 'shared/components';
import { PolcadotWallet } from 'entities/polcadot/models';
import { PolcadotWalletSelect } from 'features/polcadot/PolcadotWalletSelect';
import { useState } from 'react';

export default function Logic() {
  const [selectedWallet, setSelectedWallet] = useState<PolcadotWallet>();
  const [recipientWallet, setRecipientWallet] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const { isLoading, mutateAsync } = useMutation({
    mutationKey: ['createNewWallet'],
    mutationFn: (payload: { message: string; receiver: string }) =>
      sendMessage(payload),
  });

  const [activeStep, setActiveStep] = useState(0);

  const payAndSend = async () => {
    if (!selectedWallet) {
      throw new Error('');
    }

    await sendTransfer(selectedWallet, recipientWallet);

    mutateAsync({
      receiver: recipientWallet,
      message,
    });
  };
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const isValidRecipientWallet = isValidAddressPolkadotAddress(recipientWallet);

  const validation = () => {
    if (!isValidRecipientWallet) {
      return "The recipient's wallet is not valid";
    }

    if (recipientWallet === selectedWallet?.address) {
      return 'The sender and the recipient must be different';
    }
  };

  const steps = [
    {
      label: 'Connect to polcadot',
      description: () => (
        <>
          <Typography variant="body1">Connect your DOT wallet</Typography>
          <PolcadotWalletSelect onSelectWallet={setSelectedWallet} />
        </>
      ),
      button: () => (
        <LoadingButton
          variant="contained"
          disabled={!selectedWallet}
          loading={isLoading}
          onClick={handleNext}
        >
          Continue
        </LoadingButton>
      ),
    },
    {
      label: 'Recipient wallet',
      description: () => (
        <>
          <Typography variant="body1">Input recipient's DOT address</Typography>
          <Typography variant="caption">
            Ensure you enter only the address, without any additional symbols or
            spaces
          </Typography>
          <TextField
            label="Recipient wallet"
            fullWidth
            variant="outlined"
            value={recipientWallet}
            onChange={(event) => setRecipientWallet(event.target.value)}
          />
          {recipientWallet && validation() && (
            <Alert sx={{ marginTop: 2 }} severity="error">
              {validation()}
            </Alert>
          )}
        </>
      ),
      button: () => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button onClick={handleBack}>Back</Button>
          <LoadingButton
            variant="contained"
            disabled={
              !isValidRecipientWallet ||
              recipientWallet === selectedWallet?.address
            }
            loading={isLoading}
            onClick={handleNext}
          >
            Check wallet and continue
          </LoadingButton>
        </Box>
      ),
    },
    {
      label: 'Message',
      description: () => (
        <>
          <Typography variant="body1">Compose your message</Typography>
          <TextField
            label="Message"
            fullWidth
            variant="outlined"
            minRows={4}
            multiline
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
        </>
      ),
      button: () => (
        <LoadingButton
          variant="contained"
          disabled={!isValidRecipientWallet}
          loading={isLoading}
          onClick={handleNext}
          sx={{ mt: 1, mr: 1 }}
        >
          Continue
        </LoadingButton>
      ),
    },
    {
      label: 'Payment for sending',
      description: () => (
        <div>
          Don't delay! Pay for your dispatch, and we'll send your message
          immediately. Your urgent communication is just a click away from being
          delivered. Act promptly and relish the assurance that your message is
          on its way.
        </div>
      ),
      button: () => (
        <LoadingButton
          variant="contained"
          disabled={!selectedWallet}
          loading={isLoading}
          onClick={payAndSend}
          sx={{ mt: 1, mr: 1 }}
        >
          Pay and send
        </LoadingButton>
      ),
    },
  ];

  return (
    <>
      <Typography variant="body1" paddingBottom="56px">
        Experience swift and efficient communication with wallet owners using
        Notifigato. Within minutes, you can reach out to wallet owners and make
        optimal use of your time. Embrace the convenience of instantaneous
        communication with Notifigato today!
      </Typography>
      <Box sx={{ maxWidth: 400 }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step) => (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
              <StepContent>
                <Box sx={{ mb: 2, paddingTop: 4 }}>{step.description()}</Box>
                <Box sx={{ mb: 2 }}>
                  <div>{step.button()}</div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Reset
            </Button>
          </Paper>
        )}
      </Box>
    </>
  );
}
