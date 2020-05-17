import { Connection } from 'typeorm';
import {
  PRODUCT_REPOSITORY,
  DATABASE_CONNECTION,
} from './constants';
import {Product} from "./product.entity";

export const appProviders = [
  {
    provide: PRODUCT_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(Product),
    inject: [DATABASE_CONNECTION],
  },
];
