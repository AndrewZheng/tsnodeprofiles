"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const user_profile_service_1 = require('../services/user-profile.service');
const userProfileService = new user_profile_service_1.UserProfileService();
class UsersController {
    index(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var users = yield userProfileService.getUserProfiles();
            if (users) {
                res.render('users/index', { users: users });
            }
        });
    }
    create(req, res, next) {
        res.render('users/edit');
    }
    edit(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var id = req.query.id;
            var userProfile = yield userProfileService.getUserProfile(id);
            return res.render('users/edit', userProfile);
        });
    }
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
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var id = req.query.id;
            yield userProfileService.deleteUserProfile(id);
            return res.redirect('/users');
        });
    }
}
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map