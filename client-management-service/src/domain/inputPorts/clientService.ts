import AddClientRequestDto from '../dto/addClientRequestDto';
import ClientResponseDto from '../dto/ClientResponseDto';

export default interface IClientService {
  addClient(newClient: AddClientRequestDto): Promise<void>;
  getAllClients(): Promise<ClientResponseDto[]>;
}
