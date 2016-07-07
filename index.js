"use strict";
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const home_controller_1 = require('./controllers/home.controller');
const router_1 = require('./router');
const config_1 = require('./config');
var config = new config_1.Config();
var homeController = new home_controller_1.HomeController();
var app = express();
app.use(express.static('public'));
// use router
app.use('/', new router_1.Router().router);
// use cookie and session
app.use(cookieParser(config.session_secret));
app.use(session({
    secret: config.session_secret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
//register view engine
app.engine('html', handlebars.create({ defaultLayout: "main", extname: '.html' }).engine);
app.set('view engine', 'html');
// bodyParser
app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));
app.get('/', homeController.index);
app.listen(config.port, function () {
    console.log(`Example app listening on port ${config.port}!`);
});
//# sourceMappingURL=index.js.map