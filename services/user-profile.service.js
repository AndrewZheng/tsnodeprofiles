"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const mongoose = require('mongoose');
const config_1 = require('../config');
const user_profile_1 = require('../models/user-profile');
var config = new config_1.Config();
const UserProfileModel = new user_profile_1.UserProfile().model;
class UserProfileService {
    constructor() {
        mongoose.connect(config.db);
    }
    saveUserProfile(userProfile) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
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
        });
    }
    getUserProfiles() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                UserProfileModel.find(function (err, res) {
                    resolve(res);
                });
            });
        });
    }
    getUserProfile(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                UserProfileModel.findById(id, function (err, res) {
                    resolve(res);
                });
            });
        });
    }
    deleteUserProfile(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                UserProfileModel.findByIdAndRemove(id, function (err, res) {
                    resolve(res);
                });
            });
        });
    }
}
exports.UserProfileService = UserProfileService;
//# sourceMappingURL=user-profile.service.js.map