import Image from 'next/image';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from 'shared/components';
import React, { ChangeEvent } from 'react';
import { PolcadotWallet } from 'entities/polcadot/models';

import { usePolcadotWallets } from '../hooks';

type Props = {
  onSelectWallet: (newWallet: PolcadotWallet) => void;
};
export const PolcadotWalletSelect = ({ onSelectWallet }: Props) => {
  const { fetchAccounts, accounts } = usePolcadotWallets();

  const handleSelectWallet = (event: ChangeEvent<HTMLInputElement>) => {
    const wallet = (accounts ?? []).find(
      (account) => account.address === event.target.value
    );

    if (wallet) {
      onSelectWallet(wallet);
    }
  };

  if (!accounts) {
    return (
      <Button variant="outlined" onClick={fetchAccounts} fullWidth>
        Connect to
        <Box sx={{ marginLeft: '4px', display: 'flex' }}>
          <Image
            height={14}
            width={64}
            src="/polkadot-logo.png"
            alt="Polcadot logo"
          />
        </Box>
      </Button>
    );
  }

  if (accounts.length === 0) {
    return <div>You don't have any added wallets</div>;
  }

  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Your wallets</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
        onChange={handleSelectWallet}
      >
        {accounts.map((account) => (
          <FormControlLabel
            value={account.address}
            control={<Radio />}
            label={account.meta.name}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
