import { useCallback, useState } from 'react';
import { PolcadotWallet } from 'entities/polcadot/models';
import { getPolcadotWallets, initPolcadot } from 'entities/polcadot/api';

initPolcadot();

export const usePolcadotWallets = () => {
  const [accounts, setAccounts] = useState<PolcadotWallet[] | undefined>(
    undefined
  );

  const fetchAccounts = useCallback(async () => {
    const newAccounts = await getPolcadotWallets();
    setAccounts(newAccounts);
  }, []);

  return {
    accounts,
    fetchAccounts,
  };
};
