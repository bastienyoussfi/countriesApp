import { Router } from 'express';
import { showLogin, authenticate } from './controller.js';

export const routes = new Router();

routes.get('/', showLogin);
routes.post('/', authenticate);