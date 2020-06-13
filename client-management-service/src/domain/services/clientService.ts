import CreateNewClientRequest from '../dto/createNewClientRequest';
import GetClientsResponse from '../dto/getClientsResponse';

export default interface IClientService {
  createNewClient(newClient: CreateNewClientRequest): Promise<void>;
  getClients(): Promise<GetClientsResponse[]>;
}