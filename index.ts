import * as express from 'express';
import * as handlebars from 'express-handlebars';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import { HomeController } from './controllers/home.controller';
import { Router } from './router';
import { Config } from './config';
var config = new Config();

var homeController = new HomeController();

var app = express();
app.use(express.static('public'));
// use router
app.use('/', new Router().router);
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