import { Boolean, Record, Static, String } from 'runtypes';

export const SaveNewWalletResponse = Record({
  code: String,
  link: String,
});
export const CheckNewWalletResponse = Record({
  isExist: Boolean,
});

export type ISaveNewWalletPayload = {
  wallet: string;
};

export type ISendMessagePayload = {
  receiver: string;
  message: string;
};

export type ISaveNewWalletResponse = Static<typeof SaveNewWalletResponse>;
export type ICheckNewWalletResponse = Static<typeof CheckNewWalletResponse>;
