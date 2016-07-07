"use strict";
class Authorizer {
    authorize(req, res, next) {
        if (!req.session.user) {
            return res.redirect('/login');
        }
        next();
    }
}
exports.Authorizer = Authorizer;
//# sourceMappingURL=authorizer.js.map