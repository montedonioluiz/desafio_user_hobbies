import { Router } from 'express';

import UserController from '../controllers/User';

const routes = Router();

routes.get('/', UserController.read);
routes.post('/', UserController.create);
routes.put('/:userId', UserController.update);
routes.delete('/:userId', UserController.delete);

export default routes;