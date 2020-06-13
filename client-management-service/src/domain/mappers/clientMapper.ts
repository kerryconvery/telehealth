import CreateNewClientRequest from '../dto/createNewClientRequest';
import getClientsResponse from '../dto/getClientsResponse';
import Client from '../domain-models/client';
import GetClientsResponse from '../dto/getClientsResponse';

export default class ClientMapper {
  static fromCreateNewClientRequest(createNewClient: CreateNewClientRequest): Client {
    const client = new Client();

    client.title = createNewClient.title;
    client.firstName = createNewClient.firstName;
    client.lastName = createNewClient.lastName;
    client.phoneNumber = createNewClient.phoneNumber;
  
    return client;
  }

  static toGetAllClientsResponse(client: Client): getClientsResponse {
    const getClientsResponse = new GetClientsResponse();

    getClientsResponse.id = client.id;
    getClientsResponse.title = client.title;
    getClientsResponse.firstName = client.firstName;
    getClientsResponse.lastName = client.lastName;
    getClientsResponse.phoneNumber = client.phoneNumber;
  
    return getClientsResponse;
  }
}