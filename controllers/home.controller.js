"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const office365_service_1 = require('../services/office365.service');
const office365Service = new office365_service_1.Office365Service();
class HomeController {
    index(req, res, next) {
        if (!req.session.user) {
            return res.redirect('/login');
        }
        res.render('home', { title: 'hello world' });
    }
    login(req, res, next) {
        res.render('home/login', { layout: 'clean', errorMessage: '' });
    }
    loginPost(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var email = req.body.email;
            var password = req.body.password;
            var result = yield office365Service.signIn(email, password);
            if (result.success) {
                // save auth_token and redirect to home page.
                req.session.user = { user_id: email };
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
}
exports.HomeController = HomeController;
//# sourceMappingURL=home.controller.js.map