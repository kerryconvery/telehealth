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

  it('should assigned a new id', async () => {
    const mockClient = {
      title: 'Mr',
      firstName: 'User',
      lastName: 'One',
      phoneNumber: '1234',
    }

    postgresDatabaseMock.nextId.mockResolvedValueOnce('1');
    
    const clientRepository = new ClientRepository(postgresDatabaseMock);

    await clientRepository.insertClient(mockClient);

    expect(postgresDatabaseMock.query).toHaveBeenCalledWith(
      expect.any(String),
      ['1', 'Mr', 'User', 'One', '1234'])
  });
});