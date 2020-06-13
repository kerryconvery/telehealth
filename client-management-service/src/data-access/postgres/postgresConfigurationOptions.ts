export default interface IPostgresConfigurationOptions {
  getHost(): string;
  getPort(): number;
  getDatabaseName(): string;
  getUsername(): string;
  getPassword(): string;
  getUseSSL(): boolean;
}