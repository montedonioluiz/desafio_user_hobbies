// Dependencies
import { Router } from 'express';

// Controller
import UserController from '../controllers/User';
import HobbyController from '../controllers/Hobby';

// Validation
import UserValidation from '../validation/User';
import HobbyValidation from '../validation/Hobby';

const routes = Router();

routes.get('/', UserController.read);
routes.post('/', UserValidation.create, UserController.create);
routes.delete('/:userId', UserController.delete);

routes.post('/:userId/hobby', HobbyValidation.create, HobbyController.create);
routes.delete('/:userId/hobby/:hobbyId', HobbyController.delete);

export default routes;