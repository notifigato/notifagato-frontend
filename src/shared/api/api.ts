import axios from 'axios';

export const API = axios.create({
  baseURL: 'https://api.notifigato.com/',
  timeout: 1000,
});
