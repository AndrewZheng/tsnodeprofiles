Hello Node.js 入门分享
===============
## Install node.js
1. https://nodejs.org/
2. https://www.npmjs.com/

## Install vscode
1. https://code.visualstudio.com

## Build enviroment and run hello world
1. mkdir tsnodeprofiles, start 'code .'
2. Create a 'package.json' file.
3. Add name, version ...
4. http://expressjs.com/
        4.1 npm install express --save
        4.2 see the changes of 'package.json' file.
5. Create a index.ts file
        5.1 copy the 'Hello world example' from http://expressjs.com/en/starter/hello-world.html

```typescript
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
```

6. npm install typescript --save-dev
        6.1 see the changes of 'package.json' file again.
        6.2 TypeScript is a superset of JavaScript that compiles to clean JavaScript output.
        6.3 http://www.typescriptlang.org/
7. 'tsc index.ts', see the file 'index.js'
8. 'node index.js'
        8.1 check http://localhost:3000/

## Build developing enviroment
1. ctrl+shift+p, 'ext install typescript'
2. ctrl+shift+b to build the project.
3. Add 'tsconfig.json', http://www.typescriptlang.org/docs/handbook/tsconfig-json.html
4. npm install typings -g
5. typings install dt~express -SG
        5.1 close the editor and open again, see? the code looks good now.
        5.2 import * as express from 'express';
        5.3 compile again? see 'OUTPUT'.
        5.4 typings install dt~serve-static dt~express-serve-static-core -SG
        5.5 compile again?
        5.6 typings install dt~mime -SG
        5.7 typings search http
        *5.8 typings i dt~node -SG
6. 'F5' to run the app.
        6.1 see the 'DEBUG CONSOLE'
        6.2 check http://localhost:3000/
7. Setup breakpoint and debug.
        *7.1 setup the breakpoint in 'index.js' to have a try.
        7.2 'source map', wtf?
        7.3 "sourceMap": true (tsconfig.json, launch.json)
        7.4 ctrl+shift+b, F5, try again?
8. Exclude the files.        
        8.1 'File -> Preferences -> User Settings
        8.2 by setup 'settings.json' in '.vscode' folder with "files.exclude".
                "**/**.js": true,
                "**/**.map": true,
                "node_modules": true,
                "typings": true

## View - template engine
1. Using template engines with Express, http://expressjs.com/en/guide/using-template-engines.html
2. https://handlebarsjs.com/
3. https://github.com/ericf/express-handlebars
        3.1 npm i express-handlebars --save
        3.2 typings i dt~express-handlebars -SG
4. Copy the code from 'express-handlebars' website: https://github.com/ericf/express-handlebars
        4.1 views/layouts/main.html
        
```html
        <!DOCTYPE html>
        <html>
        <head>
        <meta charset="utf-8">
        <title>Example App</title>
        </head>
        <body>

        {{{body}}}

        </body>
        </html>
```

        4.2 views/home.html

```html
        <h1>Example App: {{title}}</h1>
```

4. Register view engine

```typescript
import * as handlebars from 'express-handlebars';
...
// register view engine
app.engine('html', handlebars.create({ defaultLayout: "main", extname: '.html' }).engine);
app.set('view engine', 'html');
```

5. Render home page

```typescript
        res.render('home', { title: 'hello world' });
```

## Add controller
1. Create 'controllers' folder.
2. Add 'home.controller.ts' file:

```typescript
        export class HomeController {
                index(req, res, next) {
                        res.render('home', { title: 'hello world' });
                }
        }
```      

3. Change 'index.ts' file, use the 'HomeController':

```typescript
        import { HomeController } from './controllers/home.controller';
        var homeController = new HomeController();
        ...
        app.get('/', homeController.index);
```

## Add router
1. Add 'router.ts' file.

```typescript
        import * as express from 'express';
        import { HomeController } from './controllers/home.controller';

        export class Router {
        router = express.Router();
        homeController  = new HomeController();

        constructor() {
                this.router.get('/', this.homeController.index);
                }
        }
```

