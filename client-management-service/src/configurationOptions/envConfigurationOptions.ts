import dotenv from 'dotenv';

dotenv.config();

export default class EnvConfigurationOptions {

  getHost(): string {
    return process.env.PGHOST || 'localhost';
  }

  getPort(): number {
    return +process.env.PGPORT || 5432;
  }

  getDatabaseName(): string {
    return process.env.PGDATABASE || 'telehealth';
  }

  getUsername(): string {
    return process.env.PGUSER || 'postgres';
  }

  getPassword(): string {
    return process.env.PGPASSWORD;
  }

  getUseSSL(): boolean {
    return process.env.PGSSL === 'true';
  }

  getListenPort(): number {
    return +process.env.LISTEN_PORT || 3000;
  }
}