import { check } from 'express-validator/check';
import validator from '../../middleware/requestValidation';
import { Router, Request, Response } from 'express';
import IController from './controller';
import IClientService from '../../domain/inputPorts/clientService';
import ClientMapper from '../mappers/clientMapper';

const clientValidationRules = [
  check('title', 'Title is required').isString(),  
  check('firstName', 'First name is required').isString(),
  check('lastName', 'Last name is required').isString(),
  check('phoneNumber', 'Phone number is required').isString(),
];

export default class ClientController implements IController {
  private readonly basePath: string = '/clients';
  private clientService: IClientService;

  constructor(clientService: IClientService) {
    this.clientService = clientService;
  }

  addRoutes(router: Router) {
    router.post(this.basePath, clientValidationRules, validator, this.addClient.bind(this));
    router.get(this.basePath, this.getClients.bind(this));
  }

  public async addClient(request: Request, response: Response) {
    const createNewClientRequest = ClientMapper.toCreateNewClientRequest(request.body);
    await this.clientService.addClient(createNewClientRequest);
    
    response.status(201).send();
  }

  public async getClients(request: Request, response: Response) {
    const clientDtos = await this.clientService.getAllClients();
    
    response.status(200).send(clientDtos);
  }
}