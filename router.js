"use strict";
const express = require('express');
const home_controller_1 = require('./controllers/home.controller');
const users_controller_1 = require('./controllers/users.controller');
const authorizer_1 = require('./middlewares/authorizer');
class Router {
    constructor() {
        this.router = express.Router();
        this.homeController = new home_controller_1.HomeController();
        this.usersController = new users_controller_1.UsersController();
        this.authorizer = new authorizer_1.Authorizer();
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
exports.Router = Router;
//# sourceMappingURL=router.js.map