2. Change 'index.ts' file, use the 'Router'.

```typescript
import { Router } from './router';
...
// use router
app.use('/', new Router().router);
```

## Make 'public' folder
1. Create a 'public' folder.
2. Change 'index.ts' file, add static file support:

```typescript
        app.use(express.static('public'));
```

3. Install jquery and semantic-ui, http://semantic-ui.com/
        3.1 cd public
        3.2 https://bower.io/
        3.3 bower install semantic-ui
4. Create partial view.
        4.1 Create 'partials' folder in the 'views' folder.
        4.2 Add a 'head.html' file:

```html
        <meta charset="utf-8">
        <title>tsnodeprofiles</title>
        <link rel="stylesheet" type="text/css" href="/bower_components/semantic/dist/semantic.min.css">
        <script src="/bower_components/jquery/dist/jquery.min.js"></script>
        <script src="/bower_components/semantic/dist/semantic.min.js"></script>
```

        4.3 Change 'main.html' in the layouts folder

```html
        <head>
                {{> head}}
        </head>
```

## Add frontend 'scss' file and use 'glup'
1. Create 'images' folder in 'public', and copy the 'logo.svg' file.
2. Add 'nav.html' in 'partials' folder:

```html
        <div class="ui fixed inverted menu">
          <div class="main nav">
            <a href="/" class="header item">
              <img class="logo" src="/images/logo.svg">
              InnoCellence
            </a>
          </div>
        </div>
```

3. Change 'main.html' file:

```html
        {{> nav}}

        <div class="ui main content">
            {{{body}}}
        </div>
```

4. Create 'styles' folder in 'public'.
5. Add 'site.scss' in the 'styles' foler:

```scss
        .main.content
        {
                min-height: 480px;
                margin-top: 53px;
        }
```

6. http://gulpjs.com/
7. npm install gulp gulp-watch gulp-scss gulp-run --save-dev
8. Copy the 'gulpfile.js' to project root folder.
9. gulp
10. Change 'head.html', add 'site.css' reference:

```html
        <link rel="stylesheet" type="text/css" href="/styles/site.css">
```

11. Hide '.gulp-scss-cache', '.sass-cache' folders.

## Add 'UsersController'
1. Create a 'users.controller.ts' in 'controllers' folder:

```typescript
export class UsersController {
    index(req, res, next) {
        res.render('users/index');
    }
}
```

2. Create a 'users' folder in 'views' foler.
3. Create a 'index.html' file in 'users' folder:

```html
<h1 class="ui header">Users</h1>
```

4. Add router in 'Router.ts':

```typescript
import { UsersController } from './controllers/users.controller';
...
    usersController = new UsersController();
...
        this.router.get('/users', this.usersController.index);
```

## Add user list in the users 'index' page.
1. Add a <table> in the 'index.html':

```html
<table class="ui selectable celled table users">
    <thead>
        <tr>
            <th>User Name</th>
            <th>Email</th>
            <th>Location</th>
        </tr>
    </thead>
    <tbody>
        {{#each users}}
        <tr>
            <td>{{FirstName}} {{LastName}}</td>
            <td>{{Email}}</td>
            <td>{{Location}}</td>
        </tr>
        {{/each }}
    </tbody>
</table>
```

2. Add dummy data:

```typescript
        res.render('users/index', { users: [{ FirstName: 'Johnson', LastName: 'Zhong', Email: 'johnson.zhong@innocellence.com', Location: 'Dalian' }] });
```

## Add a 'New' button and a 'edit' page.
1. Add a 'New' button:

```html
<div class="row">
    <a class="ui primary button" tabindex="0" href="/users/create">
        <i class="add icon"></i>New
    </a>
</div>
```

2. Add a 'create' action in the 'UsersCotroller":

```typescript
    create(req, res, next) {
        res.render('users/edit');
    }
```

3. Add a 'edit.html' view in 'views/users/' folder:

