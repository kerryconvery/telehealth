import AddClientDto from '../dto/addClientDto';
import ClientDto from '../dto/ClientDto';

export default interface IClientService {
  addClient(newClient: AddClientDto): Promise<void>;
  getAllClients(): Promise<ClientDto[]>;
}
