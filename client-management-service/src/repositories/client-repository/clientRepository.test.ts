import ClientRepository from './clientRepository';

describe('When inserting a client', () => {

  const postgresDatabaseMock = {
    query: jest.fn(),
    nextId: jest.fn(),
  }

  beforeEach(() => {
    postgresDatabaseMock.query.mockClear();
    postgresDatabaseMock.nextId.mockClear();
  });

  it('should create a new id', async () => {
    const mockClient = {
      title: 'Mr',
      firstName: 'User',
      lastName: 'One',
      phoneNumber: '1234',
    }

    postgresDatabaseMock.nextId.mockResolvedValueOnce('1');
    
    const clientRepository = new ClientRepository(postgresDatabaseMock);

    await clientRepository.insertClient(mockClient);

    const clients = await clientRepository.getAllClients();

    expect(clients[0].id).toEqual('1');
  });
});