```html
<form class="ui form" action='/users/update' method="POST">
    <h4 class="ui dividing header">InnoCellence Team Member Profile</h4>
    <div class="field">
        <label>Name</label>
        <div class="two fields">
            <div class="field">
                <input type="text" name="firstname" placeholder="First Name" value="{{FirstName}}"/>
            </div>
            <div class="field">
                <input type="text" name="lastname" placeholder="Last Name" value="{{LastName}}" />
            </div>
        </div>
    </div>
    <div class="field">
        <label>Discipline</label>
        <input type="text" name="discipline" placeholder="Discipline" value="{{Discipline}}" />
    </div>
    <div class="two fields">
        <div class="field">
            <label>Email Address</label>
            <input type="text" name="email" placeholder="Email Address" value="{{Email}}" />
        </div>
        <div class="field">
            <label>Location</label>
            <select class="ui fluid dropdown" name="location" data-value="{{Location}}">
                <option value="">Select Location</option>
                <option value="Dalian">Dalian</option>
                <option value="Japan">Japan</option>
                <option value="Shanghai">Shanghai</option>
                <option value="Singapore">Singapore</option>
          </select>
        </div>
    </div>
    <div class="field">
        <label>Summary</label>
        <textarea rows="5" name='summary'>{{Profile.Summary}}</textarea>
    </div>
    <div class="field">
        <label>Key Skills</label>
        <textarea rows="2" name='keyskills'></textarea>
    </div>
    <div class="field">
        <label>Career History</label>
        <textarea rows="3" name='careerhistories'></textarea>
    </div>
    <div class="field">
        <label>Education</label>
        <textarea rows="3" name='educations'></textarea>
    </div>
    <div class="field">
        <label>Languages</label>
        <textarea rows="2" name='languages'></textarea>
    </div>
    <div class="field">
        <label>Certificates and Awards</label>
        <textarea rows="3" name='certificatesandawards'></textarea>
    </div>

    <input type="hidden" name="id" value="{{_id}}" />
    <a class="ui button submit" tabindex="0">Submit</a>
</form>
<script src="/scripts/users/edit.js"></script>
```

4. Add 'edit.ts' in the 'public/scripts/users/' folder:

```typescript
$(document)
    .ready(function () {
        $('select.dropdown').each(function (index, element) {
            var value = $(element).data('value');
            $(element.children).each(function (index, option) {
                if (option.value == value) {
                    $(option).attr('selected', 'selected');
                    return false;
                }
            })
        })
        $('select.dropdown').dropdown();
        $('.ui.form')
            .form({
                fields: {
                    email: {
                        identifier: 'email',
                        rules: [
                            {
                                type: 'empty',
                                prompt: 'Please enter your e-mail'
                            },
                            {
                                type: 'email',
                                prompt: 'Please enter a valid e-mail'
                            }
                        ]
                    }
                }
            });
    });
```

5. Add '/users/create' in 'Router':

```typescript
        this.router.get('/users/create', this.usersController.create);
```

6. Compile error? 
        6.1 try 'typings search sematic-ui'?
        6.2 ok, let's build our own 'defination' file:
                6.2.1 create a 'manual/semantic-ui' folder in 'typings'.
                6.2.2 add an 'index.d.ts' file:
                
```typescript
interface JQuery {
    dropdown(): any;
    form(options: any): any;
}

interface Element {
    children: any;
    value: any;
}
```

                6.2.3 add in 'typings/index.d.ts' file:

```typescript
/// <reference path="manual/semantic-ui/index.d.ts" />
```

## Post user profile
1. Add 'update' action in 'UserController':

```typescript
    update(req, res, next) {
        res.render('users/edit');
    }
```

2. Add in 'router.ts' for the post action:

```typescript
        this.router.post('/users/update', this.usersController.update);
```

3. *How to get the post values?
        3.1 add 'bodyParser', npm install body-parser --save
        3.2 typings install dt~body-parser -SG
        3.3 change 'index.ts' file:

