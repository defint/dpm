import { createConnection } from 'typeorm';
import { DATABASE_CONNECTION } from './constants';

export const getConnection = async () =>
  await createConnection({
    type: 'postgres',
    host: 'postgres',
    port: 5432,
    username: 'user',
    password: 'password',
    database: 'db',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  });

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: getConnection,
  },
];
