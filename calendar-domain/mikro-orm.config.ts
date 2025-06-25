import { entities } from './src';
import { MikroORMOptions, MySqlDriver } from '@mikro-orm/mysql';

export default {
  entities: entities,
  dbName: process.env.MIKRO_ORM_DB_NAME,
  driver: MySqlDriver,
} as Partial<MikroORMOptions>;
