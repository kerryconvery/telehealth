import express, { Router } from 'express';
import bodyParser from 'body-parser';
import winston from "winston";
import EnvConfigurationOptions from './configurationOptions/envConfigurationOptions';
import configureControllers from './controllerConfiguration';

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console()
  ]
});

const app = express();
const router = Router();

const configurationOptions = new EnvConfigurationOptions();

const controllers = configureControllers(configurationOptions);

controllers.forEach(controller => controller.addRoutes(router));

app.use(bodyParser.json());
app.use(router);

app.listen(configurationOptions.getListenPort(), () => {
  logger.info(`server started at http://localhost:${ configurationOptions.getListenPort() }`);
});