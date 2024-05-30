import { Router } from 'express';
import { createCountry, listCountries, showCountry, storeCountry, editCountry, updateCountry, deleteCountry } from './controller.js';

export const routes = new Router();

function checkAuth(req, res, next) {
    let isAuthenticated = true;
    if isAuthenticated() {
        next();
    } else {
        res.redirect('/login');
    }
   
}

routes.get('/', listCountries);
routes.post('/', checkAuth, storeCountry);
routes.get('/create', checkAuth, createCountry);
routes.get('/:id/edit', checkAuth, editCountry);
routes.get('/:id/delete', checkAuth, deleteCountry);
routes.get('/:id', showCountry);
routes.post('/:id', checkAuth, updateCountry);