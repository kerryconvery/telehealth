
import IController from './api/controllers/controller';
import ClientRepository from './repositories/client-repository/clientRepository';
import ClientService from './domain/services/client-service/clientService';
import ClientController from './api/controllers/clientController';

export default (): IController[] => {

  const clientRepository = new ClientRepository();
  const clientService = new ClientService(clientRepository);
  
  return [
    new ClientController(clientService),
  ];
}