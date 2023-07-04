'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { checkWallet, saveNewWallet } from 'entities/wallets/api';
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
import { QRGenerator } from 'shared/QRGenerator';
import { PolcadotWallet } from 'entities/polcadot/models';
import { PolcadotWalletSelect } from 'features/polcadot/PolcadotWalletSelect';
import { useEffect, useState } from 'react';

export default function Page() {
  const [selectedWallet, setSelectedWallet] = useState<PolcadotWallet>();
  const { isLoading, mutateAsync, data, isSuccess } = useMutation({
    mutationKey: ['createNewWallet'],
    mutationFn: (wallet: string) => saveNewWallet({ wallet }),
  });

  const {
    isSuccess: isSuccessCheck,
    data: dataCheck,
    refetch,
  } = useQuery({
    queryKey: ['checkNewWallet'],
    queryFn: () => {
      if (!selectedWallet) {
        throw new Error('Empty wallet');
      }
      return checkWallet({ wallet: selectedWallet.address });
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    cacheTime: 0,
  });

  useEffect(() => {
    if (isSuccess) {
      setInterval(() => refetch(), 500);
    }
  }, [isSuccess]);

  const renderTelegramConnection = () => {
    return (
      <Box>
        <Typography variant="body1">
          1. Сonnect your wallet to your Telegram account either by scanning the
          QR code or utilizing the provided button.
          <br />
          2. Press START in the "Notifigato Bot" chat to start receiving
          messages.
        </Typography>
        <br />
        <QRGenerator url={data?.link || ''} />
      </Box>
    );
  };

  const [activeStep, setActiveStep] = useState(0);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const steps = [
    {
      label: 'Connect to polcadot',
      description: () => (
        <PolcadotWalletSelect onSelectWallet={setSelectedWallet} />
      ),
      buttons: () => (
        <>
          <Typography>Connect your DOT wallet</Typography>
          <LoadingButton
            variant="contained"
            disabled={!selectedWallet}
            loading={isLoading}
            onClick={async () => {
              if (selectedWallet) {
                await mutateAsync(selectedWallet.address);
              }

              setActiveStep((prevActiveStep) => prevActiveStep + 1);
            }}
            sx={{ mt: 1, mr: 1 }}
          >
            Continue
          </LoadingButton>
        </>
      ),
    },
    {
      label: 'Connect to telegram',
      description: renderTelegramConnection,
      buttons: () => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button onClick={handleBack}>Back</Button>
          <Button
            variant="outlined"
            onClick={() => {
              window.open(data?.link || '', '_blank');
            }}
            fullWidth
          >
            Authorize to telegram
          </Button>
        </Box>
      ),
    },
  ];

  const handleReset = () => {
    setActiveStep(0);
  };

  if (isSuccessCheck && dataCheck?.isExist) {
    return (
      <>
        <Typography variant="body1" paddingBottom="56px">
          Thank you for selecting our platform and becoming part of our
          community. We appreciate your interest in our services and are
          dedicated to ensuring that you derive maximum advantage from them.
        </Typography>
        <LoadingButton
          variant="contained"
          fullWidth
          onClick={() => {
            location.reload();
          }}
        >
          Register another wallet
        </LoadingButton>
      </>
    );
  }

  return (
    <>
      <Typography variant="body1" paddingBottom="56px">
        Prepare to earn effortlessly! Connect your wallet now and start
        accumulating DOT. The more wallets you add, the more you stand to earn.
        Don't hesitate, embark on your investment journey today! Link your
        Telegram account We uphold strict privacy standards and do not share
        your data with any third party. You will receive all communications
        exclusively from the Notifigato Bot.
      </Typography>
      <Box sx={{ maxWidth: 400 }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step) => (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
              <StepContent>
                <Box sx={{ mb: 4 }}>{step.description()}</Box>
                <Box sx={{ mb: 2 }}>
                  <div>{step.buttons()}</div>
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
