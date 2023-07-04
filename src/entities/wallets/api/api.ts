import {
  CheckNewWalletResponse,
  ISaveNewWalletPayload,
  ISendMessagePayload,
  SaveNewWalletResponse,
} from 'entities/wallets/api/models';
import { API } from 'shared/api';

export const saveNewWallet = (payload: ISaveNewWalletPayload) =>
  // new Promise((resolve) => {
  //   resolve({ url: 'http://localhost:8080' });
  // });
  API.post('/auth/authorize', payload).then((data) => {
    console.log('data', data);
    if (SaveNewWalletResponse.check(data.data)) {
      return data.data;
    }
    throw new Error('');
  });

export const checkWallet = (payload: ISaveNewWalletPayload) =>
  // new Promise((resolve) => {
  //   resolve({ exist: true });
  // });
  API.post('/users/check', payload).then((data) => {
    if (CheckNewWalletResponse.check(data.data)) {
      return data.data;
    }

    throw new Error('');
  });

export const sendMessage = (payload: ISendMessagePayload) =>
  // new Promise((resolve) => {
  //   resolve({ exist: true });
  // });
  API.post('/users/message', payload);
