import IClientRepository from '../../domain/outputPorts/clientRepository';
import Client from '../../domain/domain-models/client';
import IPostgresDatabase from '../postgresDatabase'
import ClientMapper from '../mappers/clientMapper';

export default class ClientRepository implements IClientRepository {

  private postgresDatabase: IPostgresDatabase;
  
  constructor(postgresClient: IPostgresDatabase) {
    this.postgresDatabase = postgresClient;
  }

  async insertClient(client: Client): Promise<void> {
    const id = await this.postgresDatabase.nextId();

    const query = 'INSERT INTO telehealth.clients(' + 
      'id, title, first_name, last_name, phone_number) VALUES($1, $2, $3, $4, $5)';
    const values = [id, client.title, client.firstName, client.lastName, client.phoneNumber];

    await this.postgresDatabase.query(query, values);
  }

  async getAllClients(): Promise<Client[]> {
    const query = 'SELECT id, title, first_name, last_name, phone_number FROM telehealth.clients';

    const queryResults = await this.postgresDatabase.query(query, []);

    return queryResults.rows.map(ClientMapper.toClient);
  }
}