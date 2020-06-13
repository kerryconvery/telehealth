import IClientRepository from '../../repositories/clientRepository';
import CreateNewClientRequest from '../../dto/createNewClientRequest';
import GetClientsResponse from '../../dto/getClientsResponse';
import IClientService from '../clientService';
import ClientMapper from '../../mappers/clientMapper';

export default class ClientService implements IClientService{

  private clientRepository: IClientRepository;

  constructor(clientRepository: IClientRepository) {
    this.clientRepository = clientRepository;
  }

  async createNewClient(newClient: CreateNewClientRequest): Promise<void> {
    const client = ClientMapper.fromCreateNewClientRequest(newClient);

    await this.clientRepository.insertClient(client);
  }

  async getClients(): Promise<GetClientsResponse[]> {
    const clients = await this.clientRepository.getAllClients();

    return clients.map(ClientMapper.toGetAllClientsResponse);
  }
}