import ClientRepository from './clientRepository';

describe('When inserting a client', () => {

  const generateIdMock = jest.fn();

  beforeEach(() => {
    generateIdMock.mockClear();
  });

  it('should create a new id', async () => {
    const mockClient = {
      title: 'Mr',
      firstName: 'User',
      lastName: 'One',
      phoneNumber: '1234',
    }

    generateIdMock.mockReturnValueOnce('1');
    
    const clientRepository = new ClientRepository(generateIdMock);

    await clientRepository.insertClient(mockClient);

    const clients = await clientRepository.getAllClients();

    expect(clients[0].id).toEqual('1');
  });
});