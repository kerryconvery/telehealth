import { QueryResult } from 'pg';

export default interface IPostgresDatabase {
  query(sql: string, values: string[]): Promise<QueryResult>;
}
