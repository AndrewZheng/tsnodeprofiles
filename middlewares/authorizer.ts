import * as express from 'express';

export class Authorizer {
    authorize(req, res, next) {
        if (!req.session.user) {
            return res.redirect('/login');
        }

        next();
    }
}