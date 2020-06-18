import ClientFactory from './clientFactory';

describe('When generating a client', () => {
  ClientFactory.initialize(() => '1');

  it('should assign an id and all fields from the dto', () => {
    const clientDto = {
      title: 'Mr',
      firstName: 'client',
      lastName: 'one',
      phoneNumber: '1223',
    }

    const client = ClientFactory.build(
      clientDto.title,
      clientDto.firstName,
      clientDto.lastName,
      clientDto.phoneNumber
    );

    expect(client.id).toEqual('1');
  })
})