import { Pool, QueryResult } from 'pg';
import IPostgresDatabase from '../../repositories/postgresDatabase';
import IPostgresConfigurationOptions from './postgresConfigurationOptions';

export default class PostgresDatabase implements IPostgresDatabase {

  protected pool: Pool;

  constructor(configurationOptions: IPostgresConfigurationOptions) {
    this.pool = new Pool({
      user: configurationOptions.getUsername(),
      host: configurationOptions.getHost(),
      database: configurationOptions.getDatabaseName(),
      password: configurationOptions.getPassword(),
      port: configurationOptions.getPort(),
      ssl: configurationOptions.getUseSSL(),
    });
  }

  query(sql: string, values: string[]): Promise<QueryResult> {
    return this.pool.query(sql, values);
  }
}