```typescript
import * as bodyParser from 'body-parser';
...

// bodyParser
app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));
```

## Install MongoDB and mongoosejs
1. https://www.mongodb.com/
2. https://mlab.com/
3. http://mongoosejs.com/
        3.1 npm install mongoose -save
        3.2 typings i dt~mongoose -SG
4. Define 'Schema'
        4.1 https://github.com/topliceanu/mongoose-gen
        4.2 npm install mongoose-gen --save
        4.3 Manually create a 'mongoose-gen' dts file:

```typescript
declare module "mongoose-gen" {
    function convert(descriptor) : any;
}
```

## Create model and service
1. Create 'UserProfile' model
        1.1 Create a 'models' folder.
        1.2 Create a 'user-profile.ts' file 'models' folder:

```typescript
import * as mongoose from 'mongoose';
import * as mg from 'mongoose-gen';

export class UserProfile {
    name = "UserProfiles";
    default = {
        Id: '',
        EmployeeNumber: '',
        DisplayName: '',
        FirstName: '',
        LastName: '',
        Email: '',
        Location: '',
        Role: '',
        Discipline: '',
        Thumbnail: '',
        CreatedAt: '',
        Profile: {
            Summary: '',
            KeySkills: [
                ''
            ],
            CareerHistories: [
                {
                    DateTime: '',
                    Title: '',
                    Company: '',
                    Location: ''
                }
            ],
            Educations: [
                {
                    DateTime: '',
                    Degree: '',
                    School: '',
                    Location: ''
                }
            ],
            Languages: [
                {
                    Name: '',
                    Level: ''
                }
            ],
            CertificatesAndAwards: [
                ''
            ]
        }
    };
    schema: mongoose.Schema;
    model: mongoose.Model<mongoose.Document>;

    constructor() {
        this.schema = new mongoose.Schema(mg.convert(this.default));
        this.model = mongoose.model(this.name, this.schema);
    }
}
``` 

2. Create 'Config' file for store the db connection string:
        2.1 Create a 'config.ts' file:

```typescript
export class Config {
    db = 'mongodb://localhost/tsnodeprofiles';
}
```

3. Create a 'UserProfileService':
        3.1 Create a 'services' folder.
        3.2 Create a 'user-profile.service.ts' file 'services' folder:

```typescript
import * as mongoose from 'mongoose';
import { Config } from '../config';
import { UserProfile } from '../models/user-profile';

var config = new Config();
const UserProfileModel = new UserProfile().model;

export class UserProfileService {

    async saveUserProfile(userProfile) {
        return new Promise<mongoose.Document>(resolve => {
            mongoose.connect(config.db);
            if (userProfile.Id) {
                var id = userProfile.Id;
                UserProfileModel.findByIdAndUpdate(id, { $set: userProfile }, function (err, res) {
                    resolve(res);
                });
            }
            else {
                var userProfileModel = new UserProfileModel(userProfile);
                userProfileModel.save(function (err, res) {
                    resolve();
                });
            }
        });
    }
}
```

4. Change the 'update' action to save the post data into db.

```typescript
import { UserProfileService } from '../services/user-profile.service';
const userProfileService = new UserProfileService();
...
    update(req, res, next) {
        var userProfile = {
            Id: req.body.id,
            FirstName: req.body.firstname,
            LastName: req.body.lastname,
            Email: req.body.email,
            Location: req.body.location,
            Discipline: req.body.discipline,
            Profile: {
                Summary: req.body.summary
            }
        };
        userProfileService.saveUserProfile(userProfile)
            .then(function () {
                return res.redirect('/users');
            });
    }
```

5. http://www.mongoclient.com/

## Get user profiles
1. Add 'getUserProfiles' method in the 'UserProfileService':

```typescript
    constructor() {
        mongoose.connect(config.db);
    }
    ...
    async getUserProfiles() {
        return new Promise<any>(resolve => {
            UserProfileModel.find(function (err, res) {
                resolve(res);
            });
        });
    }
```

