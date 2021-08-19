import { Router } from 'express';

import UserController from '../controllers/User';

const routes = Router();

routes.get('/', UserController.getAll);
routes.post('/', UserController.create);

export default routes;