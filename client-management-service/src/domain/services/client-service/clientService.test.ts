import ClientService from './clientService';
import CreateNewClientRequest from '../../dto/createNewClientRequest';

describe('When creating a new client', () => {
  const clientRepositoryMock = {
    insertClient: jest.fn(),
    getAllClients: jest.fn(),
  }

  beforeEach(() => {
    clientRepositoryMock.insertClient.mockClear();
    clientRepositoryMock.getAllClients.mockClear();
  });

  it('should insert the client into the database', async () => {
    const mockCreateNewClientRequest = {
      title: 'Mr',
      firstName: 'User',
      lastName: 'One',
      phoneNumber: '1234',
    }

    const clientService = new ClientService(clientRepositoryMock);

    await clientService.createNewClient(mockCreateNewClientRequest);

    expect(clientRepositoryMock.insertClient).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Mr',
      firstName: 'User',
      lastName: 'One',
      phoneNumber: '1234',
    }));
  })

  it('should return all clients from the database', async () => {
    const mockClients = [
      {
        id: '1',
        title: 'Mr',
        firstName: 'User',
        lastName: 'One',
        phoneNumber: '1234',
      }
    ];

    clientRepositoryMock.getAllClients.mockResolvedValueOnce(mockClients);

    const clientService = new ClientService(clientRepositoryMock);

    const clients = await clientService.getClients();

    expect(clients).toEqual(mockClients)
  })
})