2. Change the 'index' action of 'UserController':

```typescript
    index(req, res, next) {
        userProfileService.getUserProfiles()
            .then(function (users) {
                if (users) {
                    res.render('users/index', { users: users });
                }
            });
    }
```

Or 

```typescript
    async index(req, res, next) {
        var users = await userProfileService.getUserProfiles()
        if (users) {
            res.render('users/index', { users: users });
        }
    }
```

## Edit user profile
1. Add 'getUserProfile' method in UserProfileServie:

```typescript
    async getUserProfile(id) {
        return new Promise<mongoose.Document>(resolve => {
            UserProfileModel.findById(id, function (err, res) {
                resolve(res);
            });
        });
    }
```

2. Add 'edit' action in UserController:

```typescript
    edit(req, res, next) {
        var id = req.query.id;
        userProfileService.getUserProfile(id)
            .then(function (userProfile) {
                return res.render('users/edit', userProfile);
            });
    }
```

Or

```typescript
    async edit(req, res, next) {
        var id = req.query.id;
        var userProfile = await userProfileService.getUserProfile(id);
        return res.render('users/edit', userProfile);
    }
```

3. Add 'edit' action in Router:

```typescript
        this.router.get('/users/edit', this.usersController.edit);        
```

4. Add 'edit' button in the list:

```html
            <th>Operations</th>
...
            <td>
                <a href='/users/edit?id={{_id}}'><i class="edit icon"></i></a>
            </td>
```

## Delete user profile
1. Add 'deleteUserProfile' method in UserProfileService:

```typescript
    async deleteUserProfile(id) {
        return new Promise<mongoose.Document>(resolve => {
            UserProfileModel.findByIdAndRemove(id, function (err, res) {
                resolve(res);
            });
        });        
    }
```

2. Add 'delete' action in UserController:

```typescript
    delete(req, res, next) {
        var id = req.query.id;
        userProfileService.deleteUserProfile(id)
            .then(function () {
                return res.redirect('/users');
            });
    }
```

Or 

```typescript
    async delete(req, res, next) {
        var id = req.query.id;
        await userProfileService.deleteUserProfile(id)
        return res.redirect('/users');
    }
```

3. Add 'delete' action in Router:

```typescript
        this.router.get('/users/delete', this.usersController.delete);        
```

4. Change list view, add 'delete' button and confirm dialog:

```html
                <a href='/users/delete?id={{_id}}' class="delete operation"><i class="delete icon"></i></a>
...

<div class="ui dimmer modals page transition">
    <div class="ui small modal transition scrolling delete">
        <div class="content">
            <div class="description">
                <p>Are you sure you want to delete this?</p>
            </div>
        </div>
        <div class="actions">
            <a class="ui red basic button yes">                
                <i class="remove icon"></i> Yes
            </a>
            <div class="ui green basic button deny">
                <i class="undo icon"></i> No
            </div>
        </div>
    </div>
</div>

<script src="/scripts/users/index.js"></script>
```

5. Add the 'index.js' script file to show the confirm dialog:

```typescript
$(function () {
    $('.delete.operation').on('click', function (e) {
        var href = $(this).attr('href');
        $('.delete.modal a.yes.button').attr('href', href);
        $('.delete.modal').modal('show');
        e.preventDefault();
    });    
})  
```

6. Add defination in .d.ts file:

```typescript
interface JQuery {
    dropdown(): any;
    form(options: any): any;
    modal(options): any;
}
```

## Add login page
1. Add 'login' view in the 'views/home/' folder:

