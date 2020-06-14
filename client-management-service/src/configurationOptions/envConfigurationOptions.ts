import dotenv from 'dotenv';

dotenv.config();

export default class EnvConfigurationOptions {

  getHost(): string {
    return process.env.PGHOST;
  }

  getPort(): number {
    return +process.env.PGPORT;
  }

  getDatabaseName(): string {
    return process.env.PGDATABASE;
  }

  getUsername(): string {
    return process.env.PGUSER;
  }

  getPassword(): string {
    return process.env.PGPASSWORD;
  }

  getUseSSL(): boolean {
    return process.env.PGSSL === 'true';
  }

  getListenPort(): number {
    return 3000;
  }
}