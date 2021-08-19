// Dependencies
import { Router } from 'express';

// Controller
import UserController from '../controllers/User';

// Validation
import UserValidation from '../validation/User';

const routes = Router();

routes.get('/', UserController.read);
routes.post('/', UserValidation.upsert, UserController.create);
routes.put('/:userId', UserValidation.upsert, UserController.update);
routes.delete('/:userId', UserController.delete);

export default routes;