```html
<div class="ui middle aligned center aligned grid">
  <div class="column">
    <h2 class="ui teal image header">
      <img src="images/logo.svg" class="image">
      <div class="content">
        Log-in to your account
      </div>
    </h2>
    <form class="ui large form" action="/login" method="POST">
      <div class="ui stacked segment">
        <div class="field">
          <div class="ui left icon input">
            <i class="user icon"></i>
            <input type="text" name="email" placeholder="E-mail address">
          </div>
        </div>
        <div class="field">
          <div class="ui left icon input">
            <i class="lock icon"></i>
            <input type="password" name="password" placeholder="Password">
          </div>
        </div>
        <div class="ui fluid large teal submit button">Login</div>
      </div>

      <div class="ui error message" {{#if errorMessage}} style="display:block" {{/if}}>
        <ul class="list">
          <li>
            {{errorMessage}}
          </li>
        </ul>
      </div>

    </form>
  </div>
</div>
<script src="/scripts/home/login.js"></script>
```

2. Add 'login.ts' in the 'public/scripts/home/' folder:

```typescript
$(document)
    .ready(function () {
        $('.ui.form')
            .form({
                fields: {
                    email: {
                        identifier: 'email',
                        rules: [
                            {
                                type: 'empty',
                                prompt: 'Please enter your e-mail'
                            },
                            {
                                type: 'email',
                                prompt: 'Please enter a valid e-mail'
                            }
                        ]
                    },
                    password: {
                        identifier: 'password',
                        rules: [
                            {
                                type: 'empty',
                                prompt: 'Please enter your password'
                            },
                            {
                                type: 'length[6]',
                                prompt: 'Your password must be at least 6 characters'
                            }
                        ]
                    }
                }
            });
    });
```

3. Add a 'clean.html' layout in 'views/layouts/' folder:

```html
<!DOCTYPE html>
<html>

<head>
    {{> head}}
</head>

<body>

    <div class="ui main container">
        {{{body}}}
    </div>

</body>

</html>
```

4. Add styles in 'site.scss':

```scss
.main.container 
{
    .column
    {
        max-width: 450px;
    }
}
```

5. Add 'login' action in the HomeController, use the 'clean' layout:

```typescript
    login(req, res, next) {
        res.render('home/login', { layout: 'clean', errorMessage: '' });
    }
```

6. Add '/login' in Router:

```typescript
        this.router.get('/login', this.homeController.login);
```

## Office365 login with request-promise
1. npm install request-promise -save
2. typings install dt~request dt~request-promise dt~form-data -SG
3. Create a 'office365.service.ts' in the services folder:

```typescript
import * as rp from 'request-promise';

const endpoint = "https://sginnocellence.sharepoint.com";
const srfUrl = "https://login.microsoftonline.com/extSTS.srf";
const xmlBody = "<?xml version=\"1.0\" encoding=\"utf-8\" ?><s:Envelope xmlns:s=\"http://www.w3.org/2003/05/soap-envelope\" xmlns:a=\"http://www.w3.org/2005/08/addressing\" xmlns:u=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\"><s:Header><a:Action s:mustUnderstand=\"1\">http://schemas.xmlsoap.org/ws/2005/02/trust/RST/Issue</a:Action><a:ReplyTo><a:Address>http://www.w3.org/2005/08/addressing/anonymous</a:Address></a:ReplyTo><a:To s:mustUnderstand=\"1\">https://login.microsoftonline.com/extSTS.srf</a:To><o:Security s:mustUnderstand=\"1\" xmlns:o=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd\"><o:UsernameToken><o:Username>[username]</o:Username><o:Password>[password]</o:Password></o:UsernameToken></o:Security></s:Header><s:Body><t:RequestSecurityToken xmlns:t=\"http://schemas.xmlsoap.org/ws/2005/02/trust\"><wsp:AppliesTo xmlns:wsp=\"http://schemas.xmlsoap.org/ws/2004/09/policy\"><a:EndpointReference><a:Address>[endpoint]</a:Address></a:EndpointReference></wsp:AppliesTo><t:KeyType>http://schemas.xmlsoap.org/ws/2005/05/identity/NoProofKey</t:KeyType><t:RequestType>http://schemas.xmlsoap.org/ws/2005/02/trust/Issue</t:RequestType><t:TokenType>urn:oasis:names:tc:SAML:1.0:assertion</t:TokenType></t:RequestSecurityToken></s:Body></s:Envelope>";


export class Office365Service {
    async signIn(email, password) {
        var signInUrl = srfUrl;
        var requestBody = xmlBody
            .replace("[username]", email)
            .replace("[password]", password)
            .replace("[endpoint]", endpoint);
        return new Promise<any>(resolve => {
            rp({
                method: 'POST',
                uri: signInUrl,
                headers: {
                    'content_type': "text/xml; charset=utf-8"
                },
                body: requestBody})
                .then(function (response) {
                    if (response.indexOf("<wsse:BinarySecurityToken") > 0) {
                        resolve({ success: true, user_id: email });
                    }
                    else {
                        resolve({ success: false, error: 'Login failed', user_id: email });
                    }
                });
        });
    }
}
```

