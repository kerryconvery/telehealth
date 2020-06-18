import IClientRepository from '../../outputPorts/clientRepository';
import IClientService from '../../inputPorts/clientService';
import AddClientRequestDto from '../../dto/addClientRequestDto';
import ClientResponseDto from '../../dto/ClientResponseDto';
import ClientMapper from '../../mappers/clientMapper';
import ClientFactory from '../../entities/client-entity/clientFactory';

export default class ClientService implements IClientService{

  private clientRepository: IClientRepository;

  constructor(clientRepository: IClientRepository) {
    this.clientRepository = clientRepository;
  }

  async addClient(newClient: AddClientRequestDto): Promise<void> {
    const client = ClientFactory.build(
      newClient.title,
      newClient.firstName,
      newClient.lastName,
      newClient.phoneNumber
    );

    await this.clientRepository.add(client);
  }

  async getAllClients(): Promise<ClientResponseDto[]> {
    const clients = await this.clientRepository.get();

    return clients.map(ClientMapper.toDto);
  }
}