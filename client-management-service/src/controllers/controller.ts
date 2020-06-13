import { Router } from 'express';

export default interface IController {
  addRoutes(router: Router): void;
}