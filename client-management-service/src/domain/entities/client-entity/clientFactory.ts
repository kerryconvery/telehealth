import Client from './client';

export default class ClientFactory {
  private static generateId: () => string;

  static build(title: string, firstName: string, lastName: string, phoneNumber: string): Client {
    return this.buildWithId(this.generateId(), title, firstName, lastName, phoneNumber);
  }

  static buildWithId(id: string, title: string, firstName: string, lastName: string, phoneNumber: string): Client {
    const client = new Client(id);

    client.title = title;
    client.firstName = firstName;
    client.lastName = lastName;
    client.phoneNumber = phoneNumber;
  
    return client;
  }

  static initialize(idGenerator: () => string) {
    this.generateId = idGenerator;
  }
}