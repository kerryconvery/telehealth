import IClientRepository from '../../repositories/clientRepository';
import CreateNewClientRequest from '../../dto/createNewClientRequest';
import ClientResponse from '../../dto/ClientResponse';
import ClientMapper from '../../mappers/clientMapper';

export interface IClientService {
  createNewClient(newClient: CreateNewClientRequest): Promise<void>;
  getClients(): Promise<ClientResponse[]>;
}

export default class ClientService implements IClientService{

  private clientRepository: IClientRepository;

  constructor(clientRepository: IClientRepository) {
    this.clientRepository = clientRepository;
  }

  async createNewClient(newClient: CreateNewClientRequest): Promise<void> {
    const client = ClientMapper.fromCreateNewClientRequest(newClient);

    await this.clientRepository.insertClient(client);
  }

  async getClients(): Promise<ClientResponse[]> {
    const clients = await this.clientRepository.getAllClients();

    return clients.map(ClientMapper.toClientsResponse);
  }
}