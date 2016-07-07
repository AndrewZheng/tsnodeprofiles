import * as express from 'express';
import { HomeController } from './controllers/home.controller';
import { UsersController } from './controllers/users.controller';
import { Authorizer } from './middlewares/authorizer';

export class Router {
    router = express.Router();
    homeController = new HomeController();
    usersController = new UsersController();
    authorizer = new Authorizer();

    constructor() {
        this.router.get('/', this.authorizer.authorize, this.homeController.index);

        this.router.get('/users', this.authorizer.authorize, this.usersController.index);
        this.router.get('/users/create', this.authorizer.authorize, this.usersController.create);
        this.router.post('/users/update', this.authorizer.authorize, this.usersController.update);
        this.router.get('/users/edit', this.authorizer.authorize, this.usersController.edit);
        this.router.get('/users/delete', this.authorizer.authorize, this.usersController.delete);

        this.router.get('/login', this.homeController.login);
        this.router.post('/login', this.homeController.loginPost);
    }
}