import CreateNewClientRequest from '../dto/createNewClientRequest';
import ClientResponse from '../dto/ClientResponse';

export default interface IClientService {
  createNewClient(newClient: CreateNewClientRequest): Promise<void>;
  getClients(): Promise<ClientResponse[]>;
}
