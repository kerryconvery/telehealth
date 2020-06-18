import IClientRepository from '../../domain/outputPorts/clientRepository';
import Client from '../../domain/entities/client-entity/client';
import IPostgresDatabase from '../postgresDatabase'
import ClientFactory from '../../domain/entities/client-entity/clientFactory';

export default class ClientRepository implements IClientRepository {

  private postgresDatabase: IPostgresDatabase;
  
  constructor(postgresClient: IPostgresDatabase) {
    this.postgresDatabase = postgresClient;
  }

  async add(client: Client): Promise<void> {
    const query = 'INSERT INTO telehealth.clients(' + 
      'id, title, first_name, last_name, phone_number) VALUES($1, $2, $3, $4, $5)';
    const values = [client.id, client.title, client.firstName, client.lastName, client.phoneNumber];

    await this.postgresDatabase.query(query, values);
  }

  async get(): Promise<Client[]> {
    const query = 'SELECT id, title, first_name, last_name, phone_number FROM telehealth.clients';

    const queryResults = await this.postgresDatabase.query(query, []);

    return queryResults.rows.map(row => ClientFactory.buildWithId(
      row.id,
      row.title,
      row.first_name,
      row.last_name,
      row.phone_number
    ));
  }
}