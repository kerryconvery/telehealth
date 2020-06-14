import { v4 as uuid } from 'uuid';
import IClientRepository from '../../domain/outputPorts/clientRepository';
import Client from '../../domain/domain-models/client';

export default class ClientRepository implements IClientRepository {

  private clientStore: Client[] = [];
  
  constructor() {
  }

  async insertClient(client: Client): Promise<void> {
    const id = uuid();

    this.clientStore.push({
      ...client,
      id,
    });
  }

  async getAllClients(): Promise<Client[]> {
    return Promise.resolve(this.clientStore);
  }
}