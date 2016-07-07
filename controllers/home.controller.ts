import { Office365Service } from '../services/office365.service';
const office365Service = new Office365Service();

export class HomeController {
    index(req, res, next) {
        if (!req.session.user) {
            return res.redirect('/login');
        }
        res.render('home', { title: 'hello world' });
    }

    login(req, res, next) {
        res.render('home/login', { layout: 'clean', errorMessage: '' });
    }

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
}