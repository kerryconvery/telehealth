import Client from '../domain-models/client';

export default interface IClientRepository {
  insertClient(client: Client): Promise<void>;
  getAllClients(): Promise<Client[]>;
}