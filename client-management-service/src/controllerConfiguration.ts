import IPostgresConfigurationOptions from './data-access/postgres/postgresConfigurationOptions';
import IController from './api/controllers/controller';
import PostgresDatabase from './data-access/postgres/postgresDatabase';
import ClientRepository from './repositories/client-repository/clientRepository';
import ClientService from './domain/services/client-service/clientService';
import ClientController from './api/controllers/clientController';

export default (postgresConfigurationOptions: IPostgresConfigurationOptions): IController[] => {

  const postgresClient = new PostgresDatabase(postgresConfigurationOptions);
  
  const clientRepository = new ClientRepository(postgresClient);
  const clientService = new ClientService(clientRepository);
  
  return [
    new ClientController(clientService),
  ];
}