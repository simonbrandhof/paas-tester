import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config();

async function migrateDb() {
  const ds = new DataSource({
    type: 'postgres',
    url: process.env['DATABASE_URL'],
    synchronize: false,
    migrationsRun: false,
    dropSchema: false,
    logging: 'all',
    migrations: [join(__dirname, 'migrations', '*.{js,ts}')],
    entities: [],
  });

  try {
    await ds.initialize();
    await ds.runMigrations({ transaction: 'all' });
    await ds.destroy();
    // exit process if no errors
    process.exit(0);
  } catch (err) {
    console.error('Failed to migrate database');
    console.error(err);
    if (ds?.isInitialized) {
      await ds.destroy();
    }
    process.exit(1);
  }
}

migrateDb();
