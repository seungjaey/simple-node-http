import { config } from 'dotenv';

config();

export const CONFIGS = {
  PORT: process.env.PORT || 3000,
  HOST: process.env.HOST || '127.0.0.1',
};

export default CONFIGS;