4. Add 'loginPost' in HomeController:

```typescript
import { Office365Service } from '../services/office365.service';
const office365Service = new Office365Service();
...
    loginPost(req, res, next) {
        var email = req.body.email;
        var password = req.body.password;
        office365Service.signIn(email, password)
            .then(function (result) {
                if (result.success) {
                    // save auth_token and redirect to home page.
                    req.session.user = { user_id: email }
                    req.session.save(function () {
                        // redirect
                        res.redirect('/');
                    });
                }
                else {
                    res.render('home/login', { layout: 'clean', errorMessage: result.error });
                }
            });
    }
```

Or

```typescript
  async loginPost(req, res, next) {
        var email = req.body.email;
        var password = req.body.password;
        var result = await office365Service.signIn(email, password);
        if (result.success) {
            // save auth_token and redirect to home page.
            req.session.user = { user_id: email }
            req.session.save(function () {
                // redirect
                res.redirect('/');
            });
        }
        else {
            res.render('home/login', { layout: 'clean', errorMessage: result.error });
        }
    }
```

5. Add '/login' post in Router:

```typescript
        this.router.post('/login', this.homeController.loginPost);
```

6. *Add 'session' and 'cookie' support:
        6.1 npm install cookie-parser express-session --save
        6.2 typings install dt~form-data -SG
        6.3 Use 'session' and 'cookie' in 'index.ts' file:

```typescript
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import { Config } from './config';
var config = new Config();
...
// use cookie and session
app.use(cookieParser(config.session_secret));
app.use(session({
  secret: config.session_secret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
```

        6.4 Add 'session_secret' in Config file:

```typescript
    session_secret = 'tsnodeprofiles_session';
```

7. Check 'session' in index action

```typescript
    index(req, res, next) {
        if (!req.session.user) {
            return res.redirect('/login');
        }

        res.render('home', { title: 'hello world' });
    }
```

## Build middleware for authorization
1. Create a 'middlewares' folder.
2. Add a 'authorizer.ts' file:

```typescript
import * as express from 'express';

export class Authorizer {
    authorize(req, res, next) {
        if (!req.session.user) {
            return res.redirect('/login');
        }

        next();
    }
}
```

3. Use 'authorizer' middleware in Router:

```typescript
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
```

## Deploy to Heroku, https://www.heroku.com/
1. Download and install https://toolbelt.heroku.com/
2. Config port with $PORT value:

```typescript
export class Config {
    db = 'mongodb://localhost/tsnodeprofiles';
    session_secret = 'tsnodeprofiles_session';
    port = process.env.PORT || 3000;
}
```

3. Use the configed port in 'index.ts':

```typescript
app.listen(config.port, function () {
  console.log(`Example app listening on port ${config.port}!`);
});
```

4. Add a file named 'Procfile' in the root folder of the project with following content:

```
    web: node index.js
```

5. Create a new website and push the code to deploy:

```bash
        keroku login

        heroku create tsnodeprofile --buildpack heroku/nodejs

        git init
        heroku git:remote -a tsnodeprofile        
        git add .
        git status
        git commit -am 'init'
        git config --global push.default simple
        
        git push keroku master
```

## Done
        https://tsnodeprofile.herokuapp.com/