import IClientRepository from '../../domain/outputPorts/clientRepository';
import Client from '../../domain/domain-models/client';

export default class ClientRepository implements IClientRepository {

  private clientStore: Client[] = [];
  private generateId: () => string;

  constructor(generateId: () => string) {
    this.generateId = generateId;
  }

  async insertClient(client: Client): Promise<void> {
    const id = this.generateId();

    console.log('id', id);

    this.clientStore.push({
      ...client,
      id,
    });
  }

  async getAllClients(): Promise<Client[]> {
    return Promise.resolve(this.clientStore);
  }
}