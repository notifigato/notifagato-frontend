'use client';
export { web3Accounts as getPolcadotWallets } from '@polkadot/extension-dapp';
import { web3Enable, web3FromSource } from '@polkadot/extension-dapp';
import { decodeAddress, encodeAddress } from '@polkadot/keyring';
import { hexToU8a, isHex } from '@polkadot/util';
import { PolcadotWallet } from 'entities/polcadot/models';
import { ApiPromise, WsProvider } from '@polkadot/api';

const wsProvider = new WsProvider('wss://rpc.polkadot.io');
const api = ApiPromise.create({ provider: wsProvider });

export const isValidAddressPolkadotAddress = (address: string) => {
  try {
    encodeAddress(isHex(address) ? hexToU8a(address) : decodeAddress(address));

    return true;
  } catch (error) {
    return false;
  }
};

export const sendTransfer = async (
  account: PolcadotWallet,
  address: string
) => {
  const transferExtrinsic = (await api).tx.balances.transfer(address, 1);

  const injector = await web3FromSource(account.meta.source);

  try {
    transferExtrinsic.signAndSend(
      account.address,
      // @ts-ignore
      { signer: injector.signer },
      ({ status }) => {
        if (status.isInBlock) {
          console.log(
            `Completed at block hash #${status.asInBlock.toString()}`
          );
        } else {
          console.log(`Current status: ${status.type}`);
        }
      }
    );
  } catch (error: any) {
    console.log(':( transaction failed', error);
  }
};
export const initPolcadot = () => web3Enable('Notifago');
