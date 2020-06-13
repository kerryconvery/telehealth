import CreateNewClientRequest from '../dto/createNewClientRequest';
import ClientResponse from '../dto/clientResponse';
import Client from '../domain-models/client';

export default class ClientMapper {
  static fromCreateNewClientRequest(createNewClient: CreateNewClientRequest): Client {
    const client = new Client();

    client.title = createNewClient.title;
    client.firstName = createNewClient.firstName;
    client.lastName = createNewClient.lastName;
    client.phoneNumber = createNewClient.phoneNumber;
  
    return client;
  }

  static toClientsResponse(client: Client): ClientResponse {
    const getClientsResponse = new ClientResponse();

    getClientsResponse.id = client.id;
    getClientsResponse.title = client.title;
    getClientsResponse.firstName = client.firstName;
    getClientsResponse.lastName = client.lastName;
    getClientsResponse.phoneNumber = client.phoneNumber;
  
    return getClientsResponse;
  }
}