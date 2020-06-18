import ClientResponseDto from '../dto/clientResponseDto';
import Client from '../entities/client-entity/client';

export default class ClientMapper {

  static toDto(client: Client): ClientResponseDto {
    const getClientsResponse = new ClientResponseDto();

    getClientsResponse.clientId = client.id;
    getClientsResponse.title = client.title;
    getClientsResponse.firstName = client.firstName;
    getClientsResponse.lastName = client.lastName;
    getClientsResponse.phoneNumber = client.phoneNumber;
  
    return getClientsResponse;
  }
}