import dotenv from 'dotenv';

dotenv.config();

interface EnvConfig {
  BCRYPT_SALT_ROUNDS: number;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
}

const getEnvConfig = (): EnvConfig => {
  return {
    BCRYPT_SALT_ROUNDS: parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10),
    JWT_SECRET: process.env.JWT_SECRET || 'default_secret_key',
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1h',
  };
};

export const envConfig = getEnvConfig();
