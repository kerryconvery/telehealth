import ClientDto from '../dto/clientDto';
import Client from '../entities/client-entity/client';

export default class ClientMapper {

  static toDto(client: Client): ClientDto {
    const getClientsResponse = new ClientDto();

    getClientsResponse.clientId = client.id;
    getClientsResponse.title = client.title;
    getClientsResponse.firstName = client.firstName;
    getClientsResponse.lastName = client.lastName;
    getClientsResponse.phoneNumber = client.phoneNumber;
  
    return getClientsResponse;
  }
}