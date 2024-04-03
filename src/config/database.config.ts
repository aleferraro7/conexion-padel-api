import { registerAs } from '@nestjs/config';

export default registerAs(
  'database',
  (): Record<string, any> => ({
    MONGO_HOST: process.env.MONGO_HOST,
    MONGO_PORT: parseInt(process.env.MONGO_PORT, 10) || 27017,
    MONGO_USERNAME: process.env.MONGO_USERNAME,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,
    MONGO_DATABASE: process.env.MONGO_DATABASE,
  }),
);
