import IClientRepository from '../../outputPorts/clientRepository';
import IClientService from '../../inputPorts/clientService';
import AddClientDto from '../../dto/addClientDto';
import ClientDto from '../../dto/ClientDto';
import ClientMapper from '../../mappers/clientMapper';
import ClientFactory from '../../entities/client-entity/clientFactory';

export default class ClientService implements IClientService{

  private clientRepository: IClientRepository;

  constructor(clientRepository: IClientRepository) {
    this.clientRepository = clientRepository;
  }

  async addClient(newClient: AddClientDto): Promise<void> {
    const client = ClientFactory.build(
      newClient.title,
      newClient.firstName,
      newClient.lastName,
      newClient.phoneNumber
    );

    await this.clientRepository.add(client);
  }

  async getAllClients(): Promise<ClientDto[]> {
    const clients = await this.clientRepository.get();

    return clients.map(ClientMapper.toDto);
  }
}