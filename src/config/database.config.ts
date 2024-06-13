import { registerAs } from '@nestjs/config';

// export default registerAs(
//   'database',
//   (): Record<string, any> => ({
//     MONGO_HOST: process.env.POSTGRES_HOST,
//     MONGO_PORT: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
//     MONGO_USERNAME: process.env.POSTGRES_USER,
//     MONGO_PASSWORD: process.env.POSTGRES_PASSWORD,
//     MONGO_DATABASE: process.env.POSTGRES_DB,
//   }),
// );

export default registerAs(
  'database',
  (): Record<string, any> => ({
    HOST: process.env.POSTGRES_HOST,
    PORT: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    USERNAME: process.env.POSTGRES_USER,
    PASSWORD: process.env.POSTGRES_PASSWORD,
    DATABASE: process.env.POSTGRES_DB,
  }),
);
