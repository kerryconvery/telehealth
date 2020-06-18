import Client from '../entities/client-entity/client';

export default interface IClientRepository {
  add(client: Client): Promise<void>;
  get(): Promise<Client[